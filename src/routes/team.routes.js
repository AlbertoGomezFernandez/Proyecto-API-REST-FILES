const express = require('express');
const { isAuth } = require('../middlewares/auth.middleware');
const Team = require('../models/team.model');
const teamRouter = express.Router();

teamRouter.get("/", async (req, res, next) => {
  try {
    const teams = await Team.find().populate("players");
    return res.status(200).json(teams);
  } catch (error) {
    next(error);
  }
});

teamRouter.post("/create", async (req, res, next) => {

  try {
    const newTeam = new Team({
      name: req.body.name,
      players: [],
      titles: req.body.titles
    });
    const existingTeam = await Team.findOne({ name: req.body.name });
    if (existingTeam) {
      throw new Error("Already exists");
    }
    const createdTeam = await newTeam.save();
    return res.status(201).json(createdTeam);
  } catch (error) {
    next(error);
  }
});


teamRouter.delete("/delete/:id", isAuth, async (req, res, next) => {
  try {
    const id = req.params.id;
    await Team.findByIdAndDelete(id);
    return res.status(200).json(`Team deleted!`);
  } catch (error) {
    next(error.message);
  }
});

module.exports = teamRouter;