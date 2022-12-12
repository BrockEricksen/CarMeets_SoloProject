const CarMeetController = require("../controllers/carmeet.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
  app.post("/api/meet", authenticate, CarMeetController.createNewMeet); // these routes has to be authenticated for user to access
  app.get("/api/meet", authenticate, CarMeetController.getAllMeets);
  app.get("/api/meet/:id", authenticate, CarMeetController.getOneMeet);
  app.put("/api/meet/:id", authenticate, CarMeetController.updateMeet);
  app.delete("/api/meet/:id", authenticate, CarMeetController.deleteExistingMeet);
};