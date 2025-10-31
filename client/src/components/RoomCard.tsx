import { Badge } from "./ui/badge";
import { Users, Hash } from "lucide-react";

interface RoomCardProps {
  id: string;
  name: string;
  code: string;
  description?: string;
  lastMessage?: string;
  participantCount: number;
  active?: boolean;
  onClick?: () => void;
}

export function RoomCard({
  name,
  code,
  description,
  lastMessage,
  participantCount,
  active = false,
  onClick,
}: RoomCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border transition-all hover:shadow-md ${
        active
          ? "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800"
          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-gray-900 dark:text-gray-100 truncate mb-1">
            {name}
          </h3>
          {description && (
            <p className="text-gray-500 dark:text-gray-400 text-sm truncate">
              {description}
            </p>
          )}
        </div>
        <Badge variant="secondary" className="flex-shrink-0">
          <Hash className="w-3 h-3 mr-1" />
          {code}
        </Badge>
      </div>
      
      <div className="flex items-center justify-between gap-2 mt-3">
        {lastMessage && (
          <p className="text-gray-600 dark:text-gray-400 text-sm truncate flex-1">
            {lastMessage}
          </p>
        )}
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm flex-shrink-0">
          <Users className="w-4 h-4" />
          <span>{participantCount}</span>
        </div>
      </div>
    </button>
  );
}
