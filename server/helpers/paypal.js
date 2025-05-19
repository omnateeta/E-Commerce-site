const paypal = require("paypal-rest-sdk");

console.log('PAYPAL_MODE is: [' + process.env.PAYPAL_MODE + ']');


paypal.configure({
  mode: "sandbox",
  client_id: "AS-HxOoknfb_7WGiZm2Lu5Bf05HOm-dn7Eg82CG5mcHQ5RSGkv0-euIAhLYmzWq1BnbnJmMAJtkI1GWn",
  client_secret: "EIOA8M8SLa5IPraTpZeOcGvZR-HC40nEkHtKnSY5RDIJOcCsYVHFxQfQaIU2awq-4TFMdiwWNPXZxvhQ",
});


module.exports = paypal;
