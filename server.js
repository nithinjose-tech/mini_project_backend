const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoute = require('./routes/auth');
const productRoute = require('./routes/products');
const customerRoute = require('./routes/customer')
const dotenv = require("dotenv");

const app = express();
const cors = require("cors");

const port = process.env.PORT || 4000;
const host = "0.0.0.0";

dotenv.config();

mongoose
  .connect(
     process.env.mongo_uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to moongoose");
  })
  .catch((error) => console.log(`${error},could not connect`));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



app.use(bodyParser.json());


app.use("/auth", authRoute);
app.use("/products",productRoute);
app.use("/purchase",customerRoute);



app.listen(port, host, () => {
    console.log(`Node server is listening on port ${port}`);
  });
