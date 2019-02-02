import React, { Component } from "react";
import ChatForm from "./ChatForm";
import { withStyles } from "@material-ui/core/styles";

import firebase from "../Firebase";
import ChatMenuBar from "../Chat/ChatMenuBar";
import MessageContainer from "./MessageBubble";

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
  },
  messageListParent: {
    display: "flex",
    flexDirection: "column-reverse",
    overflowY: "scroll",
  }
};

const setMessages = function( direction, snapshot) {
  const data = snapshot.val();
  const message = {
    text: data.text,
    direction
  };

    this.setState({
      messages: [message, ...this.state.messages]
    });
}

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text: "",
      load: true
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp(evt) {
    if (evt.keyCode == 13) {
      this.sendMessage();
    }
  }

  handleChange(evt) {
    if (evt)
    this.setState({ text: evt.target.value });
  }

  // add message to messages/currUser/receiver/sent
  sendMessage() {
    const currentUser = auth.currentUser;
    // add it to me/to/friend/ and friend/from/me
    const timestamp = firebase.database.ServerValue.TIMESTAMP;
    
    db.ref(
      `messages/${currentUser.uid}/${this.props.currentContactId}/sent`
    ).push({
      text: this.state.text,
      timestamp
    });

    db.ref(
      `messages/${this.props.currentContactId}/${currentUser.uid}/received`
    ).push({
      text: this.state.text,
      timestamp
    });

    this.setState({text: ""});

  }

  // get all messages sent and received
  componentDidMount() {
    const user = auth.currentUser;
    const contact = this.props.currentContactId;

    console.log(this.props.currentContactId);
    if (this.props.currentContactId) {

        db.ref(`messages/${user.uid}/${contact}/sent`)
        .on("child_added", setMessages.bind(this, "right"))
        
        db.ref(`messages/${user.uid}/${contact}/received`).on(
              "child_added", setMessages.bind(this, "left"))
      
    }
  }

  componentWillUnmount() {
    const user = auth.currentUser;
    const contact = this.props.currentContactId;
    if (user) {
      db.ref(`messages/${user.uid}/${contact}/sent`).off();
      db.ref(`messages/${user.uid}/${contact}/received`).off();
    }
    
  }

  render() {
    const { classes, currentContactId, contacts } = this.props;

    const contactUsername = contacts[currentContactId].username

    const messages = this.state.messages;

    const msgList = [];

    if (this.props.currentContactId) {
      if (messages) {
        for (let index = 0; index < messages.length; index++) {
          const {text, direction} = messages[index];
          msgList.push(<MessageContainer key={index} message={text} direction={direction} />);
        }

        return (
          <div className={classes.root}>
            <ChatMenuBar contactUsername={contactUsername}/>
            <div className={[classes.flexItem, classes.messageListParent].join(" ")}>{msgList}</div>
            <ChatForm
              sendMessage={this.sendMessage}
              text={this.state.text}
              handleChange={this.handleChange}
              handleKeyUp={this.handleKeyUp}
            />
          </div>
        );
      } else {
        return <div>No messages found. Start texting..!</div>;
      }
    } else {
      return <div>Texts appear here</div>;
    }
  }
}

export default withStyles(styles)(ChatRoom);
