const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-blessing', async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).send('Missing name or message');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASS
    }
  });

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: 'mkb1538bl@gmail.com',
    subject: `💌 New Blessing from ${name}`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Blessing sent successfully');
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).send('Failed to send blessing');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Blessing server running on port ${PORT}`));
