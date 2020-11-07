// importing package
import express from "express";

// controller
import controller from "./controllers";

// route
let route = express.Router();

// paths
route.get("/", controller.allWell);
route.get("/tweets", controller.tweets);

export default route;
