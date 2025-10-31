import { useState, useRef, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { CreateRoomDialog } from "./components/CreateRoomDialog";
import { JoinRoomDialog } from "./components/JoinRoomDialog";
import { RoomCard } from "./components/RoomCard";
import { RoomChatHeader } from "./components/RoomChatHeader";
import { ParticipantsDrawer } from "./components/ParticipantsDrawer";
import { LogoutDialog } from "./components/LogoutDialog";
import { ProfileModal } from "./components/ProfileModal";
import { MessageBubble } from "./components/MessageBubble";
import { MessageInput } from "./components/MessageInput";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { ScrollArea } from "./components/ui/scroll-area";
import { Separator } from "./components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Toaster, toast } from "sonner";
import { Search, Moon, Sun, Plus, LogOut, User as UserIcon, MessageCircle } from "lucide-react";

// Types
type Page = "landing" | "chat";

interface Room {
  id: string;
  name: string;
  code: string;
  description?: string;
  lastMessage?: string;
  participantCount: number;
}

interface Message {
  id: string;
  message: string;
  timestamp: string;
  sent: boolean;
  read?: boolean;
  senderName?: string;
  senderAvatar?: string;
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  role?: "admin" | "member";
}

// Mock credentials
const DEMO_CREDENTIALS = {
  email: "demo@echospace.com",
  password: "password123",
  username: "Demo User",
  firstName: "Demo",
  lastName: "User",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
};

// Mock data
const mockParticipants: Participant[] = [
  {
    id: "1",
    name: "Demo User",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    online: true,
    role: "admin",
  },
  {
    id: "2",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=100",
    online: true,
    role: "member",
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    avatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=100",
    online: true,
    role: "member",
  },
  {
    id: "4",
    name: "Emma Watson",
    avatar: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?w=100",
    online: false,
    role: "member",
  },
];

const initialRooms: Room[] = [
  {
    id: "1",
    name: "Frontend Developers",
    code: "FE2K9X",
    description: "Discussing React, Vue, and modern web development",
    lastMessage: "Just pushed the new component library!",
    participantCount: 12,
  },
  {
    id: "2",
    name: "Design Team",
    code: "DZ8P4L",
    description: "UI/UX design collaboration",
    lastMessage: "The new mockups look amazing 🎨",
    participantCount: 8,
  },
  {
    id: "3",
    name: "Project Alpha",
    code: "PA7Q3M",
    lastMessage: "Meeting scheduled for 3 PM",
    participantCount: 15,
  },
];

const initialMessages: Message[] = [
  { 
    id: "1", 
    message: "Hey team! Welcome to the Frontend Developers room 👋", 
    timestamp: "10:30 AM", 
    sent: false, 
    senderName: "Sarah Chen", 
    senderAvatar: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=100" 
  },
  { 
    id: "2", 
    message: "Glad to be here! Excited to collaborate with everyone.", 
    timestamp: "10:32 AM", 
    sent: true, 
    read: true 
  },
  { 
    id: "3", 
    message: "I just published the new React hooks documentation. Check it out!", 
    timestamp: "10:35 AM", 
    sent: false, 
    senderName: "Michael Rodriguez", 
    senderAvatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=100" 
  },
  { 
    id: "4", 
    message: "Awesome! I'll take a look right now 🚀", 
    timestamp: "10:36 AM", 
    sent: true, 
    read: true 
  },
  { 
    id: "5", 
    message: "Has anyone tested the new components on Safari?", 
    timestamp: "10:38 AM", 
    sent: false, 
    senderName: "Sarah Chen", 
    senderAvatar: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=100" 
  },
  { 
    id: "6", 
    message: "Yes! Everything works perfectly. Great job on the responsive design.", 
    timestamp: "10:40 AM", 
    sent: false, 
    senderName: "Michael Rodriguez", 
    senderAvatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=100" 
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<{ 
    username: string; 
    email: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
  } | null>(null);
  
  // Room management
  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  // Messages
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mobile view
  const [mobileView, setMobileView] = useState<"rooms" | "chat">("rooms");

  const activeRoom = rooms.find((room) => room.id === activeRoomId);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auth handlers
  const handleLogin = (email: string, password: string) => {
    // Check demo credentials
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      setUser({ 
        username: DEMO_CREDENTIALS.username, 
        email: DEMO_CREDENTIALS.email,
        firstName: DEMO_CREDENTIALS.firstName,
        lastName: DEMO_CREDENTIALS.lastName,
        avatar: DEMO_CREDENTIALS.avatar
      });
      setRooms(initialRooms);
      setActiveRoomId("1");
      setMessages(initialMessages);
      setCurrentPage("chat");
      toast.success("Welcome back to EchoSpace!");
    } else {
      toast.error("Invalid credentials. Please use the demo credentials provided.");
    }
  };

  const handleRegister = (username: string, email: string, password: string) => {
    // Mock register - in production, would validate and create account
    setUser({ 
      username, 
      email,
      firstName: username.split(" ")[0],
      lastName: username.split(" ")[1] || "",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
    });
    setRooms(initialRooms);
    setActiveRoomId("1");
    setMessages(initialMessages);
    setCurrentPage("chat");
    toast.success(`Welcome to EchoSpace, ${username}!`);
  };

  const handleUpdateProfile = (updates: { firstName: string; lastName: string; avatar: string }) => {
    if (user) {
      setUser({
        ...user,
        firstName: updates.firstName,
        lastName: updates.lastName,
        avatar: updates.avatar,
      });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("landing");
    setRooms([]);
    setActiveRoomId(null);
    setMessages([]);
    setShowLogoutDialog(false);
    toast.success("You've been logged out successfully");
  };

  // Room handlers
  const handleCreateRoom = (roomName: string, roomCode: string, description: string) => {
    const newRoom: Room = {
      id: String(rooms.length + 1),
      name: roomName,
      code: roomCode,
      description,
      participantCount: 1,
    };
    setRooms([...rooms, newRoom]);
    setActiveRoomId(newRoom.id);
    setMobileView("chat");
    setMessages([
      {
        id: "1",
        message: `Welcome to ${roomName}! 🎉`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sent: false,
        senderName: "System",
      }
    ]);
    toast.success(`Room "${roomName}" created successfully!`);
  };

  const handleJoinRoom = (roomCode: string): boolean => {
    // Check if room exists
    const existingRoom = rooms.find((r) => r.code === roomCode);
    if (existingRoom) {
      setActiveRoomId(existingRoom.id);
      setMobileView("chat");
      toast.success(`Joined room: ${existingRoom.name}`);
      return true;
    }
    
    // For demo, allow any 6-character code and create a mock room
    if (roomCode.length === 6) {
      const newRoom: Room = {
        id: String(rooms.length + 1),
        name: `Room ${roomCode}`,
        code: roomCode,
        participantCount: 5,
        lastMessage: "Active discussion ongoing...",
      };
      setRooms([...rooms, newRoom]);
      setActiveRoomId(newRoom.id);
      setMobileView("chat");
      setMessages([
        {
          id: "1",
          message: "Welcome! You've joined an active room.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          sent: false,
          senderName: "System",
        }
      ]);
      toast.success(`Joined room successfully!`);
      return true;
    }
    
    return false;
  };

  const handleLeaveRoom = () => {
    if (activeRoomId && activeRoom) {
      setRooms(rooms.filter((r) => r.id !== activeRoomId));
      setActiveRoomId(null);
      setMobileView("rooms");
      toast.success(`Left room: ${activeRoom.name}`);
    }
  };

  // Message handler
  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: String(messages.length + 1),
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sent: true,
      read: false,
    };
    setMessages([...messages, newMessage]);

    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate a response
      const responses = [
        "That's a great point!",
        "I agree with that approach.",
        "Let me look into that.",
        "Thanks for sharing!",
        "Sounds good to me 👍",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, {
        id: String(prev.length + 1),
        message: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sent: false,
        senderName: "Sarah Chen",
        senderAvatar: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=100"
      }]);
    }, 2000);
  };

  // Render landing/auth page
  if (currentPage === "landing") {
    return (
      <>
        <LandingPage
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
        <Toaster />
      </>
    );
  }

  // Main chat interface
  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Desktop Layout */}
      <div className="hidden md:flex h-full">
        {/* Left Sidebar */}
        <div className="w-80 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col">
          {/* Sidebar Header */}
          <div className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">EchoSpace</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{user?.firstName?.charAt(0) || user?.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.username}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowProfileModal(true)}>
                    <UserIcon className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowLogoutDialog(true)} className="text-red-600 dark:text-red-400">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search rooms..."
                className="pl-10 bg-gray-100 dark:bg-gray-800 border-0"
              />
            </div>
          </div>

          {/* Room Creation Buttons */}
          <div className="px-4 pb-4 flex gap-2">
            <Button
              onClick={() => setShowCreateRoom(true)}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Room
            </Button>
            <Button
              onClick={() => setShowJoinRoom(true)}
              variant="outline"
              className="flex-1"
            >
              Join Room
            </Button>
          </div>

          <Separator />

          {/* Rooms List */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {rooms.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-700" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No rooms yet. Create or join one to get started!
                  </p>
                </div>
              ) : (
                rooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    {...room}
                    active={activeRoomId === room.id}
                    onClick={() => {
                      setActiveRoomId(room.id);
                      if (room.id === "1") {
                        setMessages(initialMessages);
                      }
                    }}
                  />
                ))
              )}
            </div>
          </ScrollArea>
          
          {/* Logout Button at Bottom */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <Button 
              onClick={() => setShowLogoutDialog(true)} 
              variant="outline" 
              className="w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeRoom ? (
            <>
              <RoomChatHeader
                roomName={activeRoom.name}
                roomCode={activeRoom.code}
                participantCount={activeRoom.participantCount}
                onShowParticipants={() => setShowParticipants(true)}
                onLeaveRoom={handleLeaveRoom}
              />

              <ScrollArea className="flex-1 bg-gray-50 dark:bg-gray-950">
                <div className="p-4 md:p-6 max-w-4xl mx-auto">
                  {messages.map((msg) => (
                    <MessageBubble
                      key={msg.id}
                      message={msg.message}
                      timestamp={msg.timestamp}
                      sent={msg.sent}
                      read={msg.read}
                      showAvatar={!msg.sent}
                      avatar={msg.sent ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" : msg.senderAvatar}
                      senderName={msg.senderName}
                    />
                  ))}
                  {isTyping && (
                    <div className="flex items-center gap-2 mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=100"
                        alt="Sarah"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <MessageInput onSend={handleSendMessage} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-950">
              <div className="text-center max-w-md px-4">
                <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-950 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No Room Selected</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  Create a new room or join an existing one with a room code
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => setShowCreateRoom(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Room
                  </Button>
                  <Button onClick={() => setShowJoinRoom(true)} variant="outline">
                    Join Room
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col h-full">
        {mobileView === "rooms" ? (
          <>
            {/* Mobile Header */}
            <div className="h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">EchoSpace</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback>{user?.firstName?.charAt(0) || user?.username.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.username}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setShowProfileModal(true)}>
                      <UserIcon className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowLogoutDialog(true)} className="text-red-600 dark:text-red-400">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Search */}
            <div className="p-4 bg-white dark:bg-gray-900">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search rooms..."
                  className="pl-10 bg-gray-100 dark:bg-gray-800 border-0"
                />
              </div>
            </div>

            {/* Room Creation Buttons */}
            <div className="px-4 pb-4 flex gap-2 bg-white dark:bg-gray-900">
              <Button
                onClick={() => setShowCreateRoom(true)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create
              </Button>
              <Button
                onClick={() => setShowJoinRoom(true)}
                variant="outline"
                className="flex-1"
              >
                Join
              </Button>
            </div>

            {/* Rooms List */}
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-2">
                {rooms.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-700" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 px-8">
                      No rooms yet. Create or join one to get started!
                    </p>
                  </div>
                ) : (
                  rooms.map((room) => (
                    <RoomCard
                      key={room.id}
                      {...room}
                      active={activeRoomId === room.id}
                      onClick={() => {
                        setActiveRoomId(room.id);
                        setMobileView("chat");
                        if (room.id === "1") {
                          setMessages(initialMessages);
                        }
                      }}
                    />
                  ))
                )}
              </div>
            </ScrollArea>
            
            {/* Logout Button at Bottom - Mobile */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <Button 
                onClick={() => setShowLogoutDialog(true)} 
                variant="outline" 
                className="w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </>
        ) : activeRoom ? (
          <div className="h-full flex flex-col">
            <RoomChatHeader
              roomName={activeRoom.name}
              roomCode={activeRoom.code}
              participantCount={activeRoom.participantCount}
              onBack={() => setMobileView("rooms")}
              showBackButton={true}
              onShowParticipants={() => setShowParticipants(true)}
              onLeaveRoom={handleLeaveRoom}
            />

            <ScrollArea className="flex-1 bg-gray-50 dark:bg-gray-950">
              <div className="p-4">
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg.message}
                    timestamp={msg.timestamp}
                    sent={msg.sent}
                    read={msg.read}
                    showAvatar={!msg.sent}
                    avatar={msg.sent ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" : msg.senderAvatar}
                    senderName={msg.senderName}
                  />
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=100"
                      alt="Sarah"
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <MessageInput onSend={handleSendMessage} />
          </div>
        ) : null}
      </div>

      {/* Dialogs and Drawers */}
      <CreateRoomDialog
        open={showCreateRoom}
        onClose={() => setShowCreateRoom(false)}
        onCreateRoom={handleCreateRoom}
      />
      
      <JoinRoomDialog
        open={showJoinRoom}
        onClose={() => setShowJoinRoom(false)}
        onJoinRoom={handleJoinRoom}
      />
      
      <ParticipantsDrawer
        open={showParticipants}
        onClose={() => setShowParticipants(false)}
        participants={mockParticipants}
        roomName={activeRoom?.name || ""}
      />
      
      <LogoutDialog
        open={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
      />
      
      {user && (
        <ProfileModal
          open={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          onLogout={() => {
            setShowProfileModal(false);
            setShowLogoutDialog(true);
          }}
          user={user}
          onUpdateProfile={handleUpdateProfile}
        />
      )}
      
      <Toaster />
    </div>
  );
}
