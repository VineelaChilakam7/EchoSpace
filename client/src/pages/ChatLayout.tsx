import { useState, useRef, useEffect } from "react";
import { MessageCircle, Sun, Moon, Plus, LogOut, User as UserIcon, Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { toast } from "sonner";
import { RoomCard } from "../components/RoomCard";
import { RoomChatHeader } from "../components/RoomChatHeader";
import { MessageBubble } from "../components/MessageBubble";
import { MessageInput } from "../components/MessageInput";
import { CreateRoomDialog } from "../components/CreateRoomDialog";
import { JoinRoomDialog } from "../components/JoinRoomDialog";
import { LogoutDialog } from "../components/LogoutDialog";
import { ParticipantsDrawer } from "../components/ParticipantsDrawer";
import { ProfileModal } from "../components/ProfileModal";

// Types
interface User {
  username: string;
  email: string;
  avatar?: string;
}

interface Room {
  id: string;
  name: string;
  code: string;
  participantCount: number;
  lastMessage?: string;
  description?: string;
}

interface Message {
  id: string;
  message: string;
  timestamp: string;
  sent: boolean;
  senderName?: string;
  senderAvatar?: string;
}

interface ChatLayoutProps {
  user: User;
  onLogout: () => void;
}

export function ChatLayout({ user, onLogout }: ChatLayoutProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (msg: string) => {
    const newMsg: Message = {
      id: String(messages.length + 1),
      message: msg,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sent: true,
    };
    setMessages([...messages, newMsg]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          message: "Got it!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          sent: false,
          senderName: "System",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col">
          <div className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                EchoSpace
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.username}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowProfileModal(true)}>
                    <UserIcon className="w-4 h-4 mr-2" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setShowLogoutDialog(true)}
                    className="text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search rooms..." className="pl-10" />
            </div>
          </div>

          {/* Create / Join Buttons */}
          <div className="px-4 pb-4 flex gap-2">
            <Button onClick={() => setShowCreateRoom(true)} className="flex-1 bg-indigo-600 text-white">
              <Plus className="w-4 h-4 mr-2" /> Create Room
            </Button>
            <Button onClick={() => setShowJoinRoom(true)} variant="outline" className="flex-1">
              Join Room
            </Button>
          </div>

          <Separator />

          {/* Rooms List */}
          <ScrollArea className="flex-1 p-4">
            {rooms.length === 0 ? (
              <p className="text-sm text-gray-500">No rooms yet. Create one to start!</p>
            ) : (
              rooms.map((room) => (
                <RoomCard key={room.id} {...room} onClick={() => setActiveRoom(room)} />
              ))
            )}
          </ScrollArea>
        </div>

        {/* Chat Section */}
        <div className="flex-1 flex flex-col">
          {activeRoom ? (
            <>
              <RoomChatHeader
                roomName={activeRoom.name}
                roomCode={activeRoom.code}
                participantCount={activeRoom.participantCount}
                onShowParticipants={() => setShowParticipants(true)}
                onLeaveRoom={() => setActiveRoom(null)}
              />
              <ScrollArea className="flex-1 bg-gray-50 dark:bg-gray-950 p-6">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} {...msg} />
                ))}
                {isTyping && <p className="text-sm text-gray-400 mt-2">Typing...</p>}
                <div ref={messagesEndRef} />
              </ScrollArea>
              <MessageInput onSend={handleSendMessage} />
            </>
          ) : (
            <div className="flex items-center justify-center flex-1 text-gray-500">
              Select or create a room to start chatting.
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateRoomDialog open={showCreateRoom} onClose={() => setShowCreateRoom(false)} onCreateRoom={() => {}} />
      <JoinRoomDialog open={showJoinRoom} onClose={() => setShowJoinRoom(false)} onJoinRoom={() => {}} />
      <LogoutDialog open={showLogoutDialog} onClose={() => setShowLogoutDialog(false)} onConfirm={onLogout} />
      <ProfileModal open={showProfileModal} onClose={() => setShowProfileModal(false)} onLogout={onLogout} user={user} onUpdateProfile={() => {}} />
      <ParticipantsDrawer open={showParticipants} onClose={() => setShowParticipants(false)} participants={[]} roomName={activeRoom?.name || ""} />
    </div>
  );
}
