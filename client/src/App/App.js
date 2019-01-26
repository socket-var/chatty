import React, { Component } from "react";
import "./App.css";
import "../ButtonAppBar";
import ButtonAppBar from "../ButtonAppBar";

import { BrowserRouter as Router, Route} from "react-router-dom";
import HomePage from "../Home/HomePage";
import ChatPage from "../Chat/ChatPage";
import SignUpPage from "../Auth/SignUpPage";
import LoginPage from "../Auth/LoginPage";

import firebase from "../Firebase";

const auth = firebase.auth()

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      redirectToChat: false,
      emailField: "",
      passwordField: "",
      confirmPasswordField: ""
    };

    this.signUpHandler = this.signUpHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.signOutHandler = this.signOutHandler.bind(this);
  }

  signUpHandler(evt) {
    evt.preventDefault();
    auth.createUserWithEmailAndPassword(this.state.emailField, this.state.passwordField)
    .then(() => {
      this.setState({isLoggedIn: true, redirectToChat: true})
    })
    .catch(e => console.log(e.message));
  }
  
  loginHandler(evt) {
    evt.preventDefault();
  
    auth.signInWithEmailAndPassword(this.state.emailField, this.state.passwordField)
    .then(() => {
      this.setState({isLoggedIn: true, redirectToChat: true})
    })
      .catch(e => console.log(e.message));
  }

  signOutHandler() {
    auth.signOut().then(() => this.setState({isLoggedIn: false}))
  }

  onInputChange(evt) {
    this.setState({
      [evt.target.id]: evt.target.value
    });
  }

  componentWillMount() {
  }

  render() {
    const { isLoggedIn, redirectToChat } = this.state
    return (
      <Router>
        <div className="App">
          <ButtonAppBar isLoggedIn={isLoggedIn} signOutHandler={this.signOutHandler}/>
          <Route path="/" exact component={HomePage} />
          <Route path="/chat" 
            render={props => (
              <ChatPage 
                {...props}
                isLoggedIn={isLoggedIn} 
              />
            )}  
          />
          <Route
            path="/auth/register"
            render={props => (
              <SignUpPage
                {...props}
                isLoggedIn={isLoggedIn}
                onSubmit={this.signUpHandler}
                onInputChange={this.onInputChange}
                redirectToChat={redirectToChat}
              />
            )}
          />
          <Route path="/auth/login" 
            render={props => (
              <LoginPage
                {...props}
                isLoggedIn={isLoggedIn}
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
