const cloudinary = require("cloudinary").v2;



const connectCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
    console.log("Connected to Cloudinary");
  } catch (error) {
    console.log("Impossible to connect to Cloudinary");
  }
};

module.exports = { connectCloudinary };