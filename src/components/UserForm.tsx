import { useState, useEffect, useRef } from 'react';
import type { User } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePlus, X } from 'lucide-react';

interface UserFormProps {
  editingUser: User | null;
  onSubmit: (userData: {
    name: string;
    surname: string;
    email: string;
    company: string;
    jobTitle: string;
    id?: string;
  }) => Promise<boolean>;
  onCancelEdit: () => void;
  loading?: boolean;
}

const UserForm = ({
  editingUser,
  onSubmit,
  onCancelEdit,
  loading,
}: UserFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    company: '',
    jobTitle: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        surname: editingUser.surname,
        email: editingUser.email,
        company: editingUser.company ?? '',
        jobTitle: editingUser.jobTitle ?? '',
      });
    } else {
      setFormData({
        name: '',
        surname: '',
        email: '',
        company: '',
        jobTitle: '',
      });
    }
    setErrors({});
    if (firstInputRef.current) firstInputRef.current.focus();
  }, [editingUser]);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.surname.trim()) newErrors.surname = 'Surname is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email))
      newErrors.email = 'Please enter a valid email';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job Title is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePostClick = async () => {
    if (submitting || !validateForm()) return;
    setSubmitting(true);
    const success = await onSubmit(
      editingUser ? { ...formData, id: editingUser.id } : formData,
    );
    setSubmitting(false);
    if (success && !editingUser) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Add delay so that form resets
      setFormData({
        name: '',
        surname: '',
        email: '',
        company: '',
        jobTitle: '',
      });
      setErrors({});
      if (firstInputRef.current) firstInputRef.current.focus();
    }
  };

  const handleCancel = () => {
    if (editingUser) onCancelEdit();
    else
      setFormData({
        name: '',
        surname: '',
        email: '',
        company: '',
        jobTitle: '',
      });
    setErrors({});
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const formTitle = editingUser ? 'Edit User Information' : 'Add New User';
  const submitButtonText = editingUser ? 'Update User' : 'Add User';
  const loadingText = editingUser ? 'Updating...' : 'Adding...';

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FilePlus className="h-5 w-5" />
          {formTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {['name', 'surname', 'email', 'company', 'jobTitle'].map((field) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)} *
              </Label>
              <Input
                ref={field === 'name' ? firstInputRef : undefined}
                id={field}
                type={field === 'email' ? 'email' : 'text'}
                value={formData[field as keyof typeof formData]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className={
                  errors[field] ? 'border-red-500 focus:ring-red-500' : ''
                }
                placeholder={`Enter ${field}`}
                aria-invalid={!!errors[field]}
                aria-describedby={
                  errors[field] ? `${field}-error` : `${field}-help`
                }
                required
              />
              <div id={`${field}-help`} className="sr-only">
                Enter user's {field}
              </div>
              {errors[field] && (
                <p
                  id={`${field}-error`}
                  className="text-sm text-red-500"
                  role="alert"
                >
                  {errors[field]}
                </p>
              )}
            </div>
          ))}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              onClick={handlePostClick}
              disabled={loading || submitting}
              className="flex-1"
            >
              {loading || submitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  <span>{loadingText}</span>
                </div>
              ) : (
                submitButtonText
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={loading || submitting}
            >
              <X className="h-3 w-3" /> Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserForm;
