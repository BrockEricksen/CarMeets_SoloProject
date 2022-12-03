const carmeetController = require("../controllers/carmeet.controller");

module.exports = (app) => {
  app.post("/api/meet", carmeetController.createNewMeet);
  app.get("/api/meet", carmeetController.getAllMeets);
  app.get("/api/meet/:id", carmeetController.getOneMeet);
  app.put("/api/meet/:id", carmeetController.updateMeet);
  app.delete("/api/meet/:id", carmeetController.deleteExistingMeet);
};