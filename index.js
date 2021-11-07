const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

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
		const myOrdersCollection = database.collection("myOrders");

		// GET API
		app.get('/tours', async (req, res) => {

			const cursor = toursCollection.find({});
			const tours = await cursor.toArray();
			console.log(tours);
			res.send(tours);
		});

		// POST API
		app.post('/tours', async (req, res) => {
			const newTour = req.body;
			const result = await toursCollection.insertOne(newTour);

			res.json(result);
		});

		// POST API Placing Order
		app.post('/myOrders', async (req, res) => {
			const newOrder = req.body;
			const result = await myOrdersCollection.insertOne(newOrder);

			res.json(result);
		});

		// GET API myOrders Collection
		app.get('/myOrders', async (req, res) => {

			const cursor = myOrdersCollection.find({});
			const myOrderId = await cursor.toArray();
			console.log(myOrderId);
			res.send(myOrderId);
		});

		// DELETE User (API)
		app.delete('/myOrders/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const result = await myOrdersCollection.deleteOne(query);

			res.json(result);
		});

		// Update Order Pending
		app.put('/myOrders/:id', async (req, res) => {
			const id = req.params.id;
			const updateOrderStatus = req.body;
			const filter = { _id: ObjectId(id) };

			const options = { upsert: true };

			// create a document
			const updateDoc = {
				$set: {
					status: updateOrderStatus.status
				},
			};

			const result = await myOrdersCollection.updateOne(filter, updateDoc, options);

			res.json(result)
		})

	} finally {
		// await client.close();
	}
}
run().catch(console.dir);




app.get('/', (req, res) => {
	res.send('Server is Running...')
});

app.listen(port, () => {
	console.log('Server is Running on port: ', port);
});