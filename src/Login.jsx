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
    <div className="flex flex-col mt-72 items-center">
      <h1 className="font-serif text-3xl p-4 m-4"> Supa Chat</h1>
      <input
        type="text"
        placeholder="Enter Username"
        className="bg-gray-200 w-1/3 text-gray-800 rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3 m-5 text-center"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Room ID"
        className="bg-gray-200 w-1/3 text-gray-800 rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3 m-5 text-center"
        onChange={(e) => setRoom(e.target.value)}
      />
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white w-1/3 rounded-lg m-4 p-3 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Login
      </button>
    </div>
  );
}

export default Login;
