
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ChatWithAI from '@/components/ChatWithAI';

interface ProductChatSectionProps {
  productName: string;
  categoryName: string;
  farmerName: string;
}

const ProductChatSection: React.FC<ProductChatSectionProps> = ({
  productName,
  categoryName,
  farmerName
}) => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="mt-6">
      <Button 
        variant="outline" 
        className="w-full border-agri-green text-agri-green hover:bg-agri-green hover:text-white dark:border-agri-light-green dark:text-agri-light-green dark:hover:bg-agri-light-green dark:hover:text-background"
        onClick={toggleChat}
      >
        {showChat ? "Close Chat" : "Chat with AI about this product"}
      </Button>
      
      {showChat && (
        <div className="mt-4 p-4 border border-border rounded-lg bg-card">
          <ChatWithAI 
            productName={productName} 
            categoryName={categoryName} 
            farmerName={farmerName} 
          />
        </div>
      )}
    </div>
  );
};

export default ProductChatSection;
