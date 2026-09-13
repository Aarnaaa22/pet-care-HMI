import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

export default function MessageModal({ isOpen, onClose, groomer, pet }) {
  const currentPetName = pet?.name || "Silver";
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (groomer) {
      setMessages([
        {
          id: "m1",
          sender: "groomer",
          text: `Hi there! 👋 Welcome to ${groomer.name}. How can we help ${currentPetName} today?`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [groomer, currentPetName]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg = {
      id: `u-${Date.now()}`,
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputText("");

    // Simulate groomer automated reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let replyText = `Thanks for reaching out! We'd love to pamper ${currentPetName}. Our next open slot is ${new Date(groomer.nextAvailable).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}. Shall I hold this slot for you?`;
      
      if (text.toLowerCase().includes("nail") || text.toLowerCase().includes("trim")) {
        replyText = `Nail trims take about 15 minutes! Walk-ins are welcome, or you can book an express slot online for ${currentPetName}.`;
      } else if (text.toLowerCase().includes("shampoo") || text.toLowerCase().includes("skin") || text.toLowerCase().includes("sensitive")) {
        replyText = `We use 100% certified organic, hypoallergenic, tearless shampoos designed specifically for cats and dogs with sensitive skin.`;
      } else if (text.toLowerCase().includes("tabby") || text.toLowerCase().includes("cat") || text.toLowerCase().includes("silver")) {
        replyText = `Yes! We specialize in feline coat care, stress-free handling, and coat deshedding for ${currentPetName}.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `g-${Date.now()}`,
          sender: "groomer",
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  if (!groomer) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="max-w-md mx-auto mt-12 sm:mt-16 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px] outline-none z-50 border border-gray-200"
    >
      {/* Header */}
      <div className="bg-green-600 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <img
            src={groomer.hero}
            alt={groomer.name}
            className="w-11 h-11 rounded-full object-cover border-2 border-white/80"
          />
          <div>
            <h3 className="font-bold text-base leading-tight">{groomer.name}</h3>
            <p className="text-xs text-green-100 flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse inline-block"></span>
              <span>Online • {groomer.rating} ★ ({groomer.reviews} reviews)</span>
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-sm transition"
        >
          ✕
        </button>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-xs ${
                m.sender === "user"
                  ? "bg-green-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
              }`}
            >
              {m.text}
            </div>
            <span className="text-[10px] text-gray-400 mt-1 px-1">{m.time}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-gray-500 italic bg-white px-3 py-2 rounded-xl border border-gray-200 w-fit">
            <span className="animate-bounce">●</span>
            <span className="animate-bounce delay-100">●</span>
            <span className="animate-bounce delay-200">●</span>
            <span>{groomer.name} is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Canned Suggestions */}
      <div className="px-3 py-2 bg-gray-100 border-t border-gray-200 flex gap-2 overflow-x-auto text-xs whitespace-nowrap no-scrollbar">
        <button
          onClick={() => handleSendMessage(`Do you groom ${currentPetName}?`)}
          className="px-2.5 py-1 bg-white border border-gray-300 rounded-full hover:bg-green-50 text-gray-700 transition"
        >
          💬 Do you groom {currentPetName}?
        </button>
        <button
          onClick={() => handleSendMessage("Are nail trims walk-in available?")}
          className="px-2.5 py-1 bg-white border border-gray-300 rounded-full hover:bg-green-50 text-gray-700 transition"
        >
          💅 Nail trim walk-in?
        </button>
        <button
          onClick={() => handleSendMessage("What organic shampoos do you use?")}
          className="px-2.5 py-1 bg-white border border-gray-300 rounded-full hover:bg-green-50 text-gray-700 transition"
        >
          🧼 Shampoos used?
        </button>
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder={`Message ${groomer.name}...`}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-green-500"
        />
        <button
          onClick={() => handleSendMessage()}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition"
        >
          Send
        </button>
      </div>
    </Modal>
  );
}
