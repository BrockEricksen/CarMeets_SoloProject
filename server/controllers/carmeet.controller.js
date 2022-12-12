const Meet = require("../models/carmeets.model");

// Create
const createNewMeet = (req, res) => {
  Meet.create(req.body) // could add --> meetHost: req.Token.id    to make it auto set
    .then((newMeet) => {
      res.json({ newMeet });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

// Read all
const getAllMeets = (req, res) => {
  Meet.find()
    .then((allMeets) => {
      res.json(allMeets);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

// Read one
const getOneMeet = (req, res) => {
  Meet.findOne({ _id: req.params.id })
    .then((queriedMeet) => {
      res.json(queriedMeet);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

// Update
const updateMeet = (req, res) => {
  Meet.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedMeet) => {
      res.json({ updatedMeet });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

// Delete
const deleteExistingMeet = (req, res) => {
  Meet.deleteOne({ _id: req.params.id })
    .then((deletedResponse) => {
      res.json({ deletedResponse });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

module.exports = {createNewMeet, getOneMeet, getAllMeets, updateMeet, deleteExistingMeet};