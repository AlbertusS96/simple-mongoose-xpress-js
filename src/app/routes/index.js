const express = require("express");

const noteRoute = require("./notes.routes");
const { logRequest } = require("../middleware/logging");

const router = express.Router();

router.all("*", logRequest);

const defaultRoutes = [
  {
    path: "/notes",
    route: noteRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
