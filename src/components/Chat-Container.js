import React, { useEffect, useRef, useState } from "react";
import { NavLink,useNavigate} from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import Loader from "react-js-loader";
import chatbot from "../static/chatbot.png";

function ChatContainer({user_name}) {

  console.log(user_name)

  const navigate = useNavigate();

  let [chatresponse, setChatresponse] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([{ text: "loading", sender: "ai" }]);
  const [prompt, setPrompt] = useState("");
  const chatContainerRef = useRef(null);

  const handlechatresponse = (e) => {
    navigate('/faq', { state: { username : user_name} });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      return;
    }

    // axios
    //   .post("http://127.0.0.1:8000/api/messages/", `message=${message}`)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       console.log(res);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //     if (err.status === 400) {
    //       // toast.dark("Invalid Credentials");
    //     }
    //   });

    setMessages([
      ...messages,
      { text: message, sender: "user" },
      { text: "loading", sender: "ai", loading: "true" },
    ]);
    setPrompt(message);
    setMessage("");
  };

  const handleAIResponse = (responseText) => {
    let temp = messages;
    let n = messages.length;
    temp[n - 1] = { text: responseText, sender: "ai" }; // mesaages.text=loading , temp.text=ai_text
    setMessages([...temp]); // messages.text=ai , temp.text=ai_text
  };

  const handleErrorAIResponse = (err) => {
    let temp = messages;
    let n = messages.length;
    temp[n - 1] = { text: err, sender: "ai" }; // mesaages.text=loading , temp.text=ai_text
    setMessages([...temp]); // messages.text=ai , temp.text=ai_text
  }

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (prompt === "") return;
    axios
      .post(
        "http://127.0.0.1:8000/api/fill_survey/",
        `human_text=${prompt}&username=${user_name}`
      )
      .then((res) => {
        handleAIResponse(res.data.llm_response);
        if (res.data.llm_response === "All questions asked") {
          setChatresponse(true);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        handleErrorAIResponse(err.response.data.message);
      });
  }, [prompt]);

  useEffect(() => {
    axios
      .post("http://127.0.0.1:8000/api/question/", `user_name=${user_name}`)
      .then((res) => {
        handleAIResponse(res.data.llm_response);
      })
      .catch((err) => {
        console.log(err.response);
        
      });
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-box" ref={chatContainerRef}>
        <h4 className="chat-welcome"
          style={{
            padding: 10,
            margin: "5 auto",
            textAlign: "center",
            color: "white"
          }}
        >
          Welcome to Shorthills. Here's a short survey for you
        </h4>

        <div className="all-messages">
          
          {messages.map((msg, index) => (
            <>
             {msg.sender === "ai" && <img src={chatbot} alt="img" height={70} width={70} /> }
             {index == 0 && <div className="message ai-message">"Welcome to the GenAI Assisted Insurance Survey! We appreciate your participation in this valuable endeavor." </div>}

              <div
                key={index}
                className={`message ${
                  msg.sender === "user" ? "user-message" : "ai-message"
                }`}
              >
                {msg.sender === "ai" ? (
                  <div>
                    {msg.text === "loading" ? (
                      <Loader
                        type="bubble-scale"
                        bgColor="#ffffff"
                        color="black"
                        size={30}
                      />
                    ) : (
                      msg.text
                    )}
                  </div>
                ) : (
                  <div>
                    <div>{msg.text}</div>
                  </div>
                )}
              </div>
            </>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <div className="text-container">
          <textarea
            className="input-bar"
            typeof="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e); 
              }
            }}
          />

          <button type="submit" className="send-button">
            <SendIcon />
          </button>
        </div>
      </form>

      {chatresponse ? (
        <div className="d-grid col-2 mx-auto my-4 text-center">
          <NavLink
            className="nav-link align-right bg-dark text-white p-2 rounded"
            to="/faq"
            props={user_name}
            onClick={handlechatresponse}
          >
            Preview Response
          </NavLink>
        </div>
      ) : null}
    </div>
  );
}
export default ChatContainer;
