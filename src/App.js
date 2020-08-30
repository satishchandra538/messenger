import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import './App.css';
import FlipMove from 'react-flip-move';
import { FormControl, Button, InputLabel, Input } from '@material-ui/core';
import Message from './Messages';
import { db } from './Firebase';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [userName, setuserName] = useState([]);

  useEffect(() => {
    db.collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()))
    })
  }, []);
  useEffect(() => {
    setuserName(prompt("Enter User Name"));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    var message = {
      username: userName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }
    db.collection('messages').add(message);
    setInput('');
  }
  return (
    <div className="App">
      <img src={require('./logo.png')} alt="logo" className="logo" />
      <h2>Welcome {userName}!</h2>
      {
        messages.map(message => {
          return (
            <FlipMove ref={message.timestamp} key={message.timestamp}>
              <Message message={message} user={userName} />
            </FlipMove>
            )
        })
      }
      <form>
        <FormControl>
          <InputLabel>Enter a message...</InputLabel>
          <Input type="text" value={input} onChange={event => setInput(event.target.value)} className="message__input" />
          <Button type="submit" onClick={sendMessage} variant="contained" color="primary" disabled={!input}>Send Message</Button>
        </FormControl>
      </form>
    </div>
  );
}

export default App;
