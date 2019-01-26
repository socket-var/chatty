import React, { Component } from 'react'

import UserList from "./UserList"
import ChatRoom from "./ChatRoom"
import { Redirect } from "react-router-dom"
// import FloatingButton from "./FloatingButton";

export default class ChatPage extends Component {
  
  render() {
    if (this.props.isLoggedIn) {
      return (
        <div className="main-container">
        <UserList />
        <ChatRoom />
        {/* <FloatingButton /> */}
      </div>
      )
    } else {
      return <Redirect to="/" />
    }
  }
    
}
