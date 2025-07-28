import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "4262f9eb-749c-4317-9ae1-72144c65bcad",
      name: data.username,
      email: data.email,
      message: data.message,
      redirect: "https://yourdomain.com/thank-you",
    };
    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

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
    },
    {
      icon: <FaEnvelope />,
      name: "Email",
      url: "mailto:shubhamsharma21505@gmail.com",
    },
  ];

  return (
    <div className="min-h-[500px] flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900 mt-15">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-gray-200 dark:border-gray-700">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 md:p-10 flex flex-col">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Let's Connect</h2>
            <p className="text-blue-100 mb-8">
              Interested in collaborating or have questions? Reach out and I'll get back to you soon.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-full">
                  <FaEnvelope className="text-lg" />
                </div>
                <span>shubhamsharma21505@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-full">
                  <FaMapMarkerAlt className="text-lg" />
                </div>
                <span>Loni, Ghaziabad (201102)</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3, duration: 0.5 }}
  className="mt-8"
>
  <h3 className="text-sm font-semibold text-blue-100 mb-3">FIND ME ON</h3>
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
        <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-300 scale-0 group-hover:scale-100"></span>
      </motion.a>
    ))}
  </div>
</motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-8 md:p-10"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
            Send a Message
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                {...register("username", { required: "Name is required" })}
              />
              {errors.username && (
                <span className="text-sm text-red-500 font-medium">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && (
                <span className="text-sm text-red-500 font-medium">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                {...register("message", { 
                  required: "Message is required",
                  minLength: {
                    value: 20,
                    message: "Message must be at least 20 characters"
                  }
                })}
              />
              {errors.message && (
                <span className="text-sm text-red-500 font-medium">
                  {errors.message.message}
                </span>
              )}
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;