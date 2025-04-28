"use client";

import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradiant-r from-blue-300 via-blue-200 to-blue-100 text-blue-800 py-8 px-5 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg font-semibold"
        >
          © {new Date().getFullYear()} Personal Finance Dashboard
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-6 text-sm"
        >
          <a href="https://github.com/JeetDas5" className="hover:underline">
            Github
          </a>
          <a href="https://www.linkedin.com/in/jeet-das-7633a52ab" className="hover:underline">
            LinkedIn
          </a>
          <a href="https://x.com/I_am_Jeet5" className="hover:underline">
            X
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm"
        >
          Made with 💙 by Jeet
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;
