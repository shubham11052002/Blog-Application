import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-[#1e1e2e] text-white py-12 border-t border-gray-700">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Products</h2>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-indigo-400 transition duration-300">Flutter</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition duration-300">React</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition duration-300">Android</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition duration-300">iOS</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Design to Code</h2>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-indigo-400 transition duration-300">Figma Plugin</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition duration-300">Templates</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Comparison</h2>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-indigo-400 transition duration-300">DhiWise vs Anima</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition duration-300">DhiWise vs Appsmith</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition duration-300">DhiWise vs FlutterFlow</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition duration-300">DhiWise vs Monday Hero</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition duration-300">DhiWise vs Retool</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition duration-300">DhiWise vs Bubble</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition duration-300">DhiWise vs Figma Dev Mode</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Connect</h2>
          <div className="flex space-x-4 text-gray-400 text-xl">
            <a href="#"><FaGithub className="hover:text-white transition" /></a>
            <a href="#"><FaLinkedin className="hover:text-white transition" /></a>
            <a href="#"><BsYoutube className="hover:text-white transition" /></a>
          </div>
          <p className="mt-6 text-sm text-gray-500">© {new Date().getFullYear()} Penora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
