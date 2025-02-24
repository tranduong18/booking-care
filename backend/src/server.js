require('dotenv').config();
const express = require("express");
const viewEngine = require("./config/viewEngine");
const initWebRoutes = require("./routes/web");
const connectDB = require("./config/connectDB");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

viewEngine(app);
initWebRoutes(app);

connectDB();

app.listen(port, () => {
  console.log("App listening on port " + port);
})