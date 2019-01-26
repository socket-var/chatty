import React, { Component } from "react";
import ChatForm from "./ChatForm";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch"
  },
  flexItem: {
    flex: 1
  },
  stretchForm: {
    width: "100%"
  }

};

class ChatRoom extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.flexItem}>Texts appear here</div>
        <ChatForm/>
      </div>
    );
  }
}

export default withStyles(styles)(ChatRoom);
