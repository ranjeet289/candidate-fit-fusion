import { useState } from "react";
import { Search, Filter, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserProfileModal } from "@/components/UserProfileModal";

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

const mockUsers: User[] = [
  {
    id: "1",
    name: "sohail khan",
    email: "devkhan1101@gmail.com",
    recruiterId: "129",
    dateJoined: "30 Jul 2025",
    linkedinUrl: "https://linkedin.com/in/sohailkhan",
    status: "active"
  },
  {
    id: "2",
    name: "Ashikur Test",
    email: "ashikurrahamanmolla...",
    recruiterId: "128",
    dateJoined: "29 Jul 2025",
    status: "onboarding"
  },
  {
    id: "3",
    name: "mehoni 9636",
    email: "mehoni9636@devdig...",
    recruiterId: "127",
    dateJoined: "29 Jul 2025",
    status: "active"
  },
  {
    id: "4",
    name: "Sarah Walker",
    email: "walker.sarah1986@g...",
    recruiterId: "126",
    dateJoined: "28 Jul 2025",
    linkedinUrl: "https://linkedin.com/in/sarahwalker",
    status: "blocked"
  },
  {
    id: "5",
    name: "Asima",
    email: "Asimaasghier200@g...",
    recruiterId: "125",
    dateJoined: "28 Jul 2025",
    status: "active"
  },
  {
    id: "6",
    name: "John Doe",
    email: "zia@synapseint.com",
    recruiterId: "124",
    dateJoined: "26 Jul 2025",
    linkedinUrl: "https://linkedin.com/in/johndoe",
    status: "onboarding"
  },
  {
    id: "7",
    name: "Aman Kapoor",
    email: "aman@synapseint.com",
    recruiterId: "123",
    dateJoined: "25 Jul 2025",
    status: "active"
  }
];

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleUserStatusChange = (userId: string, newStatus: UserStatus) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    if (selectedUser?.id === userId) {
      setSelectedUser(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: UserStatus) => {
    const statusConfig = {
      onboarding: { variant: "secondary", label: "Onboarding" },
      active: { variant: "default", label: "Active" },
      blocked: { variant: "destructive", label: "Blocked" }
    } as const;

    return (
      <Badge variant={statusConfig[status].variant as any}>
        {statusConfig[status].label}
      </Badge>
    );
  };

  const getUsersByStatus = (status?: UserStatus) => {
    if (!status) return filteredUsers;
    return filteredUsers.filter(user => user.status === status);
  };

  const thisWeekUsers = filteredUsers.filter(user => {
    const joinDate = new Date(user.dateJoined);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return joinDate >= weekAgo;
  });

  const thisMonthUsers = filteredUsers.filter(user => {
    const joinDate = new Date(user.dateJoined);
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    return joinDate >= monthAgo;
  });

  const renderUserTable = (userList: User[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>RECRUITER NAME</TableHead>
          <TableHead>RECRUITER ID</TableHead>
          <TableHead>EMAIL</TableHead>
          <TableHead>STATUS</TableHead>
          <TableHead>DATE JOINED</TableHead>
          <TableHead>LINKEDIN</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userList.map((user) => (
          <TableRow 
            key={user.id} 
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => setSelectedUser(user)}
          >
            <TableCell className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {user.name}
            </TableCell>
            <TableCell>{user.recruiterId}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{getStatusBadge(user.status)}</TableCell>
            <TableCell>{user.dateJoined}</TableCell>
            <TableCell>
              {user.linkedinUrl ? (
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Linkedin className="h-4 w-4" />
                </Button>
              ) : (
                "-"
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All Users ({filteredUsers.length})</TabsTrigger>
          <TabsTrigger value="week">This Week Joined</TabsTrigger>
          <TabsTrigger value="month">This Month Joined</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="active">Active Users</TabsTrigger>
          <TabsTrigger value="blocked">Blocked Users</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {renderUserTable(filteredUsers)}
        </TabsContent>

        <TabsContent value="week" className="space-y-4">
          {renderUserTable(thisWeekUsers)}
        </TabsContent>

        <TabsContent value="month" className="space-y-4">
          {renderUserTable(thisMonthUsers)}
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-4">
          {renderUserTable(getUsersByStatus("onboarding"))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {renderUserTable(getUsersByStatus("active"))}
        </TabsContent>

        <TabsContent value="blocked" className="space-y-4">
          {renderUserTable(getUsersByStatus("blocked"))}
        </TabsContent>
      </Tabs>

      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          onStatusChange={handleUserStatusChange}
        />
      )}
    </div>
  );
}