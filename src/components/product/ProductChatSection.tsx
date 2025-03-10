
import React from 'react';
import { MessageSquare } from 'lucide-react';
import ChatWithAI from '@/components/ChatWithAI';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
  return (
    <div className="mb-6">
      <Accordion type="single" collapsible className="border rounded-md">
        <AccordionItem value="chat-with-ai">
          <AccordionTrigger className="hover:bg-muted px-4">
            <div className="flex items-center text-foreground">
              <MessageSquare className="h-5 w-5 mr-2 text-agri-green dark:text-agri-light-green" />
              <span>Ask AI about this product</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <ChatWithAI 
              productName={productName} 
              categoryName={categoryName}
              farmerName={farmerName}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductChatSection;
