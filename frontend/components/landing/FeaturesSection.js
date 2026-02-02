'use client';

import { motion } from 'framer-motion';
import {
    LayoutList,
    Search,
    Filter,
    Shield,
    CheckCircle,
    Clock,
    TrendingUp,
    Zap
} from 'lucide-react';

const features = [
    {
        icon: LayoutList,
        title: 'See Where Everything Stands',
        description: 'Applied, interviewing, offered, or rejected — visible at a glance, not buried in tabs.',
        color: 'primary',
    },
    {
        icon: Search,
        title: 'Find Any Application — Even Months Later',
        description: 'Search by company or role. Get results instantly, no matter how long ago you applied.',
        color: 'blue-500',
    },
    {
        icon: Filter,
        title: 'Cut Through the Noise',
        description: 'Filter by status, sort by date. Focus on what needs attention.',
        color: 'amber-500',
    },
    {
        icon: Shield,
        title: 'Your Data, Not Ours',
        description: 'No tracking, no analytics, no third-party access. Your job search stays private.',
        color: 'green-500',
    },
    {
        icon: Clock,
        title: 'Never Lose Track of Time',
        description: 'Know when you applied. Spot follow-up opportunities before they slip.',
        color: 'purple-500',
    },
    {
        icon: TrendingUp,
        title: 'Your Entire Search in One View',
        description: 'From applied to offer — see the full picture without tab-switching.',
        color: 'cyan-500',
    },
    {
        icon: Zap,
        title: 'Built to Stay Out of Your Way',
        description: 'No bloated features. Fast loads. Just what you came for.',
        color: 'yellow-500',
    },
    {
        icon: CheckCircle,
        title: 'Designed for People Who Prefer Tables',
        description: 'No cards, no drag-and-drop boards. A straightforward, dev-friendly table.',
        color: 'emerald-500',
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="py-24 bg-[#0D1117] relative">
            {/* Gradient accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        What You Actually Need
                    </h2>
                    <p className="text-default-500 max-w-2xl mx-auto">
                        Every feature here exists because spreadsheets failed us.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="h-full p-6 rounded-2xl bg-[#161B22] border border-white/5 hover:border-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                                    <div className={`inline-flex p-3 rounded-xl bg-${feature.color}/10 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className={`w-6 h-6 text-${feature.color}`} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-default-500 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Differentiator */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center text-sm text-default-400 mt-12 italic"
                >
                    Built during a real job search. Designed for mental clarity, not productivity theater.
                </motion.p>
            </div>
        </section>
    );
}
