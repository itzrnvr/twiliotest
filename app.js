require('dotenv').config()

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require('body-parser');
const twilio = require('twilio');
const makeCall = require('./makeCall');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true } ));


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.post('/smartCall', (req, res)=> {
    makeCall(req.body['Lead Number'])
    console.log(req.body)
    io.sockets.emit("foo", req.body);
    res.send("Done")
})

app.get('/action/digit', (req, res) => {
    console.log("PINged")
    const twiml = new twilio.twiml.VoiceResponse();
    const gather = twiml.gather({
      action: `${process.env.BASEURL}/action/digit`,
      input: 'speech',
      enhanced: 'true',
      speechModel:'phone_call',
      timeout: 3,
      hints: ['yes', 'no'],
      method: 'POST',
    //   partialResultCallback: `${process.env.BASEURL}/action/partialResult` , 
    //   partialResultCallbackMethod: 'POST'
    });
  
    gather.say("Hello there, this is a call from Health Insure. Please say Yes to continue or NO to disconnect the call.");


    twiml.redirect({
      method: 'GET'
    }, `${process.env.BASEURL}/action/digit`);
  
    res.set(`Content-Type`, `text/xml`);
  
    res.send(twiml.toString());
})
  
// app.post('/action/partialResult', (req, res) => {
//     console.log(req.body.UnstableSpeechResult)
// })

app.post('/action/digit', (req, res) => {
    console.log(req.body)
    console.log(req.body.SpeechResult)
    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say({ voice:`alice` }, `Thank you for your feedback. You said ${req.body.SpeechResult}`);
    res.type(`text/xml`);
    res.send(twiml.toString());
})

app.post('/events', (req, res) => {
    let callStatus = req.body.CallStatus;
    io.sockets.emit("callEvents", req.body.CallStatus);
    console.log(callStatus);
});



server.listen(3000, () => {
  console.log("SERVER IS RUNNING");
});