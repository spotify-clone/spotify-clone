const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const {EMAIL, PASSWORD} = process.env
module.exports ={
    email:async(req, res) =>{
       
       try  { 
           const msg = {
  to: 'test@example.com',
  from: 'test@example.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
const sendGrid = sgMail.send(msg);
console.log(sendGrid)
await sendGrid
res.status(200).send(msg)
       }
 catch (err) {
    res.status(500).send(err)
 }
}
}