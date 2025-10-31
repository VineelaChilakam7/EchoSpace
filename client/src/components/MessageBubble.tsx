import { Check, CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  message: string;
  timestamp: string;
  sent: boolean;
  read?: boolean;
  showAvatar?: boolean;
  avatar?: string;
  senderName?: string;
}

export function MessageBubble({
  message,
  timestamp,
  sent,
  read = false,
  showAvatar = false,
  avatar,
  senderName,
}: MessageBubbleProps) {
  return (
    <div className={`flex gap-2 mb-4 ${sent ? "justify-end" : "justify-start"}`}>
      {!sent && showAvatar && avatar && (
        <img src={avatar} alt={senderName} className="w-8 h-8 rounded-full flex-shrink-0" />
      )}
      
      <div className={`flex flex-col ${sent ? "items-end" : "items-start"} max-w-[70%] md:max-w-[60%]`}>
        {!sent && senderName && (
          <span className="text-gray-600 dark:text-gray-400 text-xs mb-1 px-3">{senderName}</span>
        )}
        <div
          className={`px-4 py-2.5 rounded-2xl shadow-sm ${
            sent
              ? "bg-indigo-600 text-white rounded-br-sm"
              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm"
          }`}
        >
          <p className="break-words">{message}</p>
        </div>
        <div className={`flex items-center gap-1 mt-1 px-1 ${sent ? "flex-row" : "flex-row-reverse"}`}>
          <span className="text-gray-500 dark:text-gray-400 text-xs">{timestamp}</span>
          {sent && (
            <div className="text-gray-500 dark:text-gray-400">
              {read ? (
                <CheckCheck className="w-3.5 h-3.5 text-indigo-400" />
              ) : (
                <Check className="w-3.5 h-3.5" />
              )}
            </div>
          )}
        </div>
      </div>
      
      {sent && showAvatar && avatar && (
        <img src={avatar} alt="You" className="w-8 h-8 rounded-full flex-shrink-0" />
      )}
    </div>
  );
}
