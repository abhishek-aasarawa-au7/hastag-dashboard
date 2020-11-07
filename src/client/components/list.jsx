import React, { Fragment, useState, useEffect } from "react";
import { map, sum } from "lodash";

// subscribe
import { subscribe, unsubscribe } from "../handlers/subscribe";

const hashtags = [
  "ExitPolls",
  "#EVEMUN",
  "#CallTheElection",
  "#GetWellSoonYoongi",
];

const makeObject = (hashtags) => {
  let obj = {};
  for (let hashtag of hashtags) {
    obj[hashtag] = { list: [], size: 0 };
  }
  return obj;
};

const average = (arr) => {
  let s = sum(arr);
  let value = Math.floor(s / arr.length);
  return !!value ? value : 0;
};

const List = () => {
  const [data, setData] = useState(makeObject(hashtags));

  useEffect(() => {
    const receiveUpdate = (err, value, hashtag) => {
      if (!err) {
        // if length of arr is less than 50
        setData((prevData) => {
          console.log(prevData, hashtag);
          if (prevData[hashtag].size < 50) {
            return {
              ...prevData,
              [hashtag]: {
                ...prevData[hashtag],
                list: [...prevData[hashtag].list, value],
                size: prevData[hashtag].size + 1,
              },
            };
          } else {
            let arr = [...prevData[hashtag].list];
            arr.splice(0, 1);
            return {
              ...prevData,
              [hashtag]: {
                ...prevData[hashtag],
                list: [...arr, value],
              },
            };
          }
        });
      }
    };
    subscribe(receiveUpdate, hashtags);

    // unsubscribe when component unmount
    return () => {
      console.log("unsubscribing");
      unsubscribe();
    };
  }, []);

  return (
    <Fragment>
      <h1>List</h1>
      {map(data, (value, idx) => (
        <h5 key={idx}>{average(value.list)}</h5>
      ))}
    </Fragment>
  );
};

export default List;
