import React, { Component } from "react";

import UserList from "./UserList";
import ChatRoom from "./ChatRoom";

import FloatingButton from "../FloatingButton";
import firebase from "../Firebase";

const db = firebase.database();
const auth = firebase.auth();

export default class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      currentContactId: null,
      openAddFriend: false,
      newContactUsername: "",
      newContactEmail: ""
    };

    this.updateCurrentContact = this.updateCurrentContact.bind(this);
    this.openAddContactMenu = this.openAddContactMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addContact = this.addContact.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  openAddContactMenu() {
    this.setState({ openAddFriend: true });
  }

  handleClose() {
    this.setState({ openAddFriend: false });
  }

  addContact(evt) {
    evt.preventDefault();

    const user = auth.currentUser;

    db.ref(`/users/${user.uid}/contacts`).push({
      username: this.state.newContactUsername,
      email: this.state.newContactEmail
    });
  }

  onInputChange(evt) {
    this.setState({
      [evt.target.id]: evt.target.value
    });
  }

  componentWillMount() {
    const user = auth.currentUser;
    if (user) {
      // need this for profile details in the future ?
      // db.ref(`/users/${user.uid}`).on("value", snapshot => {
      //   console.log(snapshot.val());
      // });
    }
  }

  updateCurrentContact(evt) {
    const currentContactId = evt.currentTarget.dataset.userid;
    // once id is updated it is delegated to chat room to retrieve messages
    this.setState({
      currentContactId
    });
  }

  render() {
    return (
      <div className="main-container">
        {/* need friends names for userList may make another listener for this ?*/}
        <UserList
          updateCurrentContact={this.updateCurrentContact}
          contacts={this.state.contacts}
        />
        {/* need current clicked user id to get corrsp messages */}
        {this.state.currentContactId ? (
          <ChatRoom
            messages={this.state.messages}
            currentContactId={this.state.currentContactId}
          />
        ) : (
          ""
        )}

        {!this.state.currentContactId ? (
          <FloatingButton
            action="addFriend"
            onClickHandler={this.openAddContactMenu}
            open={this.state.openAddFriend}
            onCloseHandler={this.handleClose}
            onSubmit={this.addContact}
            newContactUsername={this.state.newContactUsername}
            newContactEmail={this.state.newContactEmail}
            onInputChange={this.onInputChange}
            currentContactId={this.state.currentContactId}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
