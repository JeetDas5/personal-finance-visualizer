"use client";

import { motion } from "framer-motion";

const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => {
    return (
        <section className="overflow-hidden pt-20 px-5">
            <div className="max-w-7xl mx-auto text-center space-y-6">

                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-5xl font-bold text-blue-700"
                >
                    Take Control of Your Finances
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
                >
                    Track your spending, manage your budgets, and gain valuable insights—all in one place.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "backOut" }}
                    onClick={onGetStarted}
                    className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition cursor-pointer shadow-lg"
                >
                    Get Started
                </motion.button>
            </div>
        </section>
    );
};

export default Hero;
