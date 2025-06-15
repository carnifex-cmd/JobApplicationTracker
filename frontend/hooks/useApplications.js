import { useState, useEffect } from 'react';
import { applicationsAPI } from '../services/api';
import { toast } from 'react-hot-toast';

export const useApplications = () => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    sortBy: 'created_at',
    sortOrder: 'DESC',
  });

  const fetchApplications = async (customFilters = {}) => {
    setLoading(true);
    try {
      const response = await applicationsAPI.getAll({ ...filters, ...customFilters });
      setApplications(response.data.applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await applicationsAPI.getStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const createApplication = async (data) => {
    try {
      const response = await applicationsAPI.create(data);
      setApplications(prev => [response.data.application, ...prev]);
      await fetchStats(); // Refresh stats
      toast.success('Application added successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to add application';
      return { success: false, error: message };
    }
  };

  const updateApplication = async (id, data) => {
    try {
      const response = await applicationsAPI.update(id, data);
      setApplications(prev => 
        prev.map(app => app.id === id ? response.data.application : app)
      );
      await fetchStats(); // Refresh stats
      toast.success('Application updated successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update application';
      return { success: false, error: message };
    }
  };

  const deleteApplication = async (id) => {
    try {
      await applicationsAPI.delete(id);
      setApplications(prev => prev.filter(app => app.id !== id));
      await fetchStats(); // Refresh stats
      toast.success('Application deleted successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to delete application';
      return { success: false, error: message };
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  useEffect(() => {
    fetchApplications();
  }, [filters]);

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    applications,
    stats,
    loading,
    filters,
    fetchApplications,
    fetchStats,
    createApplication,
    updateApplication,
    deleteApplication,
    updateFilters,
  };
}; 