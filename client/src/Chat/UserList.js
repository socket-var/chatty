import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import PersonIcon from "@material-ui/icons/PersonSharp";
import Avatar from "@material-ui/core/Avatar";

import firebase from "../Firebase";

const db = firebase.database();
const auth = firebase.auth();

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class UserList extends Component {
  render() {
    const { classes, contacts } = this.props;
    console.log(contacts);

    const userList = [];

    if (Object.keys(contacts).length !== 0 && contacts.constructor === Object) {
      for (let userId in contacts) {
        const user = contacts[userId];
        console.log(userId);
        userList.push(
          <ListItem
            button
            onClick={this.props.updateCurrentContact}
            data-userid={userId}
            key={userId}
          >
            <Avatar>
              <PersonIcon />
            </Avatar>
            <ListItemText primary={user.username} />
          </ListItem>
        );
      }
    }

    return (
      <div className={classes.root}>
        <List component="nav">{userList}</List>
      </div>
    );
  }
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserList);
