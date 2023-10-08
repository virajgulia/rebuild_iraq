const mailchimpTx = require("mailchimp_transactional")("YOUR_API_KEY");

async function run() {
  const response = await mailchimpTx.users.ping();
  console.log(response);
}

run();