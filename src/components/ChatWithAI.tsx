import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatWithAIProps {
  productName: string;
  categoryName: string;
  farmerName: string;
}

interface Message {
  text: string;
  isUser: boolean;
}

interface Vegetable {
  _id: string;
  name: string;
  category: string;
  // Add other properties based on your API response
  // Example:
  // price: number;
  // imageUrl: string;
}

const ChatWithAI: React.FC<ChatWithAIProps> = ({
  productName,
  categoryName,
  farmerName,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: `Hi there! I can help you with information about ${productName} from ${farmerName}. What would you like to know?`,
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [vegetableData, setVegetableData] = useState<Vegetable[]>([]);

  useEffect(() => {
    const fetchVegetableData = async () => {
      try {
        const response = await fetch(
          'https://agriroad-chat-tybs.onrender.com/user/allproducts?category=Vegetables'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch vegetable data');
        }
        const data: Vegetable[] = await response.json();
        setVegetableData(data);
      } catch (error) {
        console.error('Error fetching vegetable data:', error);
      }
    };

    fetchVegetableData();
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    setInput('');
    setIsLoading(true);

    try {
      const contextQuery = `${input} (Context: Product: ${productName}, Category: ${categoryName}, Farmer: ${farmerName}, Vegetables Data: ${JSON.stringify(
        vegetableData
      )})`;

      const response = await fetch(
        `https://agriroad-chat-tybs.onrender.com/getresponse?input=${encodeURIComponent(
          contextQuery
        )}`
      );

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            text: data.response || "Sorry, I couldn't process your request.",
            isUser: false,
          },
        ]);
      } else {
        const text = await response.text();
        setMessages((prev) => [
          ...prev,
          {
            text: text || "Sorry, I couldn't process your request.",
            isUser: false,
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages((prev) => [
        ...prev,
        {
          text: 'Sorry, there was an error connecting to the AI service. Please try again later.',
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[400px]">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.isUser
                ? 'bg-agri-green text-white ml-auto'
                : 'bg-gray-100 text-gray-800 mr-auto'
            } max-w-[80%]`}
          >
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className="bg-gray-100 text-gray-800 p-3 rounded-lg mr-auto">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about this product..."
          className="flex-1"
        />
        <Button
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
          className="bg-agri-green hover:bg-agri-dark-green"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatWithAI;
