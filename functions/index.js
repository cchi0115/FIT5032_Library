const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

exports.getAllBook = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksSnapshot = await admin.firestore().collection("books").get();

      const books = booksSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          isbn: data.isbn || null,
          name: data.name || null,
        };
      });

      res.status(200).json({ books });
    } catch (error) {
      console.error("Error getting books:", error.message);
      res.status(500).json({ error: "Error getting books" });
    }
  });
});

