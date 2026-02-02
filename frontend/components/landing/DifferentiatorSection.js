'use client';

import { motion } from 'framer-motion';
import { Code, Heart, Lock } from 'lucide-react';

const differentiators = [
    {
        icon: Code,
        title: 'Built for Developers',
        description:
            'No fluff, no gamification. A clean, keyboard-friendly interface that respects how you work.',
    },
    {
        icon: Heart,
        title: 'Personal & Focused',
        description:
            'This is your private workspace. Track applications your way, without distractions.',
    },
    {
        icon: Lock,
        title: 'Privacy by Default',
        description:
            'Your job search data stays on your terms. No analytics, no tracking, no third parties.',
    },
];

export default function DifferentiatorSection() {
    return (
        <section id="why-different" className="py-24 bg-[#0D1117] relative overflow-hidden">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Why This Feels Different
                    </h2>
                    <p className="text-default-500 max-w-2xl mx-auto">
                        Not another bloated app. Just a focused tool that does one thing well.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {differentiators.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="text-center"
                            >
                                <div className="inline-flex p-4 rounded-2xl bg-[#161B22] border border-white/5 mb-6">
                                    <Icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-default-500 leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
