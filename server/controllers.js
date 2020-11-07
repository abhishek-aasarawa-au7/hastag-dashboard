import Twit from "twit";
import SSE from "express-sse";

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

const sse = new SSE();

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

// setting stream
controller.stream = catchError(async (req, res, next) => {
  // // setting stream header
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  let stream = T.stream("statuses/filter", { track: "#apple" });

  stream.on("tweet", function (tweet) {
    console.log(tweet.text.length);
    res.write("length: " + tweet.text.length + "\n\n");
  });

  stream.on("disconnect", function (disconnectMessage) {
    console.log(disconnectMessage);
    stream.stop();
    res.end();
  });

  stream.on("error", function (err) {
    console.log(err.message);
    stream.stop();
    res.end();
  });

  // setting stream header
  // sse.init(req, res);

  // let stream = T.stream("statuses/filter", { track: "#apple" });

  // stream.on("tweet", function (tweet) {
  //   console.log(tweet.text.length);
  //   sse.send(tweet.text.length, "hashtag");
  // });

  // stream.on("disconnect", function (disconnectMessage) {
  //   console.log(disconnectMessage);
  //   stream.stop();
  // });

  // stream.on("error", function (err) {
  //   console.log(err.message);
  //   stream.stop();
  // });
});

export default controller;
