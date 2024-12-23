import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Message from "../components/Message";
import Svg from "../components/Svg";
import AiDropdown from "../components/AiDropdown";
import '../css/Chat.css';

const Chat = () => {
    const [chatMessages, setchatMessages] = useState([
        {
          position: "left_bubble",
          message: "Hi there, text me anything you'd like ;)",
        },
      ]);

    function chat_scroll_up() {
        let elem = document.querySelector(".start-chat");
        setTimeout(() => {
          elem.scrollTo({
            top: elem.scrollHeight,
            behavior: "smooth",
          });
        }, 200);
    }

    function askAI() {
        var prompt_input = document.getElementById("chat-input");
        var prompt = prompt_input.value;
        if (prompt.replaceAll(" ", "") === "") {
          console.log("Empty prompt, ignoring...");
          return;
        }
        prompt_input.value = "";
    
        const data = {
          // chatHistory: JSON.stringify(chatMessages),
          prompt: prompt,
        };
        
        console.log(data)
        fetch("/ask_ai", {
          method: "POST",
          body: JSON.stringify(data), // Convert data to JSON
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        })
          .then((response) => response.json())
          .then((resData) => {
            const messages = [
              ...chatMessages,
              {
                position: "right_bubble",
                message: prompt,
              },
              {
                position: "left_bubble",
                message: resData.result,
              },
            ];
            console.log("Messages: ", messages);
            setchatMessages(messages);
            console.log("messages set")
            chat_scroll_up();
          })
          .catch((err) => console.log(err));
    }

    return (
        <div>
            <Navbar />
            <div className="chat-container">
                <div className="header-chat">
                    <div className="head-home">
                        <div className="info-avatar">
                            <Svg />
                        </div>
                        <p>
                            <span className="assistant-name"> Claudia</span>
                            <br />
                            <small>Online</small>
                        </p>
                    </div>
                    <AiDropdown />
                </div>

                <div className="chat-body">
                    <div className="start-chat">
                        <div className="assistant-chat-body">
                            {chatMessages.map((chatMessage, key) => (
                                <Message
                                    key={key}
                                    position={chatMessage.position}
                                    message={chatMessage.message}
                                />
                            ))}
                            <hr className="separator" />
                        </div>
                    </div>
                    <div className="blanter-msg">
                        <input
                            type="text"
                            id="chat-input"
                            placeholder="Type here..."
                            maxLength="500"
                        />
                        <a
                            onClick={askAI}
                            href="#send_message"
                            id="send-it"
                            className="send_it"
                        >
                            <svg viewBox="0 0 448 448">
                                <path d="M.213 32L0 181.333 320 224 0 266.667.213 416 448 224z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;