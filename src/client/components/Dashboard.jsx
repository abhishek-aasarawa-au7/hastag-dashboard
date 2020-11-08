import React, { Fragment, useState, useEffect, useCallback } from "react";
import { map, sum, isEmpty } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";

// subscribe
import { subscribe, unsubscribe } from "../handlers/subscribe";

// server url
import serverURL from "../configs/serverURL";

import { checkAvg } from "../handlers/checkAvg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  gridLeft: {
    marginLeft: "5%",
  },
}));

const makeObject = (hashtags) => {
  let obj = {};
  for (let hashtag of hashtags) {
    obj[hashtag] = { list: [], size: 0 };
  }
  return obj;
};

const List = () => {
  // style
  const classes = useStyles();

  const [data, setData] = useState({});
  const [hashtags, setHashtags] = useState([]);

  const [limits, setLimits] = useState([]);

  const average = (arr, key) => {
    let s = sum(arr);
    let value = Math.floor(s / arr.length);

    // checking if value is less than limit
    checkAvg(!!value ? value : 0, key, limits);
    return !!value ? value : 0;
  };

  // sort according average
  const sorting = (data) => {
    let avg = map(data, (value, key) => {
      return { avg: average(value.list, key), hashtag: key };
    });
    avg.sort((a, b) => {
      if (a.avg === 0 && b.avg === 0) return 0;
      else {
        if (a.avg < b.avg) {
          if (a.avg !== 0) return -1;
          else return 1;
        } else if (a.avg === b.avg) return 0;
        else {
          if (b.avg === 0) return -1;
          else return 1;
        }
      }
    });
    return [...avg];
  };

  // fetching list of hashtags from server
  const fetchList = useCallback(async () => {
    // call back function
    const receiveUpdate = (err, value, hashtag) => {
      if (!err) {
        // if length of arr is less than 50
        setData((prevData) => {
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

    try {
      let response = await Axios.get(`${serverURL}/api/all`);
      const { data } = response.data;
      setHashtags([...data]);
      setData(makeObject([...data]));
      subscribe(receiveUpdate, [...data]);
    } catch (err) {
      alert(
        "Getting error ==>",
        !!err.response ? err.response.data.msg : "Server error"
      );
      console.dir(err);
    }
  }, []);

  const fetchLimits = useCallback(async () => {
    try {
      let response = await Axios.get(`${serverURL}/api/limits`);
      const { data } = response.data;
      setLimits(data);
    } catch (err) {
      console.log(err);
      alert(
        `Getting Error \n${
          !!err.response ? err.response.data.msg : "Limits error"
        }`
      );
    }
  }, []);

  useEffect(() => {
    // fetch list
    fetchList();
    fetchLimits();

    // unsubscribe when component unmount
    return () => {
      unsubscribe();
    };
  }, [fetchList, fetchLimits]);

  return (
    <div className={classes.root}>
      <h1>List of Hashtags</h1>
      {!isEmpty(data) ? (
        <Grid container spacing={3}>
          {map(sorting(data), (value, idx) => (
            <Fragment key={idx}>
              <Grid item xs={5} className={classes.gridLeft}>
                <Paper className={classes.paper}>{value.hashtag}</Paper>
              </Grid>
              <Grid item xs={5}>
                <Paper className={classes.paper}>{value.avg}</Paper>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      ) : (
        <Typography align="center" variant="h3">
          We are fetching hashtags. Please wait for some seconds..
        </Typography>
      )}
    </div>
  );
};

export default List;
