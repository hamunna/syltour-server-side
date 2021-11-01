const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	console.log('You got the access.');
	res.send('Server is Running...');
});

app.listen(port, () => {
	console.log('Server is running on port: ', port);
})