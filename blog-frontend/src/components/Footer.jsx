import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-[#1e1e2e] text-white py-8 px-4 w-full mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white">Penora</h2>
          <p className="text-sm text-gray-400 mt-1">
            Empowering creators & developers.
          </p>
        </div>

        <div className="flex space-x-6 text-xl text-gray-400">
          <a 
            href="https://github.com/yourusername" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition relative group"
            aria-label="GitHub"
          >
            <FaGithub />
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              GitHub
            </span>
          </a>
          <a 
            href="https://linkedin.com/in/yourprofile" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition relative group"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              LinkedIn
            </span>
          </a>
          <a 
            href="https://leetcode.com/yourprofile" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition relative group"
            aria-label="LeetCode"
          >
            <SiLeetcode />
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              LeetCode
            </span>
          </a>
          <a 
            href="mailto:shubhamsharma21505@gmail.com" 
            className="hover:text-red-400 transition relative group"
            aria-label="Email"
          >
            <FaEnvelope />
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Email
            </span>
          </a>
        </div>

        <div className="text-center md:text-right">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Penora. All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;