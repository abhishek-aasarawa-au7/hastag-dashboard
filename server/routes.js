// importing package
import express from "express";

// controller
import controller from "./controllers";

// validators
import {
  checkError,
  limitChecker,
  hashTagChecker,
  notificationChecker,
} from "./validators/data.validator";

// route
let route = express.Router();

// paths
route.post("/create", hashTagChecker, checkError, controller.saveHashtag);
route.get("/all", controller.allHashTags);
route.get("/limits", controller.allLimits);
route.post("/change", limitChecker, checkError, controller.updateLimit);
route.post(
  "/save",
  notificationChecker,
  checkError,
  controller.saveNotification
);
route.get("/notifications", controller.allNotifications);

export default route;
