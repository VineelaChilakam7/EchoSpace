import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Users } from "lucide-react";

interface Participant {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  role?: "admin" | "member";
}

interface ParticipantsDrawerProps {
  open: boolean;
  onClose: () => void;
  participants: Participant[];
  roomName: string;
}

export function ParticipantsDrawer({
  open,
  onClose,
  participants,
  roomName,
}: ParticipantsDrawerProps) {
  const onlineCount = participants.filter((p) => p.online).length;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Participants
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400 text-sm">{roomName}</p>
            <p className="text-gray-900 dark:text-gray-100 mt-1">
              {participants.length} members · {onlineCount} online
            </p>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-1">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={participant.avatar} alt={participant.name} />
                      <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {participant.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900 dark:text-gray-100 truncate">
                        {participant.name}
                      </p>
                      {participant.role === "admin" && (
                        <Badge variant="secondary" className="text-xs">Admin</Badge>
                      )}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {participant.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
