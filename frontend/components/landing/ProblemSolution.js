'use client';

import { motion } from 'framer-motion';
import { Frown, Smile, ArrowRight } from 'lucide-react';

export default function ProblemSolution() {
    return (
        <section className="py-24 bg-[#0D1117] relative overflow-hidden">
            {/* Subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        From Chaos to Clarity
                    </h2>
                    <p className="text-default-500 max-w-2xl mx-auto">
                        Job hunting is stressful enough. Your tracking system shouldn't add to it.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                    {/* Problem */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-red-500/20">
                                    <Frown className="w-6 h-6 text-red-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">The Problem</h3>
                            </div>

                            <ul className="space-y-4">
                                {[
                                    'Too many browser tabs, too many spreadsheets',
                                    'Follow-ups that fall through the cracks',
                                    'No single source of truth',
                                    'Mental overhead you don\'t need',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                                        <span className="text-default-400">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Arrow */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="p-3 rounded-full bg-[#161B22] border border-white/10">
                            <ArrowRight className="w-6 h-6 text-primary" />
                        </div>
                    </div>

                    {/* Solution */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-green-500/20">
                                    <Smile className="w-6 h-6 text-green-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">The Solution</h3>
                            </div>

                            <ul className="space-y-4">
                                {[
                                    'One interface that tracks everything',
                                    'Status changes, from applied to offer',
                                    'Search and filter in seconds',
                                    'Less noise, more focus',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                                        <span className="text-default-400">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
