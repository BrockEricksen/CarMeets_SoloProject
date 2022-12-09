const UserController = require("../controllers/user.controller");
const { authenticate, isLoggedIn } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/register", UserController.register);
  app.post("/api/login", UserController.login);
  app.get("/api/logout", UserController.logout);
  app.post("/api/isLoggedIn", isLoggedIn); // this route has to make sure user is logged in first
  app.get("/api/users", authenticate, UserController.getAll); // this route has to be authenticated for user to access
};