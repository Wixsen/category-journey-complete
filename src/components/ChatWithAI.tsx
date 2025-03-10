
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

export interface ChatWithAIProps {
  productName?: string;
  categoryName?: string;
  farmerName?: string;
  standalone?: boolean;
}

const ChatWithAI: React.FC<ChatWithAIProps> = ({ 
  productName, 
  categoryName,
  farmerName,
  standalone = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { 
      role: 'assistant', 
      content: productName 
        ? `Hello! I'm here to help you with any questions about ${productName}. What would you like to know?` 
        : 'Hello! I'm the AgriRoad AI assistant. How can I help you today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response with some context awareness
    setTimeout(() => {
      let response = "I'm not sure about that. Can you provide more details?";
      
      const userQuery = input.toLowerCase();
      
      if (productName && categoryName) {
        if (userQuery.includes('price') || userQuery.includes('cost')) {
          response = `${productName} is competitively priced. You can see the current price listed on the product page.`;
        } else if (userQuery.includes('organic') || userQuery.includes('pesticide')) {
          response = `Yes, our ${productName} is organically grown without synthetic pesticides.`;
        } else if (userQuery.includes('farmer') || userQuery.includes('grown')) {
          response = `${productName} is grown by ${farmerName || 'local farmers'} who follow sustainable farming practices.`;
        } else if (userQuery.includes('delivery') || userQuery.includes('shipping')) {
          response = `We offer fast delivery for ${productName} and all our ${categoryName}. Typically products are delivered within 2-3 business days.`;
        } else if (userQuery.includes('quality') || userQuery.includes('fresh')) {
          response = `Our ${productName} is carefully selected for freshness and quality. We guarantee farm-to-table freshness!`;
        } else {
          response = `Thank you for your question about ${productName}. Our ${categoryName} products are sourced directly from farmers and meet high quality standards. Is there anything specific you'd like to know?`;
        }
      } else {
        if (userQuery.includes('hello') || userQuery.includes('hi')) {
          response = "Hello! How can I assist you with your shopping today?";
        } else if (userQuery.includes('help')) {
          response = "I can help you with information about our products, delivery options, and farmers. What would you like to know?";
        } else if (userQuery.includes('delivery') || userQuery.includes('shipping')) {
          response = "We typically deliver within 2-3 business days. Express delivery is available in select areas.";
        } else if (userQuery.includes('payment')) {
          response = "We accept all major credit cards, UPI, and cash on delivery in select areas.";
        } else if (userQuery.includes('organic')) {
          response = "Yes, we offer a wide range of certified organic products. You can filter for organic items in our shop section.";
        } else if (userQuery.includes('farmer') || userQuery.includes('producer')) {
          response = "We partner with over 1,000 farmers across the country who follow sustainable farming practices.";
        }
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // If this is a standalone floating button
  if (standalone) {
    return (
      <div className="fixed bottom-5 right-5 z-40">
        {isOpen ? (
          <Card className="w-80 sm:w-96 h-96 flex flex-col shadow-lg border border-border">
            <div className="p-3 border-b border-border bg-muted flex justify-between items-center">
              <h3 className="font-semibold text-foreground">AgriRoad Assistant</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-agri-green text-white' 
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-muted text-foreground">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-3 border-t border-border">
              <div className="flex gap-2">
                <Textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="resize-none"
                  rows={1}
                />
                <Button size="icon" onClick={handleSend} disabled={input.trim() === ''}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Button 
            onClick={() => setIsOpen(true)} 
            className="rounded-full w-12 h-12 bg-agri-green hover:bg-agri-dark-green text-white shadow-lg"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        )}
      </div>
    );
  }

  // For embedded chat (in product pages, etc.)
  return (
    <div className="flex flex-col h-[300px] border border-border rounded-md overflow-hidden">
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-agri-green text-white' 
                  : 'bg-muted text-foreground'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-muted text-foreground">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t border-border">
        <div className="flex gap-2">
          <Textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="resize-none"
            rows={1}
          />
          <Button size="icon" onClick={handleSend} disabled={input.trim() === ''}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWithAI;
