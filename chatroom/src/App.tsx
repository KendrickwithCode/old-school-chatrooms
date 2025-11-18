

let messageCount = 0;
function MessageRow({message}){
  let messageDiv = "message" + messageCount++;
  return (
    <div className={messageDiv}>{message}</div>
  )
}

function ChatArea(chatMessages) {
  return (
    <div className="chat-window">
      <MessageRow message={chatMessages}/>
    </div>
  )
}

function ChatRoomArea({chatMessages}) {
  return (
    //Returns ChatArea, OnlineUserList and SendMessageBox
  )
}

const chatMessages = [{user: "hellbro", message:"hi", online: true}]

export default function App(){
  return <ChatRoomArea chatMessages={chatMessages}/>
}
