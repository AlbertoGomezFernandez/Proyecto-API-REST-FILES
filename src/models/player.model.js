const mongoose = require("mongoose");
const Team = require("./team.model");


const Schema = mongoose.Schema;

const playerSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    team: { type: String, required: true },
    img: { type: String, required: true }
  },
  {
    timestamps: true
  }
);


playerSchema.post('save', async function (doc) {
  await Team.updateOne({ name: doc.team }, { $addToSet: { players: doc._id } });
});


const Player = mongoose.model("Player", playerSchema);
module.exports = Player;