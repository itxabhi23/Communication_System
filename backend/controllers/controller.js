const postmark = require('postmark');
const Email = require('../model/Email');
const User = require("../model/User")
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);


const login = async (req, res) => {
  const { data } = req.body;
  console.log(data)
  if (!data || !data.email) {
    return res.status(400).json({
      success: false,
      message: "No data or email provided",
    });
  }

  try {
    let user = await User.findOne({ email: data.email });

    if (!user) {
      // Create new user
      user = new User({
        googleId: data.sub,
        name: data.name,
        email: data.email,
        emailverified: data.email_verified,
        exp: data.exp,
      });

      await user.save();
    }
    else {
      user.exp = data.exp;
      if (user.googleId != data.sub) {
        user.googleId = data.sub;
      }
      if (!user.emailverified) {
        user.emailverified = data.email_verified
      }
      await user.save();
    }
    res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      user,
    });

  } catch (err) {
    console.error("Auth Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}


const getEmails = async (req, res) => {
  try {
    if (!req.user) return res.status(401).send("Unauthorized");
    const emails = await Email.find({ user: req.user.id });
    res.status(200).json({
      "success": true,
      "message": "Email feteched successfully",
      "data": emails
    });
  } catch (error) {
    res.status(500).json({
      "success": false,
      "message": "Failed to fetch email"
    });
  }
};

const sendEmail = async (req, res) => {
  const { to, subject, body } = req.body;

  try {
    await client.sendEmail({
      From: "210104001@hbtu.ac.in",
      To: to,
      Subject: subject,
      HtmlBody: body,
    });

    const email = new Email({ user: req.user.id, to, subject, body });
    await email.save();

    res.status(200).json({
      "success": true,
      "message": "Email Sent SuccessFull",
    });
  } catch (err) {
    res.status(500).json({
      "success": false,
      "message": "Failed to send email"
    });
  }
};


const getUserProfile = async (req, res) => {
  if (!req.user) {
    res.status(401).json({
      message: "Unatuhrised",
      success: false
    })
  }
  try {
    const user = await User.findOne({ googleId: req.user.googleId })
    if (!user) {
      res.status(400).json({
        "success": false,
        "message": "User not found"
      });
    }
    res.status(200).json({
      "success": true,
      "message": "Fetched SuccessFuly",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      "success": false,
      "message": "Failed to send email"
    });
  }

}

module.exports = {
  login,
  sendEmail,
  getEmails,
  getUserProfile
}