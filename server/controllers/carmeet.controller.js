const Pet = require("../models/carmeets.model");

// Create
const createNewMeet = (req, res) => {
  Pet.create(req.body)
    .then((newMeet) => {
      res.json({ newMeet });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

// Read all
const getAllMeets = (req, res) => {
  Pet.find()
    .then((allMeets) => {
      res.json(allMeets);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

// Read one
const getOneMeet = (req, res) => {
  Pet.findOne({ _id: req.params.id })
    .then((queriedMeet) => {
      res.json(queriedMeet);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

// Update
const updateMeet = (req, res) => {
  Pet.findOneAndUpdate({ _id: req.params.id }, req.body, {
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
  Pet.deleteOne({ _id: req.params.id })
    .then((deletedResponse) => {
      res.json({ deletedResponse });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

module.exports = {createNewMeet, getOneMeet, getAllMeets, updateMeet, deleteExistingMeet};