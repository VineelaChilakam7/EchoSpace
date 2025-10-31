import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ArrowLeft, MoreVertical, Users, Copy, LogOut, Hash } from "lucide-react";
import { toast } from "sonner";

interface RoomChatHeaderProps {
  roomName: string;
  roomCode: string;
  participantCount: number;
  onBack?: () => void;
  showBackButton?: boolean;
  onShowParticipants?: () => void;
  onLeaveRoom?: () => void;
}

export function RoomChatHeader({
  roomName,
  roomCode,
  participantCount,
  onBack,
  showBackButton = false,
  onShowParticipants,
  onLeaveRoom,
}: RoomChatHeaderProps) {
  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    toast.success("Room code copied to clipboard");
  };

  return (
    <div className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="md:hidden flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-gray-900 dark:text-gray-100 truncate">{roomName}</h2>
            <Badge variant="secondary" className="text-xs flex-shrink-0">
              <Hash className="w-3 h-3 mr-1" />
              {roomCode}
            </Badge>
          </div>
          <button
            onClick={onShowParticipants}
            className="text-gray-500 dark:text-gray-400 text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <Users className="w-3.5 h-3.5 inline mr-1" />
            {participantCount} participants
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-1 flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={onShowParticipants}
          className="hidden md:flex"
        >
          <Users className="w-5 h-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={copyRoomCode}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Room Code
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onShowParticipants}>
              <Users className="w-4 h-4 mr-2" />
              View Participants
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onLeaveRoom}
              className="text-red-600 dark:text-red-400"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Leave Room
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
