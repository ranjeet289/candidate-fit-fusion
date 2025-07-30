import { X, User, MapPin, Building, Linkedin, Copy } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type UserStatus = "onboarding" | "active" | "blocked";

interface User {
  id: string;
  name: string;
  email: string;
  recruiterId: string;
  dateJoined: string;
  linkedinUrl?: string;
  region?: string;
  industry?: string;
  bio?: string;
  status: UserStatus;
}

interface UserProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (userId: string, newStatus: UserStatus) => void;
}

export function UserProfileModal({ user, isOpen, onClose, onStatusChange }: UserProfileModalProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "onboarding": return "bg-yellow-500";
      case "blocked": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-muted text-2xl">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>{user.email}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6"
                  onClick={() => copyToClipboard(user.email)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            {user.linkedinUrl && (
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                Recruiter ID
              </div>
              <div className="font-medium">{user.recruiterId}</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Region
              </div>
              <div className="font-medium">
                {user.region || "No region provided"}
              </div>
            </div>

            <div className="space-y-2 col-span-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building className="h-4 w-4" />
                Industry
              </div>
              <div className="font-medium">
                {user.industry || "No industry provided"}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Status</h4>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${getStatusColor(user.status)}`} />
                <Badge variant="outline" className="capitalize">
                  {user.status}
                </Badge>
              </div>
            </div>
            
            <Select 
              value={user.status} 
              onValueChange={(value: UserStatus) => onStatusChange(user.id, value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="onboarding">Onboarding</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Bio</h4>
            <p className="text-sm text-muted-foreground">
              {user.bio || "No bio provided"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}