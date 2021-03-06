import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  floatToolBarItems: {
    justifyContent: "space-between"
  },
  logo: {
    marginRight: "2em",
    textDecoration: "none"
  },
  growChild: {
    flexGrow: 1
  },
  defaultChild: {
    flexGrow: 0
  }
});

class ChattyAppBar extends React.Component {
  state = {
    value: null
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, isLoggedIn, signOutHandler } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={isLoggedIn ? "" : classes.floatToolBarItems}>
            <Typography
              variant="h3"
              color="inherit"
              className={[classes.defaultChild, classes.logo].join(" ")}
              to="/" component={Link}
            >
              Chatty
            </Typography>

            {isLoggedIn ? (
              <React.Fragment>
                <Tabs
                  value={value ? value : false}
                  onChange={this.handleChange}
                  className={classes.growChild}
                >
                  <Tab label="Chats" to="/chat" component={Link} />
                  <Tab label="Status" to="/status" component={Link} />
                  <Tab label="Profile" to="/profile" component={Link} />
                </Tabs>

                <Button
                  color="inherit"
                  className={classes.defaultChild}
                  onClick={signOutHandler}
                >
                  Sign out
                </Button>
              </React.Fragment>
            ) : (
              <div>
                <Button
                  color="inherit"
                  className={classes.defaultChild}
                  to="/auth/register"
                  component={Link}
                >
                  Register
                </Button>
                <Button
                  color="inherit"
                  className={classes.defaultChild}
                  to="/auth/login"
                  component={Link}
                >
                  Login
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ChattyAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  signOutHandler: PropTypes.func.isRequired
};

export default withStyles(styles)(ChattyAppBar);
