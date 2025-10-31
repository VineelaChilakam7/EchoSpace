import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Paperclip, Send, Smile } from "lucide-react";

interface MessageInputProps {
  onSend?: (message: string) => void;
  placeholder?: string;
}

export function MessageInput({
  onSend,
  placeholder = "Type a message…",
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend?.(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4">
      <div className="flex items-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <Smile className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <Paperclip className="w-5 h-5" />
        </Button>
        
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 rounded-full bg-gray-100 dark:bg-gray-800 border-0 focus-visible:ring-indigo-600"
        />
        
        <Button
          onClick={handleSend}
          size="icon"
          className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full"
          disabled={!message.trim()}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
