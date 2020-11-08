import { check, validationResult } from "express-validator";

// model
import hashtagModel from "../models/hashtag.model";

// simplify error
import simplyfyErr from "../utils/simplyfyErr";

// checking if email is uniq or not
const isUniqHashtag = async (value) => {
  try {
    let hashtag = await hashtagModel.findOne({ name: value });

    // if hashtag present
    if (!!hashtag) throw new Error("");

    return true;
  } catch (err) {
    throw err;
  }
};

export const hashTagChecker = [
  check("name")
    .exists()
    .withMessage("Please provide hashtag")
    .custom(isUniqHashtag)
    .withMessage(`Hashtag is already present.`),
];

export const limitChecker = [
  check("limit")
    .exists()
    .withMessage("Please give a limit")
    .isInt({ min: 0, max: 1000 })
    .withMessage("Limit must be a integer between 0 to 1000"),
  check("name").exists().withMessage("Please provide hashtag"),
];

export const notificationChecker = [
  check("limit").exists().withMessage("Please give a limit"),
  check("name").exists().withMessage("Please provide hashtag"),
];

export const checkError = (req, res, next) => {
  try {
    validationResult(req).throw();
  } catch (err) {
    const singleKeyError = simplyfyErr(err.array());
    const errors = singleKeyError.map((e) => e.msg);
    const message = errors.join(",");
    req.validationErr = message;
  }
  next();
};
