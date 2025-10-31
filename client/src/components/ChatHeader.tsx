import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";

interface ChatHeaderProps {
  name: string;
  avatar: string;
  online?: boolean;
  lastSeen?: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

export function ChatHeader({
  name,
  avatar,
  online = false,
  lastSeen,
  onBack,
  showBackButton = false,
}: ChatHeaderProps) {
  return (
    <div className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="md:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        
        <div className="relative">
          <Avatar className="w-10 h-10">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          {online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
          )}
        </div>
        
        <div>
          <h2 className="text-gray-900 dark:text-gray-100">{name}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {online ? "Online" : lastSeen ? `Last seen ${lastSeen}` : "Offline"}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Phone className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Video className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
