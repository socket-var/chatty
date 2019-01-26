import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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

class SimpleTabs extends React.Component {
  state = {
    value: null
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={this.props.isLoggedIn ? "" : classes.floatToolBarItems}>
            <Typography
              variant="h3"
              color="inherit"
              className={[classes.defaultChild, classes.logo].join(" ")}
              to="/" component={Link}
            >
              Chatty
            </Typography>

            {this.props.isLoggedIn ? (
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
                  onClick={this.props.signOutHandler}
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

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTabs);
