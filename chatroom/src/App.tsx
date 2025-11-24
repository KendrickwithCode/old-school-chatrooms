import {useState, useEffect} from "react";
import "./index.css"

interface Message {
  id?: number,
  user: string,
  message: string,
  online: boolean
}

interface SendMessageProp{
  onSend: (text: string) => void;
}

function SendMessageBox({ onSend }: SendMessageProp){
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  }
  return (
    <div className="message-box">
      <input
      className="user-input"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  )
}

interface MessageRowAreaProp {
  message: Message;
}

let messageCount = 0;

function MessageRow({ message }: MessageRowAreaProp) {
  let messageDiv = "message" + messageCount++
  return (
    <div className={messageDiv}>
      <strong>{message.user}:&emsp;</strong>{message.message}
    </div>
  )
}

interface ChatAreaProp{
  chatMessages: Message[];
}

function ChatArea({ chatMessages }: ChatAreaProp) {
  return (
      <div className="chat-window">
        {chatMessages.map((m, i) => (
          <MessageRow key={i} message={m} />
        ))}
      </div>
  )
}

interface ChatRoomAreaProp {
  chatMessages: Message[];
  onSend: (text: string) => void;
}

function ChatRoomArea({ chatMessages, onSend }: ChatRoomAreaProp) {
  return (
    <div>
      <ChatArea chatMessages={chatMessages}/>
      <SendMessageBox onSend={onSend}/>
    </div>
  )
}

const chatHistory: Message[] = [{ user: "hellbro", message: "hi", online: true }]

export default function App() {

  const [chatMessages, setChatMessages] = useState<Message[]>([]);

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
        user: "hellbro",
        message: text,
        online: true,
      }),
    });
    const newMessage = await res.json();

    setChatMessages((prev) => [...prev, newMessage]);
  };

  return <ChatRoomArea chatMessages={chatMessages} onSend={sendMessageToAPI} />
}
