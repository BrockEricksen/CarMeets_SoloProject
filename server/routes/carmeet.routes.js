const CarMeetController = require("../controllers/carmeet.controller");
const { authenticate, isLoggedIn } = require('../config/jwt.config');

module.exports = (app) => {
  app.post("/api/meet", authenticate, CarMeetController.createNewMeet);
  app.get("/api/meet", CarMeetController.getAllMeets);
  app.get("/api/meet/:id", CarMeetController.getOneMeet);
  app.put("/api/meet/:id", authenticate, CarMeetController.updateMeet);  // this route has to be authenticated for user to access
  app.delete("/api/meet/:id", authenticate, CarMeetController.deleteExistingMeet); // this route has to be authenticated for user to access
};