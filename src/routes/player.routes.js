const express = require("express");
const { isAuth } = require("../middlewares/auth.middleware");
const Player = require("../models/player.model");
const upload = require("../middlewares/file");
const { deleteFiles } = require("../utils/deleteFiles");
const playerRouter = express.Router();



playerRouter.get("/", async (req, res) => {
  try {
    const players = await Player.find();
    return res.status(200).json(players);
  } catch (error) {
    return res.status(500).json(error);
  }
});

playerRouter.post("/create", upload.single("img"), async (req, res, next) => {
  try {

    const newPlayer = new Player(req.body);

    if (req.file) {
      newPlayer.img = req.file.path;
    }

    const existingPlayer = await Player.findOne({ name: req.body.name });
    if (existingPlayer) {
      throw new Error("Already exists");
    }
    const createdPlayer = await newPlayer.save();
    return res.status(201).json(createdPlayer);
  } catch (error) {
    next(error);
  }
});





playerRouter.delete("/delete/:id", [isAuth], async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPlayer = await Player.findByIdAndDelete(id);

    deleteFiles(deletedPlayer.img);

    return res.status(200).json(`Player ${deletedPlayer.name} deleted`);
  } catch (error) {
    return next(error);
  }
});


module.exports = playerRouter;