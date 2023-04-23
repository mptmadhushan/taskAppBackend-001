var nodemailer = require("nodemailer");
exports.mail = (req, res) => {
  const subject = "Contact Us";
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const message = req.body.message;
  const today = new Date().toLocaleDateString();

  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // hostname
    secureConnection: true, // use SSL
    port: 465,
    auth: {
      user: "mail.cpg.info@gmail.com",
      pass: "Passport@1",
    },
  });

  var mailOptions = {
    from: "mail.cpg.info@gmail.com",
    to: "sales@cpg.lk ",
    subject: subject,
    html: `<!doctype html>
      <html ⚡4email>
        <head>
          <meta charset="utf-8">
          <style amp4email-boilerplate>body{visibility:hidden}</style>
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
        </head>
        <body>
<p class="text-center">CONTACT US</p>
<br/>
        <div>• Name : ${name}</div>
        <div>• Email : ${phone}</div>
        <div>• Email : ${email}</div>
        <div>• Message : ${message}</div>
        </body>
      </html>`,
  };

  transporter
    .sendMail(mailOptions)

    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Exam_cancellation.",
      });
    });
};
