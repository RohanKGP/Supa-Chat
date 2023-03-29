import React, { useEffect, useState } from "react";
import "./index.css";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

var channel;

async function sendToDb(data) {
  const { error } = await supabase.from("user_messages").insert({
    username: `${data.user}`,
    message: `${data.msg}`,
  });
  if (error) {
    console.log(error);
    return;
  }
}

function ChatMsgUI(props) {
  useEffect(() => {
    // Todo: Subscribe to updates from the  user_messages table
    channel = supabase.channel(`room-${props.room}`, {
      config: {
        broadcast: {
          self: true,
        },
      },
    });

    channel.subscribe((status, err) => {
      if (err) console.log(err);
      console.log(`Status : ${status}`);

      if (status === "SUBSCRIBED") {
        console.log("channel subscribed!");
      }
    });

    channel.on(
      "broadcast",
      {
        event: "sending messages",
      },
      (payload) => {
        setChats((prevChat) => {
          if (!prevChat) prevChat = [];

          return [
            ...prevChat,
            {
              username: `${payload.payload.username}`,
              message: `${payload.payload.message}`,
            },
          ];
        });
      }
    );
  }, []);

  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState([{}]);

  // Todo: Username from the Login Page
  const currentUser = props.username;

  function handleSubmit() {
    sendToDb({ user: currentUser, msg: msg });
    // send message to channel
    if (channel !== undefined || channel !== null) {
      channel.send({
        type: "broadcast",
        event: "sending messages",
        payload: {
          username: `${currentUser}`,
          message: `${msg}`,
        },
      });
    }

    setMsg("");
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  var classStr = "min-w-fit m-2 text-white rounded-xl";

  return (
    <div className="flex flex-col h-screen">
      <div className="p-2 h-[90%] flex flex-col overflow-auto">
        {chats.map((value, index) => {
          if (
            value.message === "" ||
            value.message === undefined ||
            value.message === null
          )
            return;

          return (
            <div
              key={index}
              className={
                value.username === currentUser
                  ? classStr + " self-end bg-green-500"
                  : classStr + " self-start bg-blue-400"
              }
            >
              <span className="p-2 font-sans italic text-black">
                {value.username}
              </span>
              <p className=" p-2 text-center">Message : {value.message}</p>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row justify-center w-screen min-h-[10%] bottom-0">
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
