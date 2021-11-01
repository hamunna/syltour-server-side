const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 5000;

// user: sylTour
// password: AbNHMWFCkOhwd0GW

// Middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xribv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
  try {
    await client.connect();

    const database = client.db("sylTour");
    const toursCollection = database.collection("tours");

    const cursor = toursCollection.find(query, options);

    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    }

    // replace console.dir with your callback to access individual elements
    await cursor.forEach(console.dir);
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (res, req) => {
	console.log('Server Running Successfully!')
	res.send('Server is Running...')
});

app.listen(port, () => {
	console.log('Server is Running on port: ', port);
});