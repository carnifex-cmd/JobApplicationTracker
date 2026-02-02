'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

export default function HeroSection() {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    const handlePrimaryCTA = () => {
        if (isAuthenticated) {
            router.push('/dashboard');
        } else {
            router.push('/auth/signup');
        }
    };

    const scrollToFeatures = () => {
        const element = document.getElementById('features');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-[#0D1117]">
                {/* Animated gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] animate-pulse delay-500" />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Headline */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
                        Stop Wondering
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                            Where You Applied
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-default-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        A simple, table-first tracker built during a real job search.
                        No gamification. No noise. Just a clear record of where you stand.
                    </p>

                    {/* CTAs */}
                    {!loading && (
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                size="lg"
                                color="primary"
                                onPress={handlePrimaryCTA}
                                endContent={<ArrowRight className="w-4 h-4" />}
                                className="font-semibold px-8 h-12"
                            >
                                {isAuthenticated ? 'Go to Dashboard' : 'Start Tracking Applications'}
                            </Button>
                            <Button
                                size="lg"
                                variant="bordered"
                                onPress={scrollToFeatures}
                                startContent={<Play className="w-4 h-4" />}
                                className="font-medium px-8 h-12 border-default-300 text-foreground"
                            >
                                View Features
                            </Button>
                        </div>
                    )}
                </motion.div>

                {/* Dashboard Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-16 relative"
                >
                    <div className="relative mx-auto max-w-4xl">
                        {/* Glow effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 rounded-2xl blur-2xl opacity-50" />

                        {/* Preview container */}
                        <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#161B22] shadow-2xl">
                            {/* Browser chrome */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-[#0D1117] border-b border-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="flex-1 mx-4">
                                    <div className="w-full max-w-sm mx-auto h-6 rounded-md bg-white/5 flex items-center justify-center">
                                        <span className="text-xs text-default-500">localhost:3000/dashboard</span>
                                    </div>
                                </div>
                            </div>

                            {/* Mock dashboard content */}
                            <div className="p-6 space-y-4">
                                {/* Stats row */}
                                <div className="grid grid-cols-5 gap-3">
                                    {['Total', 'Applied', 'Interview', 'Offers', 'Rejected'].map((stat, i) => (
                                        <div key={stat} className="p-3 rounded-lg bg-white/5 border border-white/5">
                                            <div className="text-xs text-default-500 mb-1">{stat}</div>
                                            <div className="text-lg font-bold text-foreground">
                                                {[24, 12, 6, 3, 3][i]}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Table preview */}
                                <div className="rounded-lg bg-white/5 border border-white/5 overflow-hidden">
                                    <div className="grid grid-cols-4 gap-4 p-3 bg-white/5 text-xs text-default-500 font-medium">
                                        <div>Company</div>
                                        <div>Position</div>
                                        <div>Status</div>
                                        <div>Date</div>
                                    </div>
                                    {[
                                        { company: 'Vercel', pos: 'Senior Engineer', status: 'Interview', color: 'warning' },
                                        { company: 'Linear', pos: 'Frontend Dev', status: 'Applied', color: 'default' },
                                        { company: 'Stripe', pos: 'Full Stack', status: 'Offered', color: 'success' },
                                    ].map((row, i) => (
                                        <div key={i} className="grid grid-cols-4 gap-4 p-3 border-t border-white/5 text-sm">
                                            <div className="text-foreground font-medium">{row.company}</div>
                                            <div className="text-default-400">{row.pos}</div>
                                            <div>
                                                <span className={`px-2 py-0.5 rounded-full text-xs bg-${row.color}/20 text-${row.color === 'default' ? 'default-400' : row.color}`}>
                                                    {row.status}
                                                </span>
                                            </div>
                                            <div className="text-default-500">Jan {15 + i}, 2024</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
