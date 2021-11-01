const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (res, req) => {
	console.log('Server Running Successfully!')
	res.send('Server is Running...')
});

app.listen(port, () => {
	console.log('Server is Running on port: ', port);
});