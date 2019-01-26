import React, { Component } from 'react';
import './App.css';
import "./ButtonAppBar"
import ButtonAppBar from './ButtonAppBar';
import UserList from "./UserList"
import FloatingButton from "./FloatingButton";
import ChatRoom from "./ChatRoom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ButtonAppBar />
        <div className="main-container">
          <UserList />
          <ChatRoom />
        </div>
        {/* <FloatingButton /> */}
      </div>
    );
  }
}

export default App;
