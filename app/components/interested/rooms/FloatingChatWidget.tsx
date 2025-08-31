"use client";

import { Send, X, Minus } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Lister } from "@/app/types/types";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: "user" | "lister";
  status?: "sent" | "delivered" | "read";
}

interface FloatingChatWidgetProps {
  lister: Lister;
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (message: string) => void;
}

const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({
  isOpen,
  onClose,
  lister,
  onSendMessage,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hello! I'm ${lister.name}. How can I help you with the rooms you're interested in?`,
      sender: "lister",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: "read",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    onSendMessage(newMessage);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "Thanks for your message! I'll get back to you shortly.",
        "I'd be happy to help you with that. Let me check the details.",
        "That's a great question! Let me provide you with more information.",
        "I can arrange a viewing for you. What time works best?",
      ];

      const listerResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "lister",
        timestamp: new Date(),
        status: "read",
      };

      setMessages((prev) => [...prev, listerResponse]);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-3 bg-green-600 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-green-700 text-white text-xs font-semibold">
              {lister.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{lister.name}</h3>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-xs text-green-100">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:bg-green-700 p-1 h-6 w-6"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-green-700 p-1 h-6 w-6"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-3 py-2 text-xs ${
                    message.sender === "user"
                      ? "bg-green-600 text-white rounded-br-sm"
                      : "bg-white text-gray-900 border rounded-bl-sm shadow-sm"
                  }`}
                >
                  <p className="break-words">{message.text}</p>
                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-xs ${
                      message.sender === "user"
                        ? "text-green-100"
                        : "text-gray-500"
                    }`}
                  >
                    <span>{formatTime(message.timestamp)}</span>
                    {message.sender === "user" && (
                      <div
                        className={`w-3 h-3 ${
                          message.status === "read"
                            ? "text-blue-300"
                            : "text-green-200"
                        }`}
                      >
                        ✓✓
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg px-3 py-2 border shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t rounded-b-lg">
            <div className="flex items-center gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-full border-gray-300 focus:border-green-500 text-sm h-8"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-green-600 hover:bg-green-700 rounded-full p-2 h-8 w-8"
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FloatingChatWidget;
