import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Camera, LogOut, Save } from "lucide-react";
import { toast } from "sonner";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
  user: {
    username: string;
    email: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
  };
  onUpdateProfile: (updates: {
    firstName: string;
    lastName: string;
    avatar: string;
  }) => void;
}

const AVATAR_OPTIONS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
];

export function ProfileModal({
  open,
  onClose,
  onLogout,
  user,
  onUpdateProfile,
}: ProfileModalProps) {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [selectedAvatar, setSelectedAvatar] = useState(
    user.avatar || AVATAR_OPTIONS[0]
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const handleSaveProfile = () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("Please enter both first and last name");
      return;
    }
    onUpdateProfile({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      avatar: selectedAvatar,
    });
    toast.success("Profile updated successfully!");
  };

  const handleResetPassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    // In production, this would call an API
    toast.success("Password reset successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Avatar Section */}
          <div className="space-y-4">
            <Label>Profile Picture</Label>
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={selectedAvatar} />
                  <AvatarFallback className="text-2xl">
                    {firstName.charAt(0) || user.username.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                  onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              {showAvatarPicker && (
                <div className="grid grid-cols-4 gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg w-full">
                  {AVATAR_OPTIONS.map((avatarUrl, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedAvatar(avatarUrl);
                        setShowAvatarPicker(false);
                      }}
                      className={`relative rounded-full overflow-hidden transition-all hover:scale-110 ${
                        selectedAvatar === avatarUrl
                          ? "ring-4 ring-indigo-600"
                          : ""
                      }`}
                    >
                      <img
                        src={avatarUrl}
                        alt={`Avatar ${index + 1}`}
                        className="w-16 h-16 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.email} disabled className="bg-gray-100 dark:bg-gray-800" />
              <p className="text-xs text-gray-500">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={user.username}
                disabled
                className="bg-gray-100 dark:bg-gray-800"
              />
              <p className="text-xs text-gray-500">Username cannot be changed</p>
            </div>

            <Button onClick={handleSaveProfile} className="w-full bg-indigo-600 hover:bg-indigo-700">
              <Save className="w-4 h-4 mr-2" />
              Save Profile
            </Button>
          </div>

          <Separator />

          {/* Reset Password */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Reset Password</h3>

            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button
              onClick={handleResetPassword}
              variant="outline"
              className="w-full"
            >
              Reset Password
            </Button>
          </div>

          <Separator />

          {/* Logout */}
          <Button
            onClick={() => {
              onClose();
              onLogout();
            }}
            variant="destructive"
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
