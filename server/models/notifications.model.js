import mongoose, { Schema } from "mongoose";
import moment from "moment";

// making schema
const notificationSchema = Schema;

// defining schema
const notification = new notificationSchema({
  name: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    default: moment().format("DD-MM-YY, hh:mm a"),
  },
});

// creating model
const notificationModel = mongoose.model("notification", notification);

export default notificationModel;
