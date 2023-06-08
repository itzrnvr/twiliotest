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
  console.log(req.body)
    res.send('Event received');
  });

app.post('/voice', (req, res) => {
    console.log("got pinged")
  // Generate a TwiML response
  let twiml = new twilio.twiml.VoiceResponse();

  twiml.gather({
    input: 'speech',
    timeout: 3,
    hints: ['cat', 'hello'],
    action: 'https://48b9-2401-4900-4456-9bff-8ba-384-58aa-ad30.ngrok-free.app/events'
  }).say({
    voice: 'Polly.Raveena',
    language: 'en-IN'
}, 'Welcome to speech demo, please say something')
  

  // If the user doesn't enter input, loop
  twiml.redirect('/voice');

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  // Send the TwiML as the response.
  res.send(twilio.toString())
})

// Run server to listen on port 3000.
const server = app.listen(3001, () => {
  console.log('listening on *:3001');
});
