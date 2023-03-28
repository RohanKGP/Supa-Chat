import React, { useState } from "react";
import ChatMsgUI from "./ChatMsgUI";
import "./index.css";

function Login() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [auth, setAuth] = useState(false);

  function handleClick() {
    setAuth(true);
  }

  if (auth) {
    return <ChatMsgUI username={username} room={room} />;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Room ID"
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={handleClick}> Login </button>
    </div>
  );
}

export default Login;
