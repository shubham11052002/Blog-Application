import React from "react";
import { FaGithub } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="border py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">Products</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className=" p-4 mb-2 rounded-xl text-gray-600 cursor-pointer transition-all duration-700 ease-in-out hover:text-indigo-700 hover:scale-[1.02] hover:underline underline-offset-4">
                  Flutter
                </a>
              </li>
              <li>
                <a href="#" className=" p-4 mb-2 rounded-xl text-gray-600 cursor-pointer transition-all duration-700 ease-in-out hover:text-indigo-700 hover:scale-[1.02] hover:underline underline-offset-4">
                  React
                </a>
              </li>
              <li>
                <a href="#" className=" p-4 mb-2 rounded-xl text-gray-600 cursor-pointer transition-all duration-700 ease-in-out hover:text-indigo-700 hover:scale-[1.02] hover:underline underline-offset-4">
                  Android
                </a>
              </li>
              <li>
                <a href="#" className=" p-4 mb-2 rounded-xl text-gray-600 cursor-pointer transition-all duration-700 ease-in-out hover:text-indigo-700 hover:scale-[1.02] hover:underline underline-offset-4">
                  iOS
                </a>
              </li>
            </ul>
          </div>
          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">Design to code</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className=" p-4 mb-2 rounded-xl text-gray-600 cursor-pointer transition-all duration-700 ease-in-out hover:text-indigo-700 hover:scale-[1.02] hover:underline underline-offset-4">
                  Figma plugin
                </a>
              </li>
              <li>
                <a href="#" className=" p-4 mb-2 rounded-xl text-gray-600 cursor-pointer transition-all duration-700 ease-in-out hover:text-indigo-700 hover:scale-[1.02] hover:underline underline-offset-4">
                  Templates
                </a>
              </li>
            </ul>
          </div>

          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">Comparison</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className=" p-4 mb-2 rounded-xl text-gray-600 cursor-pointer transition-all duration-700 ease-in-out hover:text-indigo-700 hover:scale-[1.02] hover:underline underline-offset-4">
                  DhiWise vs Anima
                </a>
              </li>
              <li>
                <a href="#" className=" p-4 mb-2 rounded-xl text-gray-600 cursor-pointer transition-all duration-700 ease-in-out hover:text-indigo-700 hover:scale-[1.02] hover:underline underline-offset-4">
                  DhiWise vs Appsmith
                </a>
              </li>
              <li>
                <a href="#" className=" p-4 mb-2 rounded-xl text-gray-600 cursor-pointer transition-all duration-700 ease-in-out hover:text-indigo-700 hover:scale-[1.02] hover:underline underline-offset-4">
                  DhiWise vs FlutterFlow
                </a>
              </li>
              <li>
                <a href="#" className=" p-4 mb-2 rounded-xl text-gray-600 cursor-pointer transition-all duration-700 ease-in-out hover:text-indigo-700 hover:scale-[1.02] hover:underline underline-offset-4">
                  DhiWise vs Monday Hero
                </a>
              </li>
              <li>
                <a href="#" className=" p-4 mb-2 rounded-xl text-gray-600 cursor-pointer transition-all duration-700 ease-in-out hover:text-indigo-700 hover:scale-[1.02] hover:underline underline-offset-4">
                  DhiWise vs Retool
                </a>
              </li>

              <li>
                <a href="#" className=" p-4 mb-2 rounded-xl text-gray-600 cursor-pointer transition-all duration-700 ease-in-out hover:text-indigo-700 hover:scale-[1.02] hover:underline underline-offset-4">
                  DhiWise vs Bubble
                </a>
              </li>
              <li>
                <a href="#" className=" p-4 mb-2 rounded-xl text-gray-600 cursor-pointer transition-all duration-700 ease-in-out hover:text-indigo-700 hover:scale-[1.02] hover:underline underline-offset-4">
                  DhiWise vs Figma Dev Mode
                </a>
              </li>
            </ul>
          </div>
          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className=" p-4 mb-2 rounded-xl text-gray-600 cursor-pointer transition-all duration-700 ease-in-out hover:text-indigo-700 hover:scale-[1.02] hover:underline underline-offset-4">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className=" p-4 mb-2 rounded-xl text-gray-600 cursor-pointer transition-all duration-700 ease-in-out hover:text-indigo-700 hover:scale-[1.02] hover:underline underline-offset-4">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className=" p-4 mb-2 rounded-xl text-gray-600 cursor-pointer transition-all duration-700 ease-in-out hover:text-indigo-700 hover:scale-[1.02] hover:underline underline-offset-4">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className=" p-4 mb-2 rounded-xl text-gray-600 cursor-pointer transition-all duration-700 ease-in-out hover:text-indigo-700 hover:scale-[1.02] hover:underline underline-offset-4">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className=" p-4 mb-2 rounded-xl text-gray-600 cursor-pointer transition-all duration-700 ease-in-out hover:text-indigo-700 hover:scale-[1.02] hover:underline underline-offset-4">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className=" container mx-auto  flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-semibold hidden md:flex">
        Penora⚡
        </div>
        <div className=" text-sm hidden md:flex">
          <p>&copy; 2024 ShubhamSharma PVT. LTD. All rights reserved</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a href="https://github.com/shubham11052002/Blog-Application">
            <FaGithub className="h-6" />
          </a>
          <a href="http://youtube.com">
            <BsYoutube className="h-6" />
          </a>

          <a href="https://www.linkedin.com/in/shubham-sharma-139190341?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ">
            <FaLinkedin className="h-6" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;