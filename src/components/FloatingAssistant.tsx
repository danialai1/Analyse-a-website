import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Sparkles, X, Send, Bot, User, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";

interface FloatingAssistantProps {
  currentPromptContext?: string;
}

export default function FloatingAssistant({ currentPromptContext }: FloatingAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const starterQuestions = [
    "What technologies are used on Stripe?",
    "How does Stripe's typography pairing work?",
    "Analyze accessibility issues on Stripe's climate page.",
    "Draft a React/Tailwind landing page mockup inspired by Stripe."
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isSending) return;
    const userMsg: ChatMessage = { role: "user", content: textToSend.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: "https://stripe.com",
          analysis: {
            overview: { name: "Stripe" }
          },
          messages: updatedMessages
        })
      });
      if (!res.ok) throw new Error("Assistant response failed.");
      const data = await res.json();
      setMessages([...updatedMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages([...updatedMessages, { role: "assistant", content: "Error: AI service is currently overloaded. Please retry." }]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      {/* Trigger Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-[#635BFF] to-[#00D4B2] hover:opacity-90 text-white p-3.5 rounded-full shadow-[0_8px_30px_rgba(99,91,255,0.3)] transition-all duration-300 transform hover:scale-110 flex items-center gap-2 group cursor-pointer"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out text-xs font-black uppercase tracking-wider whitespace-nowrap">
            Ask WebX-Ray AI
          </span>
        </button>
      )}

      {/* Floating Panel */}
      {isOpen && (
        <div className="bg-[#0A0A0F] border border-zinc-800 rounded-2xl w-[360px] md:w-[400px] h-[520px] flex flex-col shadow-2xl overflow-hidden animate-fade-in text-left">
          {/* Header */}
          <div className="bg-[#060608] px-4 py-3.5 border-b border-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00D4B2]" />
              <h3 className="text-white font-black text-xs uppercase tracking-widest font-mono">
                WebX-Ray AI Assistant
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Lists */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-[#0A0A0F]/60">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#635BFF]/10 flex items-center justify-center border border-[#635BFF]/25">
                  <Sparkles className="w-6 h-6 text-[#00D4B2]" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-1">Spatial Intelligence Copilot</h4>
                  <p className="text-zinc-500 text-[11px] leading-relaxed max-w-xs">
                    I have context over your active website scan reports. Ask me to explain components, write custom React implementations, or analyze design choices.
                  </p>
                </div>

                {/* Starter Actions */}
                <div className="w-full space-y-1.5 pt-2">
                  {starterQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="w-full text-left bg-[#0D0D12] hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-[11px] font-medium p-2.5 rounded-xl transition-all cursor-pointer truncate"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => {
                const isAI = msg.role === "assistant";
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 max-w-[85%] ${
                      isAI ? "self-start" : "ml-auto flex-row-reverse"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                      isAI
                        ? "bg-[#635BFF]/10 border-[#635BFF]/25 text-[#00D4B2]"
                        : "bg-zinc-900 border-zinc-800 text-zinc-300"
                    }`}>
                      {isAI ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                    </div>
                    <div className={`p-3 rounded-xl text-xs leading-relaxed ${
                      isAI
                        ? "bg-[#060608] border border-zinc-900 text-zinc-300"
                        : "bg-[#00D4B2]/10 border border-[#00D4B2]/20 text-white"
                    }`}>
                      <div className="whitespace-pre-line font-sans">{msg.content}</div>
                    </div>
                  </div>
                );
              })
            )}

            {isSending && (
              <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-mono uppercase tracking-widest pl-1 select-none">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#00D4B2]" />
                <span>AI Agent processing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-3 bg-[#060608] border-t border-zinc-900 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask WebX-Ray AI..."
              className="flex-grow bg-[#0D0D12] border border-zinc-850 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00D4B2]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isSending}
              className="bg-gradient-to-r from-[#635BFF] to-[#00D4B2] disabled:opacity-40 text-white p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
