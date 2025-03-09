
import React, { useState } from 'react';
import { Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { 
      text: standalone 
        ? "Hello! I'm your AgriRoad AI assistant. How can I help you today?"
        : `Hello! I'm your AgriRoad AI assistant. Ask me anything about ${productName || 'our products'} from ${farmerName || 'our farmers'}.`, 
      isUser: false 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputText, isUser: true }]);
    
    // Simulate AI thinking
    setTimeout(() => {
      // Add AI response based on context
      let response = '';
      const userQuestion = inputText.toLowerCase();
      
      if (userQuestion.includes('organic') && productName) {
        response = `Yes, ${productName} from ${farmerName || 'our farmers'} is grown using organic farming practices with no synthetic pesticides.`;
      } else if (userQuestion.includes('price')) {
        response = `Our pricing is competitive and reflects the quality and sustainable practices used to grow ${productName || 'our products'}.`;
      } else if (userQuestion.includes('delivery')) {
        response = 'We offer fast and reliable delivery services. Most orders are delivered within 1-2 business days.';
      } else if (userQuestion.includes('farmer') && farmerName) {
        response = `${farmerName} is one of our trusted farmers who has been with AgriRoad for several years. They follow sustainable farming practices and are known for high-quality produce.`;
      } else {
        response = `Thanks for your question about ${productName || categoryName || 'our products'}! Our team is working on providing you with detailed information. In the meantime, feel free to ask anything else about our products or services.`;
      }
      
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 1000);
    
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // For standalone mode on home page
  if (standalone) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        {isOpen ? (
          <div className="bg-white dark:bg-card w-80 rounded-lg shadow-lg overflow-hidden flex flex-col border border-border">
            <div className="bg-agri-green p-3 text-white flex justify-between items-center">
              <span className="font-medium">AgriRoad AI Assistant</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleChat}
                className="h-6 w-6 p-0 text-white hover:bg-agri-dark-green"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="h-64 overflow-y-auto p-3 space-y-4 bg-gray-50 dark:bg-card">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                      message.isUser 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-3 bg-white dark:bg-card border-t border-border flex">
              <Input
                className="flex-1 mr-2 text-sm h-9"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button 
                size="sm"
                onClick={handleSendMessage}
                className="bg-agri-green hover:bg-agri-dark-green text-white h-9 w-9 p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={toggleChat}
            className="h-14 w-14 rounded-full bg-agri-green hover:bg-agri-dark-green text-white shadow-lg flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </Button>
        )}
      </div>
    );
  }

  // For embedded mode on product pages
  return (
    <div className="w-full h-[300px] flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-2">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[75%] rounded-lg px-4 py-2 ${
                message.isUser 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-foreground'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex">
        <Input
          className="flex-1 mr-2"
          placeholder="Type your question..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button 
          onClick={handleSendMessage}
          className="bg-primary hover:bg-primary/90"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatWithAI;
