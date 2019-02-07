import React, { Component } from "react";
import "./App.css";
import "../ButtonAppBar";
import ButtonAppBar from "../ButtonAppBar";
import ToastNotifier from "../common/ToastNotifier";

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
      redirectToHome: false,
      signupPageErrorMessage: "",
      loginPageErrorMessage: "",
      successMessage: ""
    };
  }


  
  signUpHandler = evt => {
    evt.preventDefault();
    let user;
    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        if (this.state.passwordField !== this.state.confirmPasswordField) {
          return Promise.reject({
            message: "Passwords did not match. Try again."
          });
        } else {
          return auth.createUserWithEmailAndPassword(
            this.state.emailField,
            this.state.passwordField
          );
        }
      })
      .then(result => {
        user = result.user;
        user.updateProfile({ displayName: this.state.userNameField });
      })
      .then(() => {
        return db.ref(`/users/${user.uid}`).set({
          email: user.email,
          contacts: null,
          username: this.state.userNameField,
          uid: user.uid
        });
      })
      .then(() => {
        this.setState({ isLoggedIn: true, redirectToChat: true });
      })
      .catch(e => this.setState({ signupPageErrorMessage: e.message }));
  };

  loginHandler = evt => {
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
        this.setState({
          isLoggedIn: true,
          redirectToChat: true,
          redirectToHome: false,
          successMessage: "Signed in successfully !!"
        });
      })
      .catch(e => this.setState({ loginPageErrorMessage: e.message }));
  };

  signOutHandler = evt => {
    evt.preventDefault();
    auth.signOut().then(() =>
      this.setState({
        isLoggedIn: false,
        redirectToHome: true,
        redirectToChat: false,
        successMessage: "Signed out successfully !!"
      })
    );
  };

  onInputChange = evt => {
    this.setState({
      [evt.target.id]: evt.target.value
    });
  };

  render() {
    const {
      isLoggedIn,
      redirectToChat,
      signupPageErrorMessage,
      loginPageErrorMessage,
      redirectToHome,
      successMessage
    } = this.state;

    return (
      <Router>
        <div className="App">
          {signupPageErrorMessage ? (
            <ToastNotifier message={signupPageErrorMessage} variant={"error"} />
          ) : (
            ""
          )}

          {loginPageErrorMessage ? (
            <ToastNotifier message={loginPageErrorMessage} variant={"error"} />
          ) : (
            ""
          )}

          {successMessage ? (
            <ToastNotifier message={successMessage} variant={"success"} />
          ) : (
            ""
          )}

          <ButtonAppBar
            isLoggedIn={isLoggedIn}
            signOutHandler={this.signOutHandler}
          />
          <Route path="/" exact component={HomePage} />
          <Route
            path="/chat"
            render={props => (
              <ChatPage
                {...props}
                isLoggedIn={isLoggedIn}
                redirectToHome={redirectToHome}
              />
            )}
          />
          <Route
            path="/auth/register"
            render={props => (
              <SignUpPage
                {...props}
                onSubmit={this.signUpHandler}
                onInputChange={this.onInputChange}
                redirectToChat={redirectToChat}
                errorMessage={signupPageErrorMessage}
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
                errorMessage={loginPageErrorMessage}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
