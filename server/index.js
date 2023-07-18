const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(cors());
// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail'
  auth: {
    user: "diviamsingh0@gmail.com",
    pass: "ntvxidlsfylpeqxh" ,
  },
});

// Handle contact form submission
app.post('/contact_us', (req, res) => {
  const { name, email, phone, service, message } = req.body;

  const mailOptions = {
    from: email,
    to: "beta@m.dealsfordell.com", // Change to the recipient's email address
    subject: service,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ status: 'success', message: 'Email sent successfully' });
    }
  });
});
// Handle CV section form submission
app.post('/cv-section', upload.single('attachment'), (req, res) => {
  const { name, email, phone } = req.body;
  const cvPath = req.file ? req.file.path : null;

  const mailOptions = {
    from: email,
    to: "beta@m.dealsfordell.com",
    subject: 'Carrer Section For Cv uplaod',
    text: `Name: ${name}\nPhone: ${phone}`,
    attachments: cvPath ? [{ path: cvPath }] : [],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ status: 'error', message: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ status: 'success', message: 'CV section form submitted successfully' });
    }
  });
});


// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
