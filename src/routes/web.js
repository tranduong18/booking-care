const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");

const initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);

  router.get("/about", homeController.getAboutPage);

  return app.use("/", router);
}

module.exports = initWebRoutes;