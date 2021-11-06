const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;

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

		// POST API Order Confirmation
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






		// // GET Single Tour
		// app.get('/tours/:id', async (req, res) => {
		// 	const id = req.params.id;
		// 	const query = { _id: ObjectId(id) };
		// 	const tour = await toursCollection.findOne(query);

		// 	res.send(tour);
		// });


	} finally {
		// await client.close();
	}
}
run().catch(console.dir);




app.get('/', (req, res) => {
	console.log('Server Running Successfully!')
	res.send('Server is Running...')
});

app.listen(port, () => {
	console.log('Server is Running on port: ', port);
});