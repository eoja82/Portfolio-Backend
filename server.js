require('dotenv').config()
const bodyParser = require("body-parser")
const express = require("express")

const app = express()
const port = process.env.PORT || 3000

app.use( bodyParser.json())

app.route(`/${process.env.API_URL}`)
  .post(function(req, res) {
    console.log("Route Hit")
    const email = req.body.email,
          subject = req.body.subject,
          message = req.body.message
    console.log(email, subject, message)
    res.json({email: email, message: message})
  })

//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type("text")
    .send("Not Found")
})

app.listen(port, () => {
  console.log("App is listening...")
})