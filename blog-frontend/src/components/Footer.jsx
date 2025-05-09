import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-100 py-12 border-t">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
          {/* Column 1 */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Products</h2>
            <ul className="space-y-2 text-gray-600">
              {["Flutter", "React", "Android", "iOS"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-indigo-700 hover:underline transition duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Design to Code</h2>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-indigo-700 hover:underline transition duration-300">
                  Figma Plugin
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-700 hover:underline transition duration-300">
                  Templates
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Comparison</h2>
            <ul className="space-y-2 text-gray-600">
              {[
                "DhiWise vs Anima",
                "DhiWise vs Appsmith",
                "DhiWise vs FlutterFlow",
                "DhiWise vs Monday Hero",
                "DhiWise vs Retool",
                "DhiWise vs Bubble",
                "DhiWise vs Figma Dev Mode",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-indigo-700 hover:underline transition duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Company</h2>
            <ul className="space-y-2 text-gray-600">
              {["About Us", "Contact Us", "Career", "Terms of Service", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-indigo-700 hover:underline transition duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className="bg-white py-6 border-t">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          {/* Brand */}
          <div className="text-xl font-bold text-gray-700 mb-4 md:mb-0">
            Penora ⚡
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500 text-center md:text-left mb-4 md:mb-0">
            © 2024 ShubhamSharma PVT. LTD. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-5">
            <a
              href="https://github.com/shubham11052002/Blog-Application"
              className="text-gray-600 hover:text-black transform hover:scale-110 transition duration-300"
              title="GitHub"
            >
              <FaGithub size={28} />
            </a>
            <a
              href="http://youtube.com"
              className="text-gray-600 hover:text-red-600 transform hover:scale-110 transition duration-300"
              title="YouTube"
            >
              <BsYoutube size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/shubham-sharma-139190341?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className="text-gray-600 hover:text-blue-700 transform hover:scale-110 transition duration-300"
              title="LinkedIn"
            >
              <FaLinkedin size={28} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
