const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 3012;

//
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route
const db = mysql.createPool({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});
mysql.createConnection;

app.get("/", (req, res) => {
	const string = `select * from small.smallData`;
	db.query(string, (error, result) => {
		console.log("hi");
		if (error) console.log(error);
		console.log(result[0]);
		res.status(200).send(result);
	});
});
// app.get("/", (req, res) => {

// });
app.listen(PORT, () => {
	console.log("LIstining on ", PORT);
});
