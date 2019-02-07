import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/PersonSharp";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const UserList = ({ classes, contacts, updateCurrentContact }) => {
  const userList = [];

  if (Object.keys(contacts).length !== 0 && contacts.constructor === Object) {
    for (let userId in contacts) {
      const user = contacts[userId];
      userList.push(
        <ListItem
          button
          onClick={updateCurrentContact}
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
};

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
  updateCurrentContact: PropTypes.func.isRequired
};

export default withStyles(styles)(UserList);
