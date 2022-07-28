require('dotenv').config()
const bodyParser = require("body-parser")
const express = require("express")

const app = express()
const port = process.env.PORT || 3000

// create application/json parser
var jsonParser = bodyParser.json()

//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type("text")
    .send("Not Found")
})

app.listen(port, () => {
  console.log("App is listening...")
})