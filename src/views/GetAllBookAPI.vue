<template>
    <pre>{{ jsondata }}</pre>
</template>

<script>
import axios from "axios";

export default {
  name: "GetAllBookAPI",

  data() {
    return {
      jsondata: null,
      error: null,
    };
  },

  methods: {
    async getAllBookAPI() {
      try {
        const response = await axios.get(
          "https://us-central1-week7lab-ac261.cloudfunctions.net/getAllBook"
        );
        this.jsondata = response.data;
        this.error = null;
      } catch (error) {
        console.error("Error fetching book count:", error);
        this.error = error;
        this.jsondata = null;
      }
    },
  },

  mounted() {
    this.getAllBookAPI();
  },
};
</script>