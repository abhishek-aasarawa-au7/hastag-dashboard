// utils
import response from "./utils/response";
// catching errors
import catchError from "./utils/catchError";

const controller = {};

//  user signin control -------------------------------------------
controller.allWell = catchError(async (req, res, next) => {
  response(res, [], "server running well", false, 200);
});

export default controller;
