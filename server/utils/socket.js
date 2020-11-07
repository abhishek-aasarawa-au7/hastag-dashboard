import Twit from "twit";
import { map } from "lodash";

// configs
import {
  TWITTER_API_SECRET,
  TWITTER_API_KEY,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET,
} from "../configs/twitter.configs";

// twitter setting
const T = new Twit({
  consumer_key: TWITTER_API_KEY,
  consumer_secret: TWITTER_API_SECRET,
  access_token: TWITTER_ACCESS_TOKEN,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});

const startIO = (io) => {
  io.on("connection", (client) => {
    const streams = {};
    console.log("connecting to client...");

    // subscribe
    client.on("subscribe", (hashtags) => {
      console.log("client sent hashtags==>", hashtags);
      for (let hashtag of hashtags) {
        console.log(`connecting for ${hashtag}..done`);
        streams[hashtag] = T.stream("statuses/filter", { track: hashtag });
        streams[hashtag].on("tweet", function (tweet) {
          io.emit(hashtag, tweet.text.length);
        });
      }
    });

    // unsubscribe
    client.on("disconnect", () => {
      console.log("disconnecting...");
      map(streams, (stream) => stream.stop());
    });
  });
};

export default startIO;
