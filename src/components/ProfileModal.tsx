// src/components/ProfileModal.tsx

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { Profile } from '@/types/profile';

interface ProfileModalProps {
  type: 'mentor' | 'mentee';
  onAddProfile: (profile: Omit<Profile, 'id' | 'createdAt'>) => void;
  trigger?: React.ReactNode;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ type, onAddProfile, trigger }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    yearsOfExperience: 0,
    skills: [] as string[],
    goals: [] as string[],
    availability: '',
    department: ''
  });
  const [skillInput, setSkillInput] = useState('');
  const [goalInput, setGoalInput] = useState('');

  const departments = [
    'Engineering', 'Product', 'Design', 'Marketing',
    'Sales', 'HR', 'Finance', 'Operations'
  ];
  const availabilityOptions = [
    '1-2 hours/week', '2-4 hours/week', '4-6 hours/week',
    'Flexible', 'Weekends only'
  ];

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !formData.skills.includes(s)) {
      setFormData(f => ({ ...f, skills: [...f.skills, s] }));
      setSkillInput('');
    }
  };

  const removeSkill = (s: string) => {
    setFormData(f => ({ ...f, skills: f.skills.filter(x => x !== s) }));
  };

  const addGoal = () => {
    const g = goalInput.trim();
    if (g && !formData.goals.includes(g)) {
      setFormData(f => ({ ...f, goals: [...f.goals, g] }));
      setGoalInput('');
    }
  };

  const removeGoal = (g: string) => {
    setFormData(f => ({ ...f, goals: f.goals.filter(x => x !== g) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // basic validation
    if (!formData.name || !formData.role || formData.yearsOfExperience < 0 ||
      formData.skills.length === 0 || !formData.availability || !formData.department) {
      return;
    }

    onAddProfile(formData);
    // reset form
    setFormData({
      name: '',
      role: '',
      yearsOfExperience: 0,
      skills: [],
      goals: [],
      availability: '',
      department: ''
    });
    setOpen(false);
  };

  const defaultTrigger = (
    <Button variant="gradient" className="gap-2">
      <Plus className="h-4 w-4" />
      Add {type === 'mentor' ? 'Mentor' : 'Mentee'}
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New {type === 'mentor' ? 'Mentor' : 'Mentee'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={e => setFormData(f => ({ ...f, role: e.target.value }))}
              placeholder="e.g. Software Engineer"
              required
            />
          </div>

          {/* Years of Experience */}
          <div className="space-y-2">
            <Label htmlFor="yoe">Years of Experience</Label>
            <Input
              id="yoe"
              type="number"
              value={formData.yearsOfExperience}
              onChange={e => setFormData(f => ({
                ...f,
                yearsOfExperience: Number(e.target.value)
              }))}
              placeholder="e.g. 3"
              min={0}
              required
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              value={formData.department}
              onValueChange={v => setFormData(f => ({ ...f, department: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <Label htmlFor="availability">Availability</Label>
            <Select
              value={formData.availability}
              onValueChange={v => setFormData(f => ({ ...f, availability: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                {availabilityOptions.map(opt => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <div className="flex gap-2">
              <Input
                id="skills"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                placeholder="Add a skill"
                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <Button type="button" onClick={addSkill} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {formData.skills.map((s, i) => (
                <Badge key={i} variant="secondary" className="gap-1">
                  {s}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(s)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div className="space-y-2">
            <Label htmlFor="goals">Goals</Label>
            <div className="flex gap-2">
              <Input
                id="goals"
                value={goalInput}
                onChange={e => setGoalInput(e.target.value)}
                placeholder="Add a goal"
                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addGoal())}
              />
              <Button type="button" onClick={addGoal} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {formData.goals.map((g, i) => (
                <Badge key={i} variant="outline" className="gap-1">
                  {g}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeGoal(g)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient">
              Add {type === 'mentor' ? 'Mentor' : 'Mentee'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
