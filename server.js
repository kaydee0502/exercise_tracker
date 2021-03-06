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


const exerciseSchema = new Schema({
  description: {type: String, required: true},
  duration: {type: Number, required: true},
  date: Date
})

const userSchema = new Schema({
  username: {type: String, required: true},
  count: {type: Number, default: 0},
  log: [exerciseSchema]
})

let userModel = mongoose.model("userModel", userSchema)
let exerciseModel = mongoose.model("exerciseModel", exerciseSchema)

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

    data = data.map((e) => {
      return { "_id": e._id, "username": e.username }
    })
    res.send(data)
  })
})


app.post("/api/users/:_id/exercises", async (req, res) => {
  console.log(req.body);
  let id = req.params._id

  if (!req.body.date){
    req.body.date = new Date().toDateString();
  }
  else{
    req.body.date = new Date(req.body.date).toDateString();
    
  }

  let newExer = exerciseModel.create({
    description: req.body.description,
    duration: parseInt(req.body.duration),
    date: req.body.date,
    
  })
  userModel.findByIdAndUpdate(id,{ $inc: { count: 1 }, $push: { log: req.body }}, { new: true }, (err, data) => {
    console.log(JSON.stringify(data));
    res.send({
      _id: id,
      username: data.username,
      date: req.body.date,
      description: req.body.description,
      duration: parseInt(req.body.duration),
    })

  })


})


// app.get("/api/users/:_id/logs", async (req, res) => {

//   let id = req.params._id
//   let to = req.query.to

//   if (to == undefined){
//     to = new Date;
//   }
//   let from = req.query.from
//   if (from == undefined){
//     from = new Date(null)
//   }

//   let limit = req.query.limit

//   userModel.findOne({ '_id': id}, (err, data) => {
//     console.log(data);
//     if (err) { res.send(err); return; }
    
//     data.log = data.log.filter((e) => {
//       console.log(from, e.date, to)
//       return new Date(e.date) > from
//     })
//     debugger;

//     res.send(data)
//   })

// })

app.get("/api/users/:_id/logs", (request, response) => {
  
  userModel.findById(request.params._id, (error, result) => {
    if(!error){
      let responseObject = result
      
      if(request.query.from || request.query.to){
        
        let fromDate = new Date(0)
        let toDate = new Date()
        
        if(request.query.from){
          fromDate = new Date(request.query.from)
        }
        
        if(request.query.to){
          toDate = new Date(request.query.to)
        }
        
        fromDate = fromDate.getTime()
        toDate = toDate.getTime()
        
        responseObject.log = responseObject.log.filter((session) => {
          let sessionDate = new Date(session.date).getTime()
          console.log(fromDate, sessionDate, toDate)
          return sessionDate >= fromDate && sessionDate <= toDate
          
        })
        
      }
      
      if(request.query.limit){
        responseObject.log = responseObject.log.slice(0, request.query.limit)
      }
      
      responseObject = responseObject.toJSON()
      responseObject['count'] = result.log.length
      response.json(responseObject)
    }
  })
  
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
