import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AlertCircle } from "lucide-react";

interface JoinRoomDialogProps {
  open: boolean;
  onClose: () => void;
  onJoinRoom: (roomCode: string) => boolean;
}

export function JoinRoomDialog({ open, onClose, onJoinRoom }: JoinRoomDialogProps) {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!roomCode) {
      setError("Please enter a room code");
      return;
    }

    const success = onJoinRoom(roomCode.toUpperCase());
    if (!success) {
      setError("Invalid room code. Please check and try again.");
    } else {
      setRoomCode("");
      onClose();
    }
  };

  const handleClose = () => {
    setRoomCode("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join Chat Room</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="roomCode">Room Code</Label>
            <Input
              id="roomCode"
              placeholder="Enter 6-digit code (e.g., X9Z2KF)"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              maxLength={6}
              className="tracking-widest uppercase"
              required
            />
            <p className="text-gray-500 dark:text-gray-400 text-xs">
              Enter the 6-character code shared by the room creator
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Join Room
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
