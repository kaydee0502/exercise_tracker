const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const { Schema } = mongoose


const userSchema = new Schema({
  username: {type: String, required: true}
})

let userModel = mongoose.model("userModel", userSchema)

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.route('/api/users').post((req, res) => {
  const username = req.body.username
  userModel.findOne({username: username}, async (err, data) => {
    if (err) {
      res.send({error: "Something went wrong!"})
    }
    else{
      if (data == null){
        let newUser = await userModel.create({username: username})
        res.send({username: newUser.username, _id: newUser._id})
      }
      else{
        res.status(400)
        res.send("Username already taken.")
      }
    }
  })

}).get((req, res) =>{
  userModel.find({}, (err, data) => {
    res.send(data)
  })
})


app.post("/api/users/:_id/exercises", (req, res) => {
  
})



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
