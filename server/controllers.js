import Twit from "twit";

// configs
import {
  TWITTER_API_SECRET,
  TWITTER_API_KEY,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET,
} from "./configs/twitter.configs";

// utils
import response from "./utils/response";
// catching errors
import catchError from "./utils/catchError";

const controller = {};

// twitter setting
let T = new Twit({
  consumer_key: TWITTER_API_KEY,
  consumer_secret: TWITTER_API_SECRET,
  access_token: TWITTER_ACCESS_TOKEN,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});

//  user signin control -------------------------------------------
controller.allWell = catchError(async (req, res, next) => {
  response(res, [], "server running well", false, 200);
});

// fetch twitter tweets
controller.tweets = catchError(async (req, res, next) => {
  T.get(
    "search/tweets",
    { q: `#tbt`, count: 100, include_entities: true },
    function (err, data, resp) {
      console.log(data.length);
      response(res, data, "tweets fetched", false, 200);
    }
  );
});

export default controller;
