
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export interface ChatWithAIProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  farmerName: string;
}

const ChatWithAI: React.FC<ChatWithAIProps> = ({ open, onOpenChange, farmerName }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogTitle className="text-lg font-semibold mb-4">
          Chat with {farmerName}
        </DialogTitle>
        
        <div className="flex flex-col h-[350px]">
          <div className="flex-1 bg-muted/30 rounded-lg p-4 mb-4 overflow-y-auto space-y-4">
            <div className="bg-primary/10 p-3 rounded-lg max-w-[80%]">
              <p className="text-sm">Hello! I'm the AI assistant for {farmerName}. How can I help you today?</p>
            </div>
            
            <div className="bg-primary/10 p-3 rounded-lg max-w-[80%] ml-auto text-right">
              <p className="text-sm">I'd like to know more about your farming practices.</p>
            </div>
            
            <div className="bg-primary/10 p-3 rounded-lg max-w-[80%]">
              <p className="text-sm">{farmerName} uses sustainable farming methods that focus on soil health and biodiversity. We minimize chemical inputs and prioritize organic approaches whenever possible.</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Textarea 
              placeholder="Type your message..." 
              className="min-h-[60px] resize-none"
            />
            <Button size="icon" className="bg-agri-green hover:bg-agri-dark-green">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatWithAI;
