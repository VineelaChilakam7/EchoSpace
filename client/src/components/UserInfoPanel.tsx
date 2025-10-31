import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Bell, Image, File, Trash2, X } from "lucide-react";

interface UserInfoPanelProps {
  name: string;
  avatar: string;
  email: string;
  lastSeen?: string;
  onClose?: () => void;
}

export function UserInfoPanel({
  name,
  avatar,
  email,
  lastSeen,
  onClose,
}: UserInfoPanelProps) {
  const sharedMedia = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150",
    "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=150",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=150",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150",
  ];

  return (
    <div className="w-80 h-full border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col">
      <div className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4">
        <h3 className="text-gray-900 dark:text-gray-100">Contact Info</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 flex flex-col items-center text-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-gray-900 dark:text-gray-100 mb-1">{name}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{email}</p>
          {lastSeen && (
            <p className="text-gray-400 dark:text-gray-500 text-xs">Last seen {lastSeen}</p>
          )}
        </div>
        
        <Separator />
        
        <div className="p-4">
          <h4 className="text-gray-700 dark:text-gray-300 mb-3 px-2">Shared Media</h4>
          <div className="grid grid-cols-3 gap-2">
            {sharedMedia.map((media, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
              >
                <img
                  src={media}
                  alt={`Shared media ${index + 1}`}
                  className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer"
                />
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/30">
            <Image className="w-4 h-4 mr-2" />
            View All Media
          </Button>
        </div>
        
        <Separator />
        
        <div className="p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300">
            <Bell className="w-4 h-4 mr-3" />
            Mute Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30">
            <Trash2 className="w-4 h-4 mr-3" />
            Delete Chat
          </Button>
        </div>
      </div>
    </div>
  );
}
