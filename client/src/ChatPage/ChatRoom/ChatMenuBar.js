import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import PersonIcon from "@material-ui/icons/PersonSharp";
import Avatar from "@material-ui/core/Avatar";

const styles = {
  root: {
    // flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const ChatMenuBar = ({ classes, contactUsername }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div>
            <IconButton>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </IconButton>
          </div>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {contactUsername}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

ChatMenuBar.propTypes = {
  classes: PropTypes.object.isRequired,
  contactUsername: PropTypes.string.isRequired
};

export default withStyles(styles)(ChatMenuBar);
