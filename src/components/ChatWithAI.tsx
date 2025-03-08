
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send, X } from 'lucide-react';

interface ChatWithAIProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  farmerName?: string;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const CHAT_API_URL = 'https://agriroad-chat-tybs.onrender.com/getresponse?input=';

const ChatWithAI: React.FC<ChatWithAIProps> = ({ open, onOpenChange, farmerName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Add initial welcome message when chat opens
  useEffect(() => {
    if (open && messages.length === 0) {
      const welcomeMessage = farmerName 
        ? `Hello! I'm the AgriRoad AI assistant. You're chatting about products from ${farmerName}. How can I help you today?` 
        : 'Hello! I'm the AgriRoad AI assistant. How can I help you with your farming or shopping needs today?';
      
      setMessages([
        {
          id: Date.now().toString(),
          content: welcomeMessage,
          sender: 'ai',
          timestamp: new Date()
        }
      ]);
    }
  }, [open, farmerName, messages.length]);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // If there's a farmer context, add it to the prompt
      let prompt = input;
      if (farmerName) {
        prompt = `Context: Products from farmer ${farmerName}. User question: ${input}`;
      }
      
      const response = await fetch(`${CHAT_API_URL}${encodeURIComponent(prompt)}`);
      
      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }
      
      const data = await response.text();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data || "I'm sorry, I couldn't process your request. Please try again.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error. Please try again later.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <>
      {/* Floating chat button */}
      {!open && (
        <Button
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-agri-green hover:bg-agri-dark-green shadow-lg"
          onClick={() => onOpenChange(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
      
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px] h-[600px] max-h-[80vh] p-0 flex flex-col">
          <div className="p-4 border-b bg-agri-green text-white">
            <DialogTitle className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>Chat with AgriRoad AI</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-agri-dark-green h-8 w-8"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-agri-green text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <div className="text-sm">{message.content}</div>
                  <div 
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <div className="flex space-x-2 items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-agri-green hover:bg-agri-dark-green"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatWithAI;
