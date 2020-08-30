import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './Message.css';

function Message({ message, user }) {
  const isUser = user === message.username;
  return (
    <div className={`message ${isUser && 'message__user'}`}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          <Typography
            color="inherit"
            varient="h5"
            components="h2"
          >
            {message.username}:{message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
export default Message;