const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    players: [{ type: Schema.Types.ObjectId, ref: "Player" }],
    titles: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);



const Team = mongoose.model("Team", teamSchema);
module.exports = Team;