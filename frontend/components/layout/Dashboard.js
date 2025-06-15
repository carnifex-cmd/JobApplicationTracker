'use client';

import { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Card,
  CardBody,
  Divider,
} from '@nextui-org/react';
import { 
  Plus, 
  Sun, 
  Moon, 
  LogOut, 
  User,
  Briefcase,
  Clock,
  CheckCircle,
  XCircle 
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuth } from '../../hooks/useAuth';
import { useApplications } from '../../hooks/useApplications';
import ApplicationsTable from '../applications/ApplicationsTable';
import ApplicationModal from '../applications/ApplicationModal';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  
  // Move useApplications to Dashboard component to manage state centrally
  const {
    applications,
    stats,
    loading,
    filters,
    updateFilters,
    createApplication,
    updateApplication,
    deleteApplication,
    fetchApplications,
  } = useApplications();

  const handleEditApplication = (application) => {
    setEditingApplication(application);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingApplication(null);
  };

  const statsCards = [
    {
      title: 'Total Applications',
      value: Object.values(stats).reduce((sum, count) => sum + count, 0),
      icon: Briefcase,
      color: 'primary',
    },
    {
      title: 'Applied',
      value: stats.applied || 0,
      icon: Clock,
      color: 'default',
    },
    {
      title: 'Interviews',
      value: stats.interview || 0,
      icon: User,
      color: 'warning',
    },
    {
      title: 'Offers',
      value: stats.offered || 0,
      icon: CheckCircle,
      color: 'success',
    },
    {
      title: 'Rejected',
      value: stats.rejected || 0,
      icon: XCircle,
      color: 'danger',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar maxWidth="full" className="border-b border-divider">
        <NavbarBrand>
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary" />
            <p className="font-bold text-inherit">Job Tracker</p>
          </div>
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              color="primary"
              startContent={<Plus className="w-4 h-4" />}
              onPress={() => setIsModalOpen(true)}
            >
              Add Application
            </Button>
          </NavbarItem>
          
          <NavbarItem>
            <Button
              isIconOnly
              variant="light"
              onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? 
                <Sun className="w-4 h-4" /> : 
                <Moon className="w-4 h-4" />
              }
            </Button>
          </NavbarItem>

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name={user?.email}
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem 
                key="logout" 
                color="danger"
                startContent={<LogOut className="w-4 h-4" />}
                onPress={logout}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      <div className="container mx-auto p-6 max-w-7xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {statsCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="border-none bg-gradient-to-br from-white to-default-200 dark:from-default-100 dark:to-default-50">
                <CardBody className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-small text-default-500 uppercase font-bold">
                        {stat.title}
                      </p>
                      <h4 className="text-2xl font-bold text-default-700 mt-1">
                        {stat.value}
                      </h4>
                    </div>
                    <div className={`p-2 rounded-lg bg-${stat.color} bg-opacity-20`}>
                      <IconComponent className={`w-6 h-6 text-${stat.color}`} />
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>

        <Divider className="my-6" />

        {/* Applications Table */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Applications</h2>
          </div>
          
          <ApplicationsTable 
            applications={applications}
            loading={loading}
            filters={filters}
            updateFilters={updateFilters}
            deleteApplication={deleteApplication}
            onEdit={handleEditApplication} 
          />
        </div>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        application={editingApplication}
        createApplication={createApplication}
        updateApplication={updateApplication}
      />
    </div>
  );
} 