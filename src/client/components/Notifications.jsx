import React, { useState, useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { map } from "lodash";
import Axios from "axios";

// server url
import serverURL from "../configs/serverURL";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function InteractiveList() {
  const classes = useStyles();

  const [notifications, setNotifications] = useState([]);

  const fetchNotification = useCallback(async () => {
    try {
      let response = await Axios.get(`${serverURL}/api/notifications`);
      const { data } = response.data;
      setNotifications(data);
    } catch (err) {
      alert(
        `Getting Error \n${
          !!err.response ? err.response.data.msg : "Server is down"
        }`
      );
    }
  }, []);

  useEffect(() => {
    fetchNotification();
  }, [fetchNotification]);

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Notifications
      </Typography>
      <div className={classes.demo}>
        <List
          style={{ overflow: "hidden", overflowY: "scroll", height: "70%" }}
        >
          {map(notifications, (notification, idx) => (
            <ListItem key={idx}>
              <ListItemText
                primary={`${notification.name} fall to ${notification.limit}`}
                secondary={`at ${notification.time}`}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
