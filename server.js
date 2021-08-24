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
  username: {type: String, required: true},
  count: {type: Number, default: 0},
  log: [{
    description: String,
    duration: Number,
    date: Date
  }]
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
        var newUser = await userModel.create({username: username})
        
      }
      else{
        var newUser = data;
      }
      res.send({username: newUser.username, _id: newUser._id})
 
    }
  })

}).get((req, res) =>{
  userModel.find({}, (err, data) => {
    res.send(data)
  })
})


app.post("/api/users/:_id/exercises", async (req, res) => {
  console.log(req.body);
  let id = req.params._id

  if (!req.body.date){
    req.body.date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  }

  userModel.findByIdAndUpdate(id,{ $inc: { count: 1 }, $push: { log: req.body }}, { new: true }, (err, data) => {
    console.log("LOLPAWDKAW");
    res.send({
      _id: id,
      username: data.username,
      date: req.body.date,
      description: req.body.description,
      duration: req.body.duration,
    })

  })


})


app.get("/api/users/:_id/logs", async (req, res) => {

  let id = req.params._id
  let to = req.query.to
  console.log(req.query.from, req.query.to)
  if (to == undefined){
    to = new Date;
  }
  let from = req.query.from
  if (from == undefined){
    from = new Date(null)
  }
  console.log(id,from,to);
  let limit = req.query.limit

  userModel.find({ '_id': id}, (err, data) => {
    data.log.map((e) => {
      
    })
  })

})



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
