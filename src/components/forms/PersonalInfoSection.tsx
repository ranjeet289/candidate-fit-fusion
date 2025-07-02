
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PersonalInfoSectionProps {
  formData: any;
  updateFormData: (field: string, value: string) => void;
}

export default function PersonalInfoSection({ formData, updateFormData }: PersonalInfoSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateFormData('firstName', e.target.value)}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => updateFormData('lastName', e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => updateFormData('location', e.target.value)}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="experience">Experience Level *</Label>
          <Select value={formData.experience} onValueChange={(value) => updateFormData('experience', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-2">0-2 years</SelectItem>
              <SelectItem value="2-5">2-5 years</SelectItem>
              <SelectItem value="5-8">5-8 years</SelectItem>
              <SelectItem value="8+">8+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
