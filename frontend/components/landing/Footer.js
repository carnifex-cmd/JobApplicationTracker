'use client';

import { Briefcase, Github, Mail } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 bg-[#0D1117] border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Briefcase className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-semibold text-foreground">Job Tracker</span>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-default-500 hover:text-foreground transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            GitHub
                        </a>
                        <a
                            href="mailto:hello@jobtracker.app"
                            className="flex items-center gap-2 text-sm text-default-500 hover:text-foreground transition-colors"
                        >
                            <Mail className="w-4 h-4" />
                            Contact
                        </a>
                        <a
                            href="/privacy"
                            className="text-sm text-default-500 hover:text-foreground transition-colors"
                        >
                            Privacy
                        </a>
                    </div>

                    {/* Copyright */}
                    <p className="text-sm text-default-500">
                        © {currentYear} Job Tracker. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
