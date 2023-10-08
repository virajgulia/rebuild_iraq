const mandrill = require("mandrill-api/mandrill");
const mandrill_client = new mandrill.Mandrill(process.env.MAILCHIM_API_KEY);

const sendMail = async ({ emails, html, text, subject }) => {
  const message = {
    html: html,
    text: text,
    subject: subject,
    from_email: "hello@rebuildingiraq.net",
    from_name: "Rebuilding Iraq Support",
    to: emails,
    // headers: {
    //   "Reply-To": "message.reply@example.com",
    // },
    important: false,
    track_opens: null,
    track_clicks: null,
    auto_text: null,
    auto_html: null,
    inline_css: null,
    url_strip_qs: null,
    preserve_recipients: null,
    view_content_link: null,
    bcc_address: "message.bcc_address@example.com",
    tracking_domain: null,
    signing_domain: null,
    return_path_domain: null,
    merge: true,
    merge_language: "mailchimp",
    global_merge_vars: [
      {
        name: "merge1",
        content: "merge1 content",
      },
    ],
    merge_vars: [
      {
        rcpt: "recipient.email@example.com",
        vars: [
          {
            name: "merge2",
            content: "merge2 content",
          },
        ],
      },
    ],
    tags: ["password-resets"],
    google_analytics_domains: ["example.com"],
    google_analytics_campaign: "message.from_email@example.com",
    metadata: {
      website: "www.example.com",
    },
    recipient_metadata: [
      {
        rcpt: "recipient.email@example.com",
        values: {
          user_id: 123456,
        },
      },
    ],
  };
  const async = false;
  const ip_pool = "Main Pool";
  await mandrill_client.messages.send(
    { message: message, async: async, ip_pool: ip_pool },
    function (result) {
      console.log(result);

      return {
        status: "sent",
        data: result,
      };
      /*
    [{
            "email": "recipient.email@example.com",
            "status": "sent",
            "reject_reason": "hard-bounce",
            "_id": "abc123abc123abc123abc123abc123"
        }]
    */
    },
    function (e) {
      // Mandrill returns the error as an object with name and message keys
      console.log("A mandrill error occurred: " + e.name + " - " + e.message);
      // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
      return {
        status: "failed",
        error: e,
      };
    }
  );
};

module.exports = sendMail;
