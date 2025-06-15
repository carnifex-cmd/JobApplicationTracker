'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Input, 
  Button, 
  Link,
  Divider 
} from '@nextui-org/react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      router.push('/');
    } else {
      setErrors({ submit: result.error });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-3 pb-0">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-small text-default-500 mt-2">
              Sign in to your job tracker account
            </p>
          </div>
        </CardHeader>
        <CardBody className="gap-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onValueChange={(value) => handleInputChange('email', value)}
              startContent={<Mail className="w-4 h-4 text-default-400" />}
              isInvalid={!!errors.email}
              errorMessage={errors.email}
              isRequired
            />
            
            <Input
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onValueChange={(value) => handleInputChange('password', value)}
              startContent={<Lock className="w-4 h-4 text-default-400" />}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <EyeOff className="w-4 h-4 text-default-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-default-400" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              isInvalid={!!errors.password}
              errorMessage={errors.password}
              isRequired
            />

            {errors.submit && (
              <p className="text-danger text-small">{errors.submit}</p>
            )}

            <Button
              type="submit"
              color="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          <Divider />

          <div className="text-center">
            <p className="text-small text-default-500">
              Don't have an account?{' '}
              <Link href="/auth/signup" color="primary" className="font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 