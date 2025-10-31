import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface ChatListItemProps {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
  online?: boolean;
  active?: boolean;
  onClick?: () => void;
}

export function ChatListItem({
  name,
  avatar,
  lastMessage,
  timestamp,
  unread = 0,
  online = false,
  active = false,
  onClick,
}: ChatListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-3 p-3 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-800 ${
        active ? "bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-indigo-600" : ""
      }`}
    >
      <div className="relative flex-shrink-0">
        <Avatar className="w-12 h-12">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        {online && (
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
        )}
      </div>
      
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-gray-900 dark:text-gray-100 truncate">{name}</span>
          <span className="text-gray-500 dark:text-gray-400 text-xs flex-shrink-0">{timestamp}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-gray-600 dark:text-gray-400 text-sm truncate">{lastMessage}</p>
          {unread > 0 && (
            <Badge className="bg-indigo-600 text-white hover:bg-indigo-700 flex-shrink-0 min-w-5 h-5 flex items-center justify-center px-1.5">
              {unread}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}
