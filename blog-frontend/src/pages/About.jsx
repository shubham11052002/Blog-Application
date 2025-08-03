import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCode, FaServer, FaCloud, FaLightbulb, FaUserTie, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

function About() {
  const [profile, setProfile] = useState([]);
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/my-profile`, {
          withCredentials: true,
        });
        setProfile([data.user]);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchAdmins();
  }, [baseURL]);

  const socialLinks = [
    {
      icon: <FaGithub />,
      name: "GitHub",
      url: "https://github.com/yourusername",
    },
    {
      icon: <FaLinkedin />,
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourprofile",
    },
    {
      icon: <SiLeetcode />,
      name: "LeetCode",
      url: "https://leetcode.com/yourprofile",
    }
  ];

  return (
    <div className="min-h-[500px] flex items-center justify-center px-4 py-12 mt-7 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-gray-200 dark:border-gray-700">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 md:p-10 flex flex-col"
        >
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">About Me</h2>
            {profile.map((user, idx) => (
              <p key={idx} className="text-blue-100 mb-8">
                Hello, I'm <span className="font-semibold text-black">{user.name}</span>, a passionate full-stack developer dedicated to creating exceptional digital experiences.
              </p>
            ))}

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-full">
                  <FaCode className="text-lg" />
                </div>
                <div>
                  <h3 className="font-medium">Full-Stack Development</h3>
                  <p className="text-blue-100 text-sm">1+ years experience</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-full">
                  <FaServer className="text-lg" />
                </div>
                <div>
                  <h3 className="font-medium">System Architecture</h3>
                  <p className="text-blue-100 text-sm">Scalable solutions</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-full">
                  <FaLightbulb className="text-lg" />
                </div>
                <div>
                  <h3 className="font-medium">Problem Solving</h3>
                  <p className="text-blue-100 text-sm">Clean, efficient code</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8"
          >
            <h3 className="text-sm font-semibold text-blue-100 mb-3">CONNECT WITH ME</h3>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full relative group"
                  aria-label={social.name}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-8 md:p-10 space-y-8"
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <FaCode className="text-lg" />
              </div>
              Technical Expertise
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Frontend Development</h4>
                <div className="flex flex-wrap gap-2">
                  {["React.js", "Angular", "Vue.js", "HTML5", "CSS3", "TailwindCSS"].map((tech, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ y: -2 }}
                      className="px-3 py-1 bg-gray-100 text-white dark:bg-gray-700 rounded-full text-sm hover:bg-white hover:text-black transition duration-400"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Backend Development</h4>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "Express.js", "Django", "MongoDB", "PostgreSQL"].map((tech, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ y: -2 }}
                      className="px-3 py-1 bg-gray-100 text-white dark:bg-gray-700 rounded-full text-sm  hover:bg-white hover:text-black transition duration-400"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <FaUserTie className="text-lg" />
              </div>
              Professional Highlights
            </h3>
            <ul className="space-y-3">
              {[
                "Built and deployed 15+ production applications with clean architecture",
                "Led team of 5 developers in agile environment",
                "Reduced deployment times by 40% through CI/CD optimization"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  whileHover={{ x: 5 }}
                  className="flex items-start text-gray-600 dark:text-gray-300"
                >
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <FaLightbulb className="text-lg" />
              </div>
              Development Philosophy
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              I believe in writing clean, maintainable code that balances technical excellence with user experience. My solutions focus on scalability, performance, and intuitive design.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;