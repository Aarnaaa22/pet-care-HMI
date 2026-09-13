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
      setMessages((prev) => [...prev, { text: `Thanks! Our vet team is reviewing your message: "${userMsg}".`, isAgent: true }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-6 z-40">
      {isOpen ? (
        <div
          className="w-80 sm:w-96 rounded-md shadow-warm-lg overflow-hidden flex flex-col h-96 animate-fadeIn"
          style={{ backgroundColor: 'var(--paper)', border: '2px solid var(--wood-dark)' }}
        >
          {/* Header */}
          <div className="p-3.5 flex items-center justify-between font-extrabold text-sm font-nunito"
            style={{ backgroundColor: 'var(--pine-dark)', color: 'var(--cream)', borderBottom: '3px solid var(--brass-dark)' }}>
            <span className="flex items-center gap-2"><span>🐾</span> PetCare Support</span>
            <button onClick={() => setIsOpen(false)}
              className="text-lg min-h-[44px] min-w-[44px] flex items-center justify-center transition"
              style={{ color: 'var(--cream)', opacity: 0.8 }}>✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs" style={{ backgroundColor: 'var(--paper)' }}>
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.isAgent ? 'justify-start' : 'justify-end'}`}>
                <div
                  className="max-w-[80%] p-2.5 rounded-lg font-nunito"
                  style={m.isAgent
                    ? { backgroundColor: 'var(--paper-dark)', border: '1px solid var(--wood-light)', color: 'var(--ink)' }
                    : { backgroundColor: 'var(--awning)', color: '#fff' }
                  }
                >{m.text}</div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-2 flex gap-2" style={{ borderTop: '1px solid var(--paper-dark)', backgroundColor: 'var(--paper-dark)' }}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a question…"
              className="flex-1 px-3 py-2 rounded-md text-xs focus:outline-none font-nunito"
              style={{ backgroundColor: '#fff', border: '1.5px solid var(--wood)', color: 'var(--ink)' }}
            />
            <button type="submit" className="press-btn text-xs font-bold px-3 py-2 rounded-md min-h-[44px]" style={{ fontSize: '12px', padding: '8px 14px' }}>
              Send
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="press-btn w-14 h-14 rounded-full flex items-center justify-center text-2xl hover:scale-105 transition min-h-[44px] min-w-[44px]"
          style={{ borderRadius: '50%', padding: 0 }}
          aria-label="Open Live Support Chat"
        >🐾</button>
      )}
    </div>
  );
}
