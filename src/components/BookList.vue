<template>
  <section>
    <h2>Book List</h2>

    <p v-if="loading">Loading books…</p>
    <p v-else-if="error" class="error">{{ error }}</p>
    <p v-else-if="books.length === 0">No books yet. Add one above!</p>

    <ul v-else class="list">
      <li v-for="b in books" :key="b.id" class="row">
        <span class="cell"><strong>ISBN:</strong> {{ b.isbn }}</span>
        <span class="cell"><strong>Name:</strong> {{ b.name }}</span>
        <button class="danger" @click="remove(b.id)">Delete</button>
      </li>
    </ul>

  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import db from '../firebase/init.js';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc
} from 'firebase/firestore';

export default {
  name: 'BookList',
  setup() {
    const books = ref([]);
    const loading = ref(true);
    const error = ref('');

    let unsub = null;

    onMounted(() => {
      try {
        // Live query of the 'books' collection ordered by name
        const q = query(collection(db, 'books'), orderBy('name'));
        unsub = onSnapshot(
          q,
          (snap) => {
            books.value = snap.docs.map((d) => ({
              id: d.id,
              ...d.data(),
            }));
            loading.value = false;
          },
          (err) => {
            error.value = 'Failed to load books: ' + err.message;
            loading.value = false;
          }
        );
      } catch (e) {
        error.value = 'Failed to load books: ' + e.message;
        loading.value = false;
      }
    });

    onUnmounted(() => {
      if (typeof unsub === 'function') unsub();
    });

    const remove = async (id) => {
      try {
        await deleteDoc(doc(db, 'books', id));
      } catch (e) {
        alert('Error deleting book: ' + e.message);
      }
    };

    return { books, loading, error, remove };
  },
};
</script>

<style scoped>
h2 { margin: 1rem 0 .5rem; }
.list { list-style: none; padding: 0; margin: .5rem 0; }
.row {
  display: flex;
  align-items: center;
  gap: .75rem;
  padding: .5rem .75rem;
  border: 1px solid #e5e7eb;
  border-radius: .5rem;
  margin-bottom: .5rem;
}
.cell { min-width: 10rem; }
.danger {
  margin-left: auto;
  border: 1px solid #ef4444;
  background: #fee2e2;
  color: #991b1b;
  padding: .35rem .6rem;
  border-radius: .4rem;
  cursor: pointer;
}
.error { color: #b91c1c; }
</style>
