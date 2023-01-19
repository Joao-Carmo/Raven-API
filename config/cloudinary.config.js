const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
  cloud_name: "dwxcjqai4",
  api_key: "376697927827928",
  api_secret: "zDqyyiAKLIt3AyAH8wxzbANrTSw"
});

module.exports = cloudinary;