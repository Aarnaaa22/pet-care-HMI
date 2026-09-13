import React, { useState } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you with your pet care today?", isAgent: true }
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    setMessages((prev) => [...prev, { text: inputText, isAgent: false }]);
    const userMsg = inputText;
    setInputText("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: `Thanks! Our vet team is reviewing your message: "${userMsg}".`, isAgent: true }
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-6 z-40">
      {isOpen ? (
        <div className="w-80 sm:w-96 bg-white rounded-card shadow-soft-lg border border-[#DCEBE0] overflow-hidden flex flex-col h-96 animate-fadeIn">
          {/* Header */}
          <div className="bg-[#7BD389] text-white p-3.5 flex items-center justify-between font-extrabold text-sm">
            <span className="flex items-center gap-2">
              <span>💬</span> PetCare Support Assistant
            </span>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 text-lg min-h-[44px] min-w-[44px] flex items-center justify-center">✕</button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-[#FAF9F6] text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.isAgent ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-2.5 rounded-2xl ${m.isAgent ? 'bg-white border border-[#EBF8EE] text-[#2A2F2B]' : 'bg-[#7BD389] text-white'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-2 border-t border-[#DCEBE0] bg-white flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-3 py-2 border border-[#DCEBE0] rounded-pill text-xs focus:outline-none focus:border-[#7BD389]"
            />
            <button type="submit" className="bg-[#7BD389] text-white text-xs font-bold px-3 py-2 rounded-pill min-h-[44px]">
              Send
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-[#7BD389] hover:bg-[#5BB369] text-white flex items-center justify-center text-2xl shadow-soft-lg hover:scale-105 transition min-h-[44px] min-w-[44px]"
          aria-label="Open Live Support Chat"
        >
          💬
        </button>
      )}
    </div>
  );
}
