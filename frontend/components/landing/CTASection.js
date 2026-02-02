'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

export default function CTASection() {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    const handleCTA = () => {
        if (isAuthenticated) {
            router.push('/dashboard');
        } else {
            router.push('/auth/signup');
        }
    };

    return (
        <section className="py-24 bg-[#0D1117] relative overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-primary/20 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                        Stop losing track.
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                            Start now.
                        </span>
                    </h2>
                    <p className="text-lg text-default-500 max-w-xl mx-auto mb-10">
                        Free to use. Takes 30 seconds to start.
                    </p>

                    {!loading && (
                        <Button
                            size="lg"
                            color="primary"
                            onPress={handleCTA}
                            endContent={<ArrowRight className="w-5 h-5" />}
                            className="font-semibold px-10 h-14 text-lg"
                        >
                            {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
                        </Button>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
