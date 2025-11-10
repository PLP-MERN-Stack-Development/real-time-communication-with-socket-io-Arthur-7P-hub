// src/App.js
import React, { useEffect, useState } from "react";
import { socket } from "./socket/socket";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Handle socket connection
    socket.on("connect", () => {
      console.log("Connected to server");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setIsConnected(false);
    });

    // Listen for incoming chat messages
    socket.on("chatMessage", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chatMessage");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      socket.emit("chatMessage", message);
      setMessage("");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Real-Time Chat</h1>
      <p>Status: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}</p>

      <div style={styles.chatBox}>
        {chat.map((msg, index) => (
          <p key={index} style={styles.message}>{msg}</p>
        ))}
      </div>

      <form onSubmit={sendMessage} style={styles.form}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  chatBox: {
    border: "1px solid #ccc",
    height: "300px",
    overflowY: "scroll",
    padding: "10px",
    marginBottom: "10px",
  },
  message: {
    background: "#f4f4f4",
    padding: "5px",
    margin: "5px 0",
    borderRadius: "5px",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    background: "#007bff",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;
