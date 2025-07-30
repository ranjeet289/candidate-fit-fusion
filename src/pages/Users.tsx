import { useState, useEffect } from "react";
import { Search, Filter, Linkedin, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserProfileModal } from "@/components/UserProfileModal";
import { usePageTitle } from "@/hooks/use-page-title";

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
  
  const { setTitle } = usePageTitle();
  
  useEffect(() => {
    setTitle("Users");
  }, [setTitle]);

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

  const getStatusDropdown = (user: User) => {
    const statusConfig = {
      onboarding: { label: "Pending Approval", className: "bg-gray-100 text-gray-700 hover:bg-gray-200" },
      active: { label: "Submitted to AM", className: "bg-gray-100 text-gray-700 hover:bg-gray-200" },
      blocked: { label: "Rejected", className: "bg-gray-100 text-gray-700 hover:bg-gray-200" }
    } as const;

    return (
      <Select 
        value={user.status} 
        onValueChange={(value: UserStatus) => handleUserStatusChange(user.id, value)}
      >
        <SelectTrigger className={`w-40 h-8 text-sm font-medium border-0 rounded-md ${statusConfig[user.status].className}`}>
          <SelectValue placeholder={statusConfig[user.status].label} />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
          <SelectItem value="onboarding" className="text-gray-700 hover:bg-gray-50">Pending Approval</SelectItem>
          <SelectItem value="active" className="text-gray-700 hover:bg-gray-50">Submitted to AM</SelectItem>
          <SelectItem value="blocked" className="text-gray-700 hover:bg-gray-50">Rejected</SelectItem>
        </SelectContent>
      </Select>
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
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow className="border-b border-gray-200">
            <TableHead className="text-gray-600 font-medium">RECRUITER NAME</TableHead>
            <TableHead className="text-gray-600 font-medium">RECRUITER ID</TableHead>
            <TableHead className="text-gray-600 font-medium">EMAIL</TableHead>
            <TableHead className="text-gray-600 font-medium">STATUS</TableHead>
            <TableHead className="text-gray-600 font-medium">DATE JOINED</TableHead>
            <TableHead className="text-gray-600 font-medium">LINKEDIN</TableHead>
          </TableRow>
      </TableHeader>
      <TableBody>
          {userList.map((user) => (
            <TableRow 
              key={user.id} 
              className="cursor-pointer hover:bg-gray-50 border-b border-gray-100"
              onClick={() => setSelectedUser(user)}
          >
            <TableCell className="flex items-center gap-3 text-gray-900">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gray-100 text-gray-700 text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {user.name}
            </TableCell>
            <TableCell className="text-gray-700">{user.recruiterId}</TableCell>
            <TableCell className="text-gray-700">{user.email}</TableCell>
            <TableCell>{getStatusDropdown(user)}</TableCell>
            <TableCell className="text-gray-700">{user.dateJoined}</TableCell>
            <TableCell>
              {user.linkedinUrl ? (
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600">
                  <Linkedin className="h-4 w-4" />
                </Button>
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );

  return (
    <div className="flex-1 space-y-6 bg-gray-50 min-h-screen">
      <div className="px-6 pt-6 space-y-6">

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
            />
          </div>
          <Button variant="outline" size="sm" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6 bg-white border border-gray-200 p-1">
            <TabsTrigger value="all" className="text-gray-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-blue-200">All Users ({filteredUsers.length})</TabsTrigger>
            <TabsTrigger value="week" className="text-gray-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-blue-200">This Week Joined</TabsTrigger>
            <TabsTrigger value="month" className="text-gray-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-blue-200">This Month Joined</TabsTrigger>
            <TabsTrigger value="onboarding" className="text-gray-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-blue-200">Onboarding</TabsTrigger>
            <TabsTrigger value="active" className="text-gray-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-blue-200">Active Users</TabsTrigger>
            <TabsTrigger value="blocked" className="text-gray-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-blue-200">Blocked Users</TabsTrigger>
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
    </div>
  );
}