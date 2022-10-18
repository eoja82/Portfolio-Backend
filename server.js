require('dotenv').config()
const bodyParser = require("body-parser")
const cors = require("cors")
const express = require("express")
const nodemailer = require("nodemailer")
//const helmet = require("helmet")

const app = express()
const port = process.env.PORT || 3000


app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())


app.route("/contact")
  .post(function(req, res) {
    const email = req.body.email,
          name = req.body.name,
          subject = req.body.subject,
          message = req.body.message
    
    if (email && name && subject && message) {
      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS
        }
      })
      const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: subject,
        html: `
          <p><b>Message:</b> ${message}</p>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
        `
      }
      transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
          console.log(err)
          res.json({error: "Sorry, something went wrong.  Please try again."})
        } else {
          res.json({success: "Thanks for getting in touch.  Your message has been sent."})
        }
      })
    } else {
      res.json({message: "Please fill out all fields."})
    }
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