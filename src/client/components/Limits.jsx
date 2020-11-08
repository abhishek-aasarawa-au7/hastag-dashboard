import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
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

  const [edit, setEdit] = useState({});

  const [limits, setLimits] = useState([]);

  const [data, setData] = useState({});

  const fetchLimits = useCallback(async () => {
    try {
      let response = await Axios.get(`${serverURL}/api/limits`);
      const { data } = response.data;
      setLimits(data);
    } catch (err) {
      alert(
        `Getting Error \n${
          !!err.response ? err.response.data.msg : "Server is down"
        }`
      );
    }
  }, []);

  useEffect(() => {
    fetchLimits();
  }, [fetchLimits]);

  const openEditor = (id) => {
    setEdit({ ...edit, [id]: true });
    setData({ ...data, [id]: limits[id].limit });
  };

  const editData = (e) => {
    const { id, value } = e.currentTarget;
    setData({ ...data, [id]: value });
  };

  const saveLimit = async (id) => {
    let limit = data[id];
    let name = limits[id].name;
    try {
      let response = await Axios.post(`${serverURL}/api/change`, {
        name,
        limit,
      });
      name = response.data.data.name;
      limit = response.data.data.limit;
      let allLimits = [...limits];
      allLimits[id] = { name, limit };
      setLimits(allLimits);
      setEdit({ ...edit, [id]: false });
    } catch (err) {
      alert(
        `Getting Error \n${
          !!err.response ? err.response.data.msg : "Server is down"
        }`
      );
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Limits
      </Typography>
      <div className={classes.demo}>
        <List>
          {map(limits, (value, idx) => (
            <ListItem key={idx}>
              {!!edit[idx] ? (
                <TextField
                  id={`${idx}`}
                  label={value.name}
                  value={!!data[idx] ? data[idx] : null}
                  onChange={editData}
                />
              ) : (
                <ListItemText primary={value.name} secondary={value.limit} />
              )}
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  id={idx}
                  onClick={(e) => {
                    !!edit[idx] ? saveLimit(idx) : openEditor(idx);
                  }}
                >
                  {!!edit[idx] ? <SaveIcon /> : <EditIcon />}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
