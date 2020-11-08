import React, { Fragment, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Modal from "./Modal";

const Buttons = () => {
  const [isOpen, setIsOpen] = useState({ limits: false, notification: false });
  return (
    <Fragment>
      <Grid container spacing={2} style={{ marginTop: "2%" }}>
        <Grid item xs={9}></Grid>
        <Grid item xs={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsOpen({ ...isOpen, limits: true })}
          >
            Limits
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsOpen({ ...isOpen, notification: true })}
          >
            Notifications
          </Button>
        </Grid>
      </Grid>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Fragment>
  );
};

export default Buttons;
