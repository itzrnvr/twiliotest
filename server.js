require('dotenv').config()

const BASEURL = process.env.BASEURL

const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const app = express();

app.use(bodyParser.urlencoded({ extended: false } ));

app.get('/action/digit', (req, res) => {
  console.log("PINged")
  const twiml = new twilio.twiml.VoiceResponse();
  const gather = twiml.gather({
    action: `${process.env.BASEURL}/action/digit`,
    input: 'speech',
    timeout: 4,
    hints: ['cat', 'hello'],
    method: 'POST'
  });

  gather.say("Hello user, please say CAT");

  twiml.redirect({
    method: 'GET'
  }, `${process.env.BASEURL}/action/digit`);

  res.set(`Content-Type`, `text/xml`);

  res.send(twiml.toString());
})


app.post('/action/digit', (req, res) => {
  console.log(req.body)
  console.log(req.body.SpeechResult)
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say({ voice:`alice` }, `Thank you for your feedback.`);
  res.type(`text/xml`);
  res.send(twiml.toString());
})

app.post('/events', (req, res) => {
  let callStatus = req.body.CallStatus;
  
  console.log(callStatus);

  res.send('Event received');
});


const server = app.listen('3000', () => {
  console.log(`listening on *:${process.env.PORT}`);
});
