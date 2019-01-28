import React, { Component } from "react";
import ChatForm from "./ChatForm";
import { withStyles } from "@material-ui/core/styles";

import firebase from "../Firebase";

const db = firebase.database();
const auth = firebase.auth();

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
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text: ""
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({text: evt.target.value});
  }

  // add message to messages/currUser/receiver/sent
  sendMessage() {
    const currentUser = auth.currentUser;
    // add it to me/to/friend/ and friend/from/me
    const timestamp = firebase.database.ServerValue.TIMESTAMP
    db.ref(`messages/${currentUser.uid}/${this.props.currentContactId}/sent`)
      .push({
        text: this.state.text,
        timestamp
      });
    
    db.ref(`messages/${this.props.currentContactId}/${currentUser.uid}/received`)
    .push({
      text: this.state.text,
      timestamp
    });
    
  }


  // get all messages sent and received
  componentWillMount() {
    const user = auth.currentUser;
    const contact = this.props.currentContactId;
    console.log(contact);
    let messages = [];

    if (this.props.currentContactId) {
      // load the chat room
      //need messages
      db.ref(`messages/${user.uid}/${contact}/sent`).on("value", snapshot => {
        const messages = snapshot.val();

        // data.map((obj) => {})
        // for (const key in data) {
        //   const element = data[key];

        // }

        // this.setState({
        //   messages: [this.state.messages, ...messages]
        // });
        console.log(messages);
      });

      db.ref(`messages/${user.uid}/to/${contact}/received`).on(
        "value",
        snapshot => {
          const messages = snapshot.val();
          console.log(messages);
          // this.setState({
          //   messages: [this.state.messages, ...messages]
          // });
        }
      );
    }
  }

  render() {
    const { classes, messages } = this.props;

    const msgList = [];

    if (this.props.currentContactId) {
      if (messages) {
        for (let index = 0; index < messages.length; index++) {
          const message = messages[index];
          msgList.push(<div>{message}</div>);
        }

        return (
          <div className={classes.root}>
            <div className={classes.flexItem}>{msgList}</div>
            <ChatForm sendMessage={this.sendMessage} text={this.state.text} handleChange={this.handleChange}/>
          </div>
        );

      } else {
        return <div>No messages found. Start texting..!</div>
      }

      
    } else {
      return <div>Texts appear here</div>;
    }
  }
}

export default withStyles(styles)(ChatRoom);
