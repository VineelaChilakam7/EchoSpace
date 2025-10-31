import { MessageCircle, Users, User } from "lucide-react";

interface MobileTabBarProps {
  activeTab: "chats" | "contacts" | "profile";
  onTabChange: (tab: "chats" | "contacts" | "profile") => void;
}

export function MobileTabBar({ activeTab, onTabChange }: MobileTabBarProps) {
  const tabs = [
    { id: "chats" as const, label: "Chats", icon: MessageCircle },
    { id: "contacts" as const, label: "Contacts", icon: Users },
    { id: "profile" as const, label: "Profile", icon: User },
  ];

  return (
    <div className="h-16 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-around px-4 md:hidden">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
              isActive
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
