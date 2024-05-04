const cloudinary = require("cloudinary");


const deleteFiles = (url) => {


  const urlArray = url.split("/");
  const name = urlArray.at(-1).split(".")[0];
  const folder = urlArray.at(-2);
  let public_id = `${folder}/${name}`;

  cloudinary.uploader.destroy(public_id, () => { console.log("Image deleted"); });
};



module.exports = { deleteFiles };