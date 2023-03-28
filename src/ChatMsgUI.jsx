import React, { useEffect, useState } from "react";
import "./index.css";
import { createClient } from "@supabase/supabase-js";

// Todo: Keys for Supabase

const VITE_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhwbm1rZ3FmbHVqcnhva2FnY3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5Mzk3OTksImV4cCI6MTk5NTUxNTc5OX0.TUvQV7cmSvh9PHq38-fQPqpYO8zoBRku8Ml_-5Ra2Zw";
const VITE_SUPABASE_URL = "https://xpnmkgqflujrxokagctc.supabase.co";

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_KEY);

const chatList = [];

function ChatMsgUI(props) {
  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState(chatList);

  // Todo: Username from the Login Page
  const currentUser = props.username;

  async function handleSubmit() {
    const { error } = await supabase.from("user_messages").insert({
      username: `${currentUser}`,
      message: `${msg}`,
    });
    setMsg("");
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    // Todo: Subscribe to updates from the  user_messages table

    const channel = supabase.channel("any");

    channel
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "user_messages" },
        (payload) => {
          setChats([
            ...chats,
            {
              username: `${payload.new.username}`,
              message: `${payload.new.message}`,
            },
          ]);
        }
      )
      .subscribe();

    return () => {
      // Unsubscribe from real-time updates when the component unmounts
      channel.unsubscribe();
    };
  });

  var classStr = "min-w-fit m-2 text-white rounded-xl";

  return (
    <div className="flex flex-col justify-center m-10">
      <div className="m-2 p-2 flex flex-col">
        {chats.map((value, index) => {
          return (
            <div
              key={index}
              className={
                value.username === currentUser
                  ? classStr + " self-end bg-green-500"
                  : classStr + " self-start bg-orange-500"
              }
            >
              <span className="p-2 font-sans italic text-black">
                {value.username}
              </span>
              <p className=" p-2 text-center">Message : {value.message}</p>
            </div>
          );
        })}
        {/* min-w-fit self-start m-2 bg-orange-500 text-white rounded-xl */}
      </div>
      <div className="flex justify-center m-5">
        <input
          type="text"
          placeholder="Type your message here"
          className="bg-gray-200 w-1/3 text-gray-800 rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3 m-5 text-center"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white rounded-lg m-4 p-3 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatMsgUI;
