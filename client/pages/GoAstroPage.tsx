import { useState, useRef, useEffect } from "react";
import { Send, Stars } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
}

const SUGGESTIONS = [
  "Which gemstone suits my zodiac sign?",
  "What does wearing Emerald mean?",
  "Tell me about Ruby's astrological benefits",
  "Which stone is best for wealth?",
];

export default function GoAstroPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "bot",
      text: "Welcome to GO ASTRO — your guide to the cosmos and gemstones. Ask me which stone aligns with your energy, zodiac, or intention.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "b",
          role: "bot",
          text: "The stars are aligning your answer... Our astrology feature is coming soon. In the meantime, explore our celestial collections to find your perfect gemstone.",
        },
      ]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <Stars className="w-10 h-10 mx-auto mb-4 text-yellow-400" />
          <h1 className="text-4xl font-bold tracking-widest mb-2">GO ASTRO</h1>
          <p className="text-gray-400 text-sm tracking-wider">
            MYTARA & CO — DISCOVER YOUR CELESTIAL GEMSTONE
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 mb-6 overflow-y-auto max-h-[50vh] pr-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-white text-black"
                    : "bg-zinc-900 text-gray-200 border border-zinc-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-zinc-900 border border-zinc-800 px-4 py-3 text-gray-400 text-sm">
                <span className="animate-pulse">✦ Reading the stars...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="text-xs border border-zinc-700 px-3 py-1.5 text-gray-400 hover:border-white hover:text-white transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your gemstone..."
            className="flex-1 bg-zinc-900 border border-zinc-700 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white"
          />
          <button
            type="submit"
            className="bg-white text-black px-5 py-3 hover:bg-gray-200 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
