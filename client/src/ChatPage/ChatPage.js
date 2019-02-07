import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserList from "./UserList/UserList";
import ChatRoom from "./ChatRoom/ChatRoom";
import PropTypes from "prop-types";
import FloatingButton from "./FloatingButton";
import firebase from "../Firebase";


export default class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.database();
    this.auth = firebase.auth();
    this.state = {
      messages: [],
      currentContactId: null,
      openAddFriend: false,
      newContactUsername: "",
      newContactEmail: "",
      contacts: {}
    };

  }

  openAddContactMenu = () => {
    this.setState({ openAddFriend: true });
  }

  handleClose = () => {
    this.setState({ openAddFriend: false });
  }

  addContact = (evt) => {
    evt.preventDefault();
    const {newContactUsername, newContactEmail} = this.state;
    
    const user = this.auth.currentUser;

    const query = this.db.ref("users").orderByChild("username").equalTo(newContactUsername).limitToLast(1)

    query.once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        const key = Object.keys(data)[0]
        
        if (data[key].email === newContactEmail) {
          this.db.ref(`/users/${user.uid}/contacts`).update({
            [key]: {
              username: newContactUsername,
              email: newContactEmail,
              uid: key
            }
            
          });
        }
        
        this.setState({ openAddFriend: false });
      })

    
  }

  onInputChange = (evt) => {
    this.setState({
      [evt.target.id]: evt.target.value
    });
  }

  componentDidMount() {
    const user = this.auth.currentUser;
    if (user) {
      this.db.ref(`users/${user.uid}/contacts`).on("value", (snapshot) => {
        const contacts = snapshot.val()
        if (contacts) {
          this.setState({contacts});
        }
        
      });
    }
  }

  updateCurrentContact = (evt) => {
    const currentContactId = evt.currentTarget.dataset.userid;
    // once id is updated it is delegated to chat room to retrieve messages
    this.setState({
      currentContactId
    });
  }

  render() {
    if (this.props.redirectToHome || !this.auth.currentUser) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        {/* need friends names for userList may make another listener for this ?*/}
        <UserList
          updateCurrentContact={this.updateCurrentContact}
          contacts={this.state.contacts} />

        {/* need current clicked user id to get corrsp messages */}
        {this.state.currentContactId ? (
          <ChatRoom
            messages={this.state.messages}
            currentContactId={this.state.currentContactId}
            contacts={this.state.contacts}
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

ChatPage.propTypes = {
  redirectToHome: PropTypes.bool.isRequired
}
