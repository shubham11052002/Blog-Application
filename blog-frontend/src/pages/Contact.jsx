import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "c660c9ce-c6f9-41f7-aa0f-8a24ea887b94",
      name: data.username,
      email: data.email,
      message: data.message,
    };
    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      toast.success("Message sent successfully");
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-12">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Contact Info Section */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-6">Let’s Talk 👋</h2>
            <p className="text-white/90 mb-10">
              Whether you have a question, want to collaborate, or just say hi —
              feel free to reach out. We'd love to hear from you!
            </p>
          </div>

          <ul className="space-y-5 text-white text-sm">
            <li className="flex items-center gap-3">
              <FaPhone className="text-xl text-white/90" />
              <span>+91 9876543210</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-xl text-white/90" />
              <span>help@learncoding.com</span>
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-xl text-white/90" />
              <span>Delhi, NCR, India</span>
            </li>
          </ul>
        </div>

        {/* Contact Form Section */}
        <div className="p-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Send a Message
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className="text-sm text-red-500 font-medium">
                  Name is required
                </span>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-500 font-medium">
                  Email is required
                </span>
              )}
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("message", { required: true })}
              />
              {errors.message && (
                <span className="text-sm text-red-500 font-medium">
                  Message is required
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition duration-300"
            >
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
