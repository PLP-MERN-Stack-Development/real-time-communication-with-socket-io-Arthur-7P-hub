import React, { useState, useEffect } from 'react';
import { socket } from './socket/socket';

function App() {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (msg) => setChat((prev) => [...prev, msg]));
    socket.on('typing_users', (users) => setTypingUsers(users));
    return () => {
      socket.off('receive_message');
      socket.off('typing_users');
    };
  }, []);

  const joinChat = () => {
    socket.connect();
    socket.emit('user_join', username);
    setJoined(true);
  };

  const sendMessage = () => {
    socket.emit('send_message', { message });
    setMessage('');
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit('typing', e.target.value.length > 0);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      {!joined ? (
        <div>
          <h2>Enter your name</h2>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={joinChat}>Join</button>
        </div>
      ) : (
        <>
          <h2>Welcome, {username}</h2>
          <div style={{ border: '1px solid #ccc', padding: 10, height: 300, overflowY: 'scroll' }}>
            {chat.map((c, i) => (
              <p key={i}><b>{c.sender}:</b> {c.message}</p>
            ))}
          </div>
          <input
            value={message}
            onChange={handleTyping}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
          {typingUsers.length > 0 && (
            <p style={{ fontStyle: 'italic' }}>
              {typingUsers.join(', ')} typing...
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
