"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";

// Images
import Close from "@/assets/icons/close.svg";
import AiPfp from "@/assets/icons/ai-pfp.svg";
import UserPfp from "@/assets/icons/user-pfp.svg";
import Send from "@/assets/icons/send.svg";

const Chatbox = ({ toggleChat, setToggleChat }) => {
  const [conversation, setConversation] = useState([
    { sender: "bot", message: "What can I assist you with today?" },
  ]); // [ { sender: "user", message: "hello" }, { sender: "bot", message: "hi" }
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]); // Dependency array includes conversation

  const sendMessage = async (e) => {
    e.preventDefault();

    const newConversation = [...conversation, { sender: "user", message }];
    setConversation(newConversation);

    try {
      // Send the post request immediately
      const response = await axios.post(
        "http://127.0.0.1:8000/openai/generate",
        { prompt: message }
      );

      // Introduce a slight delay before updating the conversation
      setTimeout(() => {
        setLoading(false);
        setConversation([
          ...newConversation,
          { sender: "bot", message: response.data },
        ]);
        setMessage("");
      }, 500); // Delay in milliseconds, e.g., 500ms
    } catch (error) {
      console.error("Error sending message:", error);
      setLoading(false);
    } finally {
      // Show loading immediately, but only hide it after a delay
      setLoading(true);
    }
  };

  return (
    <div className="fixed bottom-[1.5rem] right-[1.5rem] w-[600px] h-[400px] bg-white shadow-[0_0_16px_rgba(40,101,236,0.1)] rounded-[8px]">
      <div className="bg-gradient-to-r from-[#2865EC] to-[#5EA4F9] h-[50px] rounded-[8px_8px_0_0] flex flex-col justify-center px-[1rem]">
        <div
          className="self-end cursor-pointer"
          onClick={() => setToggleChat(!toggleChat)}
        >
          <Image src={Close} alt="close" />
        </div>
      </div>

      <div className="h-[280px] overflow-y-scroll">
        {conversation.map((item, index) => (
          <div
            key={index}
            className={`${
              item.sender === "user" ? "bg-[#ffffff]" : "bg-[#F5F9FF]"
            } flex items-center px-[1rem] py-[1.5rem] gap-4`}
          >
            <div
              className={`w-[40px] h-[40px] ${
                item.sender == "user" ? "bg-[#5EA4F9]" : "bg-[#2865EC]"
              }   rounded-full flex justify-center items-center`}
            >
              <Image
                src={item.sender == "user" ? UserPfp : AiPfp}
                alt={item.sender == "user" ? "user-pfp" : "ai-pfp"}
              />
            </div>

            <div className="w-[500px] break-words">{item.message}</div>
          </div>
        ))}
        {loading && (
          <div
            className={`bg-[#F5F9FF] flex items-center px-[1rem] py-[1.5rem] gap-4`}
          >
            <div
              className={`w-[40px] h-[40px] bg-[#2865EC] rounded-full flex justify-center items-center`}
            >
              <Image src={AiPfp} alt="ai-pfp" />
            </div>

            <div className="w-[500px] break-words ml-[1rem]">
              <div className="dot-carousel"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form
        className="flex justify-between items-center px-[1rem] mt-[10px] relative"
        onSubmit={sendMessage}
      >
        <input
          type="text"
          className="border-[#EDEDED] border bg-[#fafafa] rounded-[8px] h-[50px] w-full pl-[1rem] pr-[4rem]"
          placeholder="Ask a question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="w-[36px] h-[36px] bg-[#2865ec] rounded-[8px] absolute right-[1.5rem] flex justify-center items-center cursor-pointer">
          <Image src={Send} alt="send" />
        </button>
      </form>
    </div>
  );
};

export default Chatbox;
