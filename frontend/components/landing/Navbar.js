'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { Briefcase, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-[#0D1117]/80 backdrop-blur-xl border-b border-white/5'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2 group"
                    >
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Briefcase className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-semibold text-lg text-foreground">
                            Job Tracker
                        </span>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <button
                            onClick={() => scrollToSection('features')}
                            className="text-sm text-default-500 hover:text-foreground transition-colors"
                        >
                            Features
                        </button>
                        <button
                            onClick={() => scrollToSection('why-different')}
                            className="text-sm text-default-500 hover:text-foreground transition-colors"
                        >
                            Why Us
                        </button>

                        {!loading && (
                            <div className="flex items-center gap-3">
                                {isAuthenticated ? (
                                    <Button
                                        color="primary"
                                        onPress={() => router.push('/dashboard')}
                                        className="font-medium"
                                    >
                                        Go to Dashboard
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            variant="light"
                                            onPress={() => router.push('/auth/login')}
                                            className="font-medium text-foreground"
                                        >
                                            Sign In
                                        </Button>
                                        <Button
                                            color="primary"
                                            onPress={() => router.push('/auth/signup')}
                                            className="font-medium"
                                        >
                                            Sign Up
                                        </Button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-foreground"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 pt-4 -mx-6 px-6 bg-[#0D1117] border-t border-white/5">
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => scrollToSection('features')}
                                className="text-sm text-default-500 hover:text-foreground transition-colors text-left"
                            >
                                Features
                            </button>
                            <button
                                onClick={() => scrollToSection('why-different')}
                                className="text-sm text-default-500 hover:text-foreground transition-colors text-left"
                            >
                                Why Us
                            </button>

                            {!loading && (
                                <div className="flex flex-col gap-2 mt-2">
                                    {isAuthenticated ? (
                                        <Button
                                            color="primary"
                                            onPress={() => router.push('/dashboard')}
                                            className="font-medium w-full"
                                        >
                                            Go to Dashboard
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                variant="flat"
                                                onPress={() => router.push('/auth/login')}
                                                className="font-medium w-full"
                                            >
                                                Sign In
                                            </Button>
                                            <Button
                                                color="primary"
                                                onPress={() => router.push('/auth/signup')}
                                                className="font-medium w-full"
                                            >
                                                Sign Up
                                            </Button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
