import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

// component
import Limits from "./Limits";
import Notifications from "./Notifications";

// styles
const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}vh`,
    left: `${left}vw`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModalBody = ({ isOpen, setIsOpen }) => {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);

  const toggleOpen = () => {
    setIsOpen({ ...isOpen, limits: false, notification: false });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {!!isOpen.limits && <Limits />}
      {!!isOpen.notification && <Notifications />}
    </div>
  );

  return (
    <div>
      <Modal open={isOpen.limits || isOpen.notification} onClose={toggleOpen}>
        {body}
      </Modal>
    </div>
  );
};

export default ModalBody;
