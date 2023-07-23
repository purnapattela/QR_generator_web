const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const qr = require("qr-image");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("images"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
	const url = req.body.url;
	console.log(url);
	var qr_svg = qr.image(url, { type: "svg" });
	qr_svg.pipe(fs.createWriteStream(__dirname + "/images/qr.svg"));

	res.sendFile(__dirname + "\\" + "url.html");
});

app.listen(3000, () => {
	console.log("Server is running on port 5500.");
});
