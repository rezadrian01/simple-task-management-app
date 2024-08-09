const { google } = require("googleapis");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.DOMAIN_API}/auth/google/callback`
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
});

exports.getAuth = async (req, res, next) => {
  return res.redirect(authorizationUrl);
};

exports.getAuthCallback = async (req, res, next) => {
  try {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({
      version: "v2",
      auth: oauth2Client,
    });
    const { data } = await oauth2.userinfo.get();
    console.log(data);
    if (!data.name || !data.email) {
      throw new Error();
    }
    const user = await User.findOne({ email: data.email });
    let token;
    if (user) {
      token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.SECRET_KEY,
        { expiresIn: "365d" }
      );
    } else {
      const newUser = new User({
        email: data.email,
        name: data.name,
      });
      const createdUser = await newUser.save();
      token = jwt.sign(
        {
          userId: createdUser._id,
        },
        process.env.SECRET_KEY,
        { expiresIn: "365d" }
      );
    }
    res.status(200).json({
      success: true,
      message: "Auth Success",
      token,
    });
  } catch (err) {
    next(err);
  }
};
