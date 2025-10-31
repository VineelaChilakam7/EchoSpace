import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Copy, RefreshCw, Check } from "lucide-react";

interface CreateRoomDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateRoom: (roomName: string, roomCode: string, description: string) => void;
}

export function CreateRoomDialog({ open, onClose, onCreateRoom }: CreateRoomDialogProps) {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [copied, setCopied] = useState(false);

  const generateRoomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setRoomCode(code);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomName && roomCode) {
      onCreateRoom(roomName, roomCode, description);
      setRoomName("");
      setDescription("");
      setRoomCode("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Chat Room</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="roomName">Room Name</Label>
            <Input
              id="roomName"
              placeholder="e.g., Frontend Devs"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="What's this room about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Room Code</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={generateRoomCode}
                className="flex-1"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate Code
              </Button>
            </div>
            
            {roomCode && (
              <div className="bg-indigo-50 dark:bg-indigo-950/30 border-2 border-indigo-200 dark:border-indigo-900 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">Your Room Code</p>
                  <p className="text-indigo-900 dark:text-indigo-100 tracking-widest">{roomCode}</p>
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={copyToClipboard}
                  className="text-indigo-600 dark:text-indigo-400"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </Button>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={!roomName || !roomCode}
            >
              Create and Enter Room
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
