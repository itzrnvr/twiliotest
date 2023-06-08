const accountSid = "AC0e6fbce2ba56bf5e7a679f444dfeca89";
const authToken = "e61da247ab9e5d6af8bc2936d251af72";
const client = require('twilio')(accountSid, authToken);

const ngrok = 'https://48b9-2401-4900-4456-9bff-8ba-384-58aa-ad30.ngrok-free.app'

client.calls
    .create({
        method: 'POST',
        url: `https://48b9-2401-4900-4456-9bff-8ba-384-58aa-ad30.ngrok-free.app/voice`,
        to: '+917091447295',
        from: '+13614701971',
        statusCallback: 'https://48b9-2401-4900-4456-9bff-8ba-384-58aa-ad30.ngrok-free.app/events',
        statusCallbackMethod: 'POST',
        statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
    })
    .then(call => console.log(call.sid));

    