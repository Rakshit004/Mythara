import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface GoAstroDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GoAstroDrawer({ isOpen, onClose }: GoAstroDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Hello! I'm your astrology assistant. I can help you understand how gemstones and jewelry can align with your astrological profile. What would you like to know?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-1/3 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">BY YOU</h3>
            <button onClick={onClose} className="focus:outline-none">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Chat Container */}
          <div 
            ref={chatContainerRef}
            className="flex-1 border rounded-lg p-4 mb-4 overflow-y-auto bg-gray-50"
          >
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p>Welcome to GO ASTRO!</p>
                <p className="text-sm mt-2">Ask me about astrology and how our jewelry can enhance your cosmic energy.</p>
              </div>
            ) : (
              messages.map((message) => (
                <div 
                  key={message.id}
                  className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}
                >
                  <div 
                    className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isUser 
                        ? 'bg-black text-white' 
                        : 'bg-white border'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.isUser ? 'text-gray-300' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="text-left mb-4">
                <div className="inline-block bg-white border px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="flex">
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="bg-black text-white px-4 py-2 rounded-r-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
              disabled={isLoading || !inputMessage.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
