const cors = require('cors') 
const express = require('express');
require('dotenv').config()
const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'http://157.173.121.178'], // Add all allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Enable this if you're using cookies
};

app.use(cors(corsOptions));

const mongoose = require("mongoose")
const AllRoute = require("./src/route/allRoute")

//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/swagger");
// app.use(cors());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


app.get('/api', function (req, res) { 
  res.send('<h1 style="color:red;">Hello World!cors is wored? /api</h1>');
});
app.get('/', function (req, res) { 
  res.send('<h1 style="color:blue;">Hello World! / </h1>');
});

app.use(express.json())
// app.use("/api/", AllRoute) 
app.use("/", AllRoute) 

// const url = "mongodb://localhost:27017/flowersMarket"

const port = 3001
mongoose.connect(`${process.env.DB}`) 
app.listen(port, function () {
  console.log(`Example app listening on port ${port} on http://localhost:${port}`);
});