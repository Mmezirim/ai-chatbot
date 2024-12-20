import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState(""); 
  const [isConversationStarted, setIsConversationStarted] = useState(false); // Track if conversation has started

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: "user", content: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
        const response = await axios.post("http://localhost:8080/chat", {
          message: userInput,
        });

        console.log("Response from backend:", response.data);
      
        const botResponseText = typeof response.data === 'string' ? response.data : "Sorry, I couldn't understand that.";
        
        const botMessage = { role: "bot", content: botResponseText };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
        console.error("Error sending message:", error.message);
        
        const errorMessage = {
          role: "bot",
          content: "Sorry, there was an error processing your request.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setUserInput("");
    setIsConversationStarted(true); // Conversation started after the first message
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {/* Display welcome message before conversation starts */}
        {!isConversationStarted && (
          <div className="chat-message bot-message">
            <div className="chat-icon">🤖</div>
            <div className="chat-content">
              <p>Welcome to your conversation with Omix AI chatbot!</p>
              {/* <img 
                src="https://your-image-url.com/omix-chatbot-image.jpg" 
                alt="Omix Chatbot" 
                className="chatbot-image" 
              /> */}
            </div>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.role === "user" ? "user-message" : "bot-message"
            }`}
          >
            <div className="chat-icon">
              {msg.role === "user" ? "👤" : "🤖"}
            </div>
            <div className="chat-content">{msg.content}</div>
          </div>
        ))}
      </div>

      <div className="chat-input-container">
        <input
          type="text" 
          className="chat-input"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;