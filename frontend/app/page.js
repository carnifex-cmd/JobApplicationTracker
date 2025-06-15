'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { Spinner } from '@nextui-org/react';
import Dashboard from '../components/layout/Dashboard';
import dynamic from 'next/dynamic';

const HomeContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return <Dashboard />;
};

// Export as dynamic component to prevent SSR
export default dynamic(() => Promise.resolve(HomeContent), {
  ssr: false
}); 