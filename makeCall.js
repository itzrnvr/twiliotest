require('dotenv').config()

const accountSid = process.env.SID;
const authToken = process.env.TOKEN;
const client = require('twilio')(accountSid, authToken);


client.calls.create({
    url: `${process.env.BASEURL}/action/digit`,
    method: 'GET',
    to: '+917091447295',
    from: '+13614701971',
    statusCallback: `${process.env.BASEURL}/events`,
    statusCallbackMethod: 'POST',
    statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
}).then(call => console.log(call.sid))
    