import mongoose, { Schema } from "mongoose";

// making schema
const hashtagSchema = Schema;

// defining schema
const hashtag = new hashtagSchema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  limit: {
    type: Number,
    default: 0,
  },
});

// creating model
const hashtagModel = mongoose.model("hashtag", hashtag);

export default hashtagModel;
