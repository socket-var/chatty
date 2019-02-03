import React, { Component } from "react";
import ChatForm from "./ChatForm";
import { withStyles } from "@material-ui/core/styles";

import firebase from "../Firebase";
import ChatMenuBar from "../Chat/ChatMenuBar";
import MessageBubble from "./MessageBubble";

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
    overflowY: "scroll"
  }
};

const setBulkMessages = function(direction, snapshot) {
  const data = snapshot.val() || {};

  const messages = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const item = data[key];
      const localTime = `${new Date(item.timestamp)
        .getHours()
        .toString()
        .padStart(2, "0")}:${new Date(item.timestamp)
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      messages.push({
        text: item.text,
        direction,
        localTime,
        timestamp: item.timestamp
      });
    }
  }

  return Promise.resolve(messages);
};

const setMessages = function(direction, snapshot) {
  const data = snapshot.val();
  const localTime = `${new Date(data.timestamp)
    .getHours()
    .toString()
    .padStart(2, "0")}:${new Date(data.timestamp)
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  const message = {
    text: data.text,
    direction,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    localTime
  };

  this.setState({
    messages: [message, ...this.state.messages]
  });
};

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text: "",
      load: true,
      currentContactId: null
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp(evt) {
    if (evt.keyCode === 13) {
      this.sendMessage();
    }
  }

  handleChange(evt) {
    if (evt) this.setState({ text: evt.target.value });
  }

  // add message to messages/currUser/receiver/sent
  sendMessage() {
    const currentUser = auth.currentUser;
    // add it to me/to/friend/ and friend/from/me
    const timestamp = Date.now();
    const serverTimestamp = firebase.database.ServerValue.TIMESTAMP;

    db.ref(
      `messages/${currentUser.uid}/${this.props.currentContactId}/sent`
    ).push({
      text: this.state.text,
      timestamp,
      serverTimestamp
    });

    db.ref(
      `messages/${this.props.currentContactId}/${currentUser.uid}/received`
    ).push({
      text: this.state.text,
      timestamp,
      serverTimestamp
    });

    this.setState({ text: "" });
  }

  loadMessages(contact) {
    const user = auth.currentUser;
    // query for sent messages already in db
    const sentQuery = db.ref(`messages/${user.uid}/${contact}/sent`);
    let messages = [];
    sentQuery
      .once("value")
      // got all sent messages
      .then(setBulkMessages.bind(this, "right"))
      .then(function(sentMessages) {
        messages = sentMessages || [];
        return db
          .ref(`messages/${user.uid}/${contact}/received`)
          .once("value");
      })

      .then(setBulkMessages.bind(this, "left"))
      // got all received messages
      .then(
        receivedMessages => {
          messages = [...receivedMessages, ...messages];
          // sort all the messages by timestamp
          messages.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1);
          // set state with all messages
          return Promise.resolve(this.setState({ messages }));
        }
      )
      .then(
        () => {
          // now add event listeners for new children added
          // new child added ? set state
          db.ref(`messages/${user.uid}/${contact}/sent`)
            .orderByChild("timestamp")
            .startAt(Date.now())
            .on("child_added", setMessages.bind(this, "right"));

          db.ref(`messages/${user.uid}/${contact}/received`)
            .orderByChild("timestamp")
            .startAt(Date.now())
            .on("child_added", setMessages.bind(this, "left"));
        }
      )
      .catch(function(err) {
        console.log(err);
      });
  }


  // get all messages sent and received
  componentDidMount() {
    
    const contact = this.props.currentContactId;

    // its ok to not use callback because we have props.currentContactId with the same value
    this.setState({currentContactId: contact}, this.loadMessages.bind(this, contact) );

    if (this.props.currentContactId) {
      
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const contact = nextProps.currentContactId;
    if (contact !== prevState.currentContactId) {
      return {currentContactId: contact};
    }
    else return null;

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentContactId !== prevState.currentContactId) {
      this.loadMessages(this.state.currentContactId)
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

    const contactUsername = contacts[currentContactId].username;

    const messages = this.state.messages;

    const msgList = [];

    if (this.state.currentContactId) {
      if (messages) {
        for (let index = 0; index < messages.length; index++) {
          const { text, direction, localTime } = messages[index];
          msgList.push(
            <MessageBubble
              key={index}
              message={text}
              direction={direction}
              localTime={localTime}
            />
          );
        }

        return (
          <div className={classes.root}>
            <ChatMenuBar contactUsername={contactUsername} />
            <div
              className={[classes.flexItem, classes.messageListParent].join(
                " "
              )}
            >
              {msgList}
            </div>
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
