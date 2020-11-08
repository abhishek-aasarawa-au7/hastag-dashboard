// model
import hashtagModel from "./models/hashtag.model";
import notificationModel from "./models/notifications.model";

// utils
import response from "./utils/response";
// catching errors
import catchError from "./utils/catchError";

const controller = {};

//  save hashtag in database -------------------------------------------
controller.saveHashtag = catchError(async (req, res, next) => {
  if (!!req.validationErr)
    return response(res, null, req.validationErr, true, 400);

  let { name, limit = 0 } = req.body;
  let hashtag = new hashtagModel({ name, limit });
  hashtag = await hashtag.save();
  response(res, hashtag, "hashtag saved", false, 200);
});

// all hashtags
controller.allHashTags = catchError(async (req, res, next) => {
  let allData = await hashtagModel.find({});

  // if no data found
  if (!allData || allData.length === 0)
    return response(res, [], "No Hashtag found in database", false, 404);

  // else
  let hashtags = allData.map((data) => {
    return data.name;
  });
  response(res, hashtags, "all hashtags", true, 200);
});

// all limits wih hashtags
controller.allLimits = catchError(async (req, res, next) => {
  let allData = await hashtagModel.find({});

  // if no data found
  if (!allData || allData.length === 0)
    return response(res, [], "No Hashtag found in database", true, 404);

  // else
  let hashtags = allData.map((data) => {
    return { name: data.name, limit: data.limit };
  });
  response(res, hashtags, "all hashtags", false, 200);
});

// change limit
controller.updateLimit = catchError(async (req, res, next) => {
  if (!!req.validationErr)
    return response(res, null, req.validationErr, true, 400);

  let { name, limit } = req.body;

  console.log(name, limit);

  // find hashtag
  let hashtag = await hashtagModel.findOne({ name });

  // if not found
  if (!hashtag)
    return response(res, [], `${name} is not in database`, true, 404);

  // else
  hashtag.limit = limit;
  hashtag = await hashtag.save();

  response(res, hashtag, `${name} limit changed to ${limit}`, false, 200);
});

// save notification
controller.saveNotification = catchError(async (req, res, next) => {
  if (!!req.validationErr)
    return response(res, null, req.validationErr, true, 400);
  let { name, limit } = req.body;
  let notification = new notificationModel({ name, limit });
  notification = await notification.save();
  response(res, notification, "notification saved", false, 200);
});

// all notifications
controller.allNotifications = catchError(async (req, res, next) => {
  let allData = await notificationModel.find({});
  response(res, allData, "all notifications", true, 200);
});

export default controller;
