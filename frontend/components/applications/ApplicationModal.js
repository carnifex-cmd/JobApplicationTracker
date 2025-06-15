'use client';

import { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import { Calendar, Building, Briefcase, FileText, Tag, X } from 'lucide-react';
import { format } from 'date-fns';

const statusOptions = [
  { key: 'applied', label: 'Applied', color: 'default' },
  { key: 'interview', label: 'Interview', color: 'warning' },
  { key: 'offered', label: 'Offered', color: 'success' },
  { key: 'rejected', label: 'Rejected', color: 'danger' },
];

export default function ApplicationModal({ 
  isOpen, 
  onClose, 
  application, 
  createApplication, 
  updateApplication 
}) {
  const [formData, setFormData] = useState({
    company: '',
    job_title: '',
    application_date: '',
    status: 'applied',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!application;

  useEffect(() => {
    if (application) {
      setFormData({
        company: application.company || '',
        job_title: application.job_title || '',
        application_date: application.application_date ? 
          format(new Date(application.application_date), 'yyyy-MM-dd') : '',
        status: application.status || 'applied',
        notes: application.notes || '',
      });
    } else {
      setFormData({
        company: '',
        job_title: '',
        application_date: format(new Date(), 'yyyy-MM-dd'),
        status: 'applied',
        notes: '',
      });
    }
    setErrors({});
  }, [application, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    } else if (formData.company.length > 255) {
      newErrors.company = 'Company name must be less than 255 characters';
    }

    if (!formData.job_title.trim()) {
      newErrors.job_title = 'Job title is required';
    } else if (formData.job_title.length > 255) {
      newErrors.job_title = 'Job title must be less than 255 characters';
    }

    if (!formData.application_date) {
      newErrors.application_date = 'Application date is required';
    } else {
      const applicationDate = new Date(formData.application_date);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // End of today
      
      if (applicationDate > today) {
        newErrors.application_date = 'Application date cannot be in the future';
      }
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    if (formData.notes && formData.notes.length > 5000) {
      newErrors.notes = 'Notes must be less than 5000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const result = isEditing
        ? await updateApplication(application.id, formData)
        : await createApplication(formData);

      if (result.success) {
        onClose();
      }
    } catch (error) {
      console.error('Error saving application:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      company: '',
      job_title: '',
      application_date: format(new Date(), 'yyyy-MM-dd'),
      status: 'applied',
      notes: '',
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {isEditing ? 'Edit Application' : 'Add New Application'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {isEditing 
                ? 'Update your job application details' 
                : 'Track a new job application'
              }
            </p>
          </div>
          <Button
            isIconOnly
            variant="light"
            onPress={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Company Name"
                placeholder="Enter company name"
                value={formData.company}
                onValueChange={(value) => handleInputChange('company', value)}
                startContent={<Building className="w-4 h-4 text-default-400" />}
                isInvalid={!!errors.company}
                errorMessage={errors.company}
                isRequired
              />
              
              <Input
                label="Job Title"
                placeholder="Enter job title"
                value={formData.job_title}
                onValueChange={(value) => handleInputChange('job_title', value)}
                startContent={<Briefcase className="w-4 h-4 text-default-400" />}
                isInvalid={!!errors.job_title}
                errorMessage={errors.job_title}
                isRequired
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="date"
                label="Application Date"
                value={formData.application_date}
                onValueChange={(value) => handleInputChange('application_date', value)}
                startContent={<Calendar className="w-4 h-4 text-default-400" />}
                isInvalid={!!errors.application_date}
                errorMessage={errors.application_date}
                isRequired
              />
              
              <Select
                label="Status"
                placeholder="Select application status"
                selectedKeys={[formData.status]}
                onSelectionChange={(keys) => {
                  const status = Array.from(keys)[0];
                  handleInputChange('status', status);
                }}
                startContent={<Tag className="w-4 h-4 text-default-400" />}
                isInvalid={!!errors.status}
                errorMessage={errors.status}
                isRequired
              >
                {statusOptions.map((status) => (
                  <SelectItem key={status.key} value={status.key}>
                    {status.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <Textarea
              label="Notes"
              placeholder="Add any notes about this application (optional)"
              value={formData.notes}
              onValueChange={(value) => handleInputChange('notes', value)}
              startContent={<FileText className="w-4 h-4 text-default-400" />}
              isInvalid={!!errors.notes}
              errorMessage={errors.notes}
              maxRows={6}
              description={`${formData.notes?.length || 0}/5000 characters`}
            />

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button 
                color="danger" 
                variant="light" 
                onPress={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                color="primary" 
                type="submit"
                isLoading={isLoading}
                startContent={isEditing ? undefined : <Briefcase className="w-4 h-4" />}
              >
                {isEditing ? 'Update Application' : 'Add Application'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 