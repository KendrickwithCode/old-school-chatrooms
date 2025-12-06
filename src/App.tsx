import { useState, useEffect } from "react";
import * as Types from "./types";
import "./index.css"
import {LoginForm} from "./Login";

function SendMessageBox({ onSend }: Types.SendMessageProp) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  }
  return (
    <div className="message-box row">
      <div className="col-11">
        <input
          className="user-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
      </div>
      <div className="col-1">
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

let messageCount = 0;

function MessageRow({ message }: Types.MessageRowAreaProp) {
  let messageDiv = "message" + messageCount++
  return (
    <div className={messageDiv}>
      <strong>{message.user}:&emsp;</strong>{message.message}
    </div>
  )
}

function ChatArea({ chatMessages }: Types.ChatAreaProp) {
  return (
    <div className="chat-window">
      {chatMessages.map((m, i) => (
        <MessageRow key={i} message={m} />
      ))}
    </div>
  )
}

function OnlineUserRow({ User }: Types.OnlineUserRowProp) {
  return (
    <div className="user">
      <strong>{User}</strong>
    </div>
  )
}

function OnlineUserList({ chatMessages }: Types.ChatAreaProp) {

  //Get all unique usernames 
  const distinctUsernames = [...new Set(chatMessages.map(item => item.user))]
  return (
    <div className="online-window">
      {distinctUsernames.map((m, i) => (
        <OnlineUserRow key={i} User={m} />
      ))}
    </div>
  )
}

function ChatRoomArea({ chatMessages, onSend }: Types.ChatRoomAreaProp) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <ChatArea chatMessages={chatMessages} />
        </div>
        <div className="col-4">
          <OnlineUserList chatMessages={chatMessages} />
        </div>
          <SendMessageBox onSend={onSend} />
      </div>
    </div>
  )
}

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Types.Message[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/messages")
      .then((res) => res.json())
      .then((data) => setChatMessages(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const sendMessageToAPI = async (text: string) => {
    const res = await fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: userName,
        message: text,
        online: true,
      }),
    });
    const newMessage = await res.json();

    setChatMessages((prev) => [...prev, newMessage]);
  };

  if (!isLoggedIn){
    return <LoginForm onLogin={(name) => {setUserName(name); setIsLoggedIn(true);}}/>
  }
  return <ChatRoomArea chatMessages={chatMessages} onSend={sendMessageToAPI} />
}
