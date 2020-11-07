import openSocket from "socket.io-client";
import serverURL from "../configs/serverURL";

// connecting to server
const socket = openSocket(serverURL, {
  transports: ["websocket"],
});

if (socket.disconnect) console.log("not able to connect..");

// // if connection failed
// socket.on("connect_failed", () => {
//   console.log(
//     "sorry! connection it not established. Let us try again in 5 sec"
//   );
// });

// // if reconnection failed
// socket.on("reconnect_failed", () => {
//   console.log(
//     "sorry! reconnection it not established. Let us try again in 5 sec"
//   );
// });

export const subscribe = (cb, hashtags) => {
  for (let hashtag of hashtags) {
    socket.on(hashtag, (value) => cb(null, value, hashtag));
  }
  socket.emit("subscribe", hashtags);

  // if for any reason server disconnected
  socket.on("disconnect", () => {
    console.log("Looks like an error occurred");
    setTimeout(() => subscribe(cb, hashtags), 5 * 1000);
  });
};

export const unsubscribe = () => {
  socket.disconnect();
};
