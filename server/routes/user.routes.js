const UserController = require("../controllers/user.controller");
const { authenticate, isLoggedIn } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/register", UserController.registerUser);
  app.post("/api/login", UserController.loginUser);
  app.post("/api/logout", UserController.logOutUser);
  app.get("/api/getLoggedUser", authenticate, isLoggedIn);
  app.get("/api/users", UserController.getAllUsers);
};