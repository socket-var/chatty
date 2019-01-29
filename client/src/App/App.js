import React, { Component } from "react";
import "./App.css";
import "../ButtonAppBar";
import ButtonAppBar from "../ButtonAppBar";

import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "../Home/HomePage";
import ChatPage from "../Chat/ChatPage";
import SignUpPage from "../Auth/SignUpPage";
import LoginPage from "../Auth/LoginPage";

import firebase from "../Firebase";

const auth = firebase.auth();
const db = firebase.database();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      redirectToChat: false,
      emailField: "",
      passwordField: "",
      confirmPasswordField: "",
      userNameField: "",
      redirectToHome: false
    };

    this.signUpHandler = this.signUpHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.signOutHandler = this.signOutHandler.bind(this);
  }

  signUpHandler(evt) {
    evt.preventDefault();
    let user;
    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return auth.createUserWithEmailAndPassword(
          this.state.emailField,
          this.state.passwordField
        );
      })
      .then(result => {
        user = result.user;
        user.updateProfile({ displayName: this.state.userNameField });
      })
      .then(() => {
        return db.ref(`/users/${user.uid}`).set({
          email: user.email,
          contacts: null,
          username: this.state.userNameField
        });
      })
      .then(() => {
        this.setState({ isLoggedIn: true, redirectToChat: true });
      })
      .catch(e => console.log(e.message));
  }

  loginHandler(evt) {
    evt.preventDefault();

    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return auth.signInWithEmailAndPassword(
          this.state.emailField,
          this.state.passwordField
        );
      })

      .then(() => {
        this.setState({ isLoggedIn: true, redirectToChat: true });
      })
      .catch(e => console.log(e.message));
  }

  signOutHandler(evt) {
    evt.preventDefault()
    auth.signOut()
    .then(() => this.setState({ isLoggedIn: false, redirectToHome: true, redirectToChat: false }));
  }

  onInputChange(evt) {
    this.setState({
      [evt.target.id]: evt.target.value
    });
  }

  componentDidMount() {}

  render() {
    const { isLoggedIn, redirectToChat } = this.state;
    return (
      <Router>
        <div className="App">
          <ButtonAppBar
            isLoggedIn={isLoggedIn}
            signOutHandler={this.signOutHandler}
          />
          <Route path="/" exact component={HomePage} />
          <Route
            path="/chat"
            render={props => <ChatPage {...props} isLoggedIn={isLoggedIn} redirectToHome={this.state.redirectToHome}/>}
          />
          <Route
            path="/auth/register"
            render={props => (
              <SignUpPage
                {...props}
                onSubmit={this.signUpHandler}
                onInputChange={this.onInputChange}
                redirectToChat={redirectToChat}
              />
            )}
          />
          <Route
            path="/auth/login"
            render={props => (
              <LoginPage
                {...props}
                onSubmit={this.loginHandler}
                onInputChange={this.onInputChange}
                redirectToChat={redirectToChat}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
