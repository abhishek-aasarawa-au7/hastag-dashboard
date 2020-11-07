import React, { useEffect } from "react";
import Axios from "axios";

const List = () => {
  // (async () => {
  //   try {
  //     let response = await Axios.get("http://localhost:5000/api/tweets");
  //     console.log(response.data);
  //   } catch (err) {
  //     console.dir(err);
  //   }
  // })();

  (async () => {
    if (!!window.EventSource) {
      var source = new EventSource("http://localhost:5000/api/stream");

      source.addEventListener(
        "hashtag",
        function (e) {
          console.log(e.data);
        },
        false
      );

      source.addEventListener(
        "message",
        function (e) {
          console.log(e.data);
        },
        false
      );

      source.onmessage = function (e) {
        console.log(e.data);
      };

      source.addEventListener(
        "open",
        function (e) {
          console.log("open..", e.data);
        },
        false
      );

      source.addEventListener(
        "error",
        function (e) {
          if (e.eventPhase === EventSource.CLOSED) source.close();
          if (e.target.readyState === EventSource.CLOSED) {
            console.log("disconnected", e.data);
          } else if (e.target.readyState === EventSource.CONNECTING) {
            console.log("connecting..", e.data);
          }
        },
        false
      );
    } else {
      console.log("Your browser doesn't support SSE");
    }
  })();

  return <h1>List</h1>;
};

export default List;
