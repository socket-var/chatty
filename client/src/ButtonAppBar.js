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
  logo: {
    marginRight: "2em"
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
    value: 0
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
          <Toolbar>
            <Typography
              variant="h3"
              color="inherit"
              className={[classes.defaultChild, classes.logo].join(" ")}
            >
              Chatty
            </Typography>

            <Tabs
              value={value}
              onChange={this.handleChange}
              className={classes.growChild}
            >
              <Tab label="Chats" to="/chat" component={Link} />
              <Tab label="Status" to="/status" component={Link} />
              <Tab label="Profile" to="/profile" component={Link} />
            </Tabs>
            {this.props.isLoggedIn ? (
              <Button
                color="inherit"
                className={classes.defaultChild}
                onClick={this.props.signOutHandler}
              >
                Sign out
              </Button>
            ) : (
              <React.Fragment>
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
              </React.Fragment>
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
