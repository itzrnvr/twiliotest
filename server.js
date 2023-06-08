"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const app = express();

app.use(bodyParser.urlencoded({ extended: false } ));

// Set Express routes.
app.post('/events', (req, res) => {
    let to = req.body.to;
    let fromNumber = req.body.from;
    let callStatus = req.body.CallStatus;
    let callSid = req.body.callSid;
  
  console.log(to, fromNumber, callStatus, callSid);
    res.send('Event received');
  });

app.post('/voice', (req, res) => {
    console.log("got pinged")
  // Generate a TwiML response
  let twiml = new twilio.twiml.VoiceResponse();
  // Talk in a robot voice over the phone.
  twiml.say('Call progress events are rad');
  // Set the response type as XML.
  res.header('Content-Type', 'text/xml');
  // Send the TwiML as the response.
  res.send(twiml.toString());
});

// Run server to listen on port 3000.
const server = app.listen(3001, () => {
  console.log('listening on *:3001');
});
