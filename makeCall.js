require('dotenv').config()

const accountSid = process.env.SID;
const authToken = process.env.TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = function makeCall(to){
    client.calls.create({
        url: `${process.env.BASEURL}/action/digit`,
        method: 'GET',
        to: `+91${to}`,
        from: '+18668394428',
        statusCallback: `${process.env.BASEURL}/events`,
        statusCallbackMethod: 'POST',
        statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
    }).then(call => console.log(call.sid))
}

    