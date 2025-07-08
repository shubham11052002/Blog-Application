import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";

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
          <a href="#" className="hover:text-indigo-400 transition">
            <FaGithub />
          </a>
          <a href="#" className="hover:text-indigo-400 transition">
            <FaLinkedin />
          </a>
          <a href="#" className="hover:text-indigo-400 transition">
            <BsYoutube />
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
