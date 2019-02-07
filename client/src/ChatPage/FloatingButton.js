import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";

import AddIcon from "@material-ui/icons/Add";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

const styles = theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 7,
    right: theme.spacing.unit * 7
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  floatBottom: {
    textAlign: "right",
    height: "10vh"
  },
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function FloatingActionButton({
  classes,
  newContactUsername,
  newContactEmail,
  action,
  open,
  onClickHandler,
  onCloseHandler,
  onInputChange,
  onSubmit
}) {
  let icon;
  if (action === "addFriend") {
    icon = <AddIcon />;
  }

  return (
    <div className={classes.fab}>
      <Fab color="primary" aria-label="Add" onClick={onClickHandler}>
        {icon}
      </Fab>

      <Dialog
        fullScreen
        open={open}
        onClose={onCloseHandler}
        TransitionComponent={Transition}
      >
        <form className={classes.form} onSubmit={onSubmit}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={onCloseHandler}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Add Contact
              </Typography>
              <Button type="submit" color="inherit">
                save
              </Button>
            </Toolbar>
          </AppBar>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="userNameField">Username</InputLabel>
            <Input
              id="newContactUsername"
              name="email"
              autoFocus
              onChange={onInputChange}
              value={newContactUsername}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="emailField">Email Address</InputLabel>
            <Input
              id="newContactEmail"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onInputChange}
              value={newContactEmail}
            />
          </FormControl>
        </form>
      </Dialog>
    </div>
  );
}

FloatingActionButton.propTypes = {
  classes: PropTypes.object.isRequired,
  newContactUsername: PropTypes.string.isRequired,
  newContactEmail: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  onCloseHandler: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(FloatingActionButton);
