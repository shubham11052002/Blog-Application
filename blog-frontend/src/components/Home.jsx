import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Card, CardBody, Skeleton } from "@nextui-org/react";
import { FiArrowRight, FiEdit3, FiSearch, FiTrendingUp, FiUsers, FiClock } from "react-icons/fi";

const BlogCarousel = ({ blogs, isLoading }) => {
  const [dragStartX, setDragStartX] = useState(null);
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate("/create");
  }

  const handleTouchStart = (e) => {
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (dragStartX !== null) {
      const dragEndX = e.changedTouches[0].clientX;
      const deltaX = dragEndX - dragStartX;
      if (Math.abs(deltaX) > 10) e.preventDefault();
    }
    setDragStartX(null);
  };

  return (
    <div className="w-full overflow-x-hidden py-8">
      <motion.div
        drag="x"
        dragConstraints={{ left: -1000, right: 100 }}
        dragElastic={0.05}
        className="flex gap-6 px-4"
      >
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="min-w-[300px] flex-1">
              <Card className="bg-[#1e1e2e] h-full border border-[#2a2a3a]">
                <CardBody className="p-6">
                  <Skeleton className="rounded-lg w-full aspect-video mb-4" />
                  <Skeleton className="h-6 w-3/4 rounded mb-3" />
                  <Skeleton className="h-4 w-full rounded mb-2" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                </CardBody>
              </Card>
            </div>
          ))
        ) : (
          blogs.slice(0, 8).map((blog) => (
            <motion.div
              key={blog._id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="min-w-[300px] flex-1"
            >
              <Link to={`/blogs/${blog._id}`} className="block h-full group">
                <Card className="bg-[#1e1e2e] text-white h-full border border-[#2a2a3a] transition-all duration-300 group-hover:border-[#7f5af0]/50">
                  <CardBody className="p-6">
                    <div className="relative overflow-hidden rounded-lg aspect-video mb-4">
                      <img
                        src={blog.blogImage?.url || "/default-blog.jpg"}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "/default-blog.jpg";
                        }}
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 leading-tight">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-3 mb-4">
                      {blog.about}
                    </p>
                    <div className="flex items-center text-[#7f5af0] text-sm font-medium mt-auto transition-colors group-hover:text-[#9370ff]">
                      Read article
                      <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${baseURL}/all-blogs`, {
          withCredentials: true,
        });
        setBlogs(data.blogs.filter(blog => blog.title && blog.about)); // Filter valid blogs
      } catch (error) {
        console.error("Failed to load blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchBlogs, 500);
    return () => clearTimeout(timer);
  }, [baseURL]);

  const handleCreatePost = () => {
    navigate("/create");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1c] to-[#161627] text-white font-sans">
      <section className="relative px-6 md:px-12 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#7f5af0]/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-[#2cb67d]/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center px-4 py-2 bg-[#7f5af0]/10 text-[#7f5af0] rounded-full text-sm font-medium backdrop-blur-sm">
              <FiTrendingUp className="mr-2" />
              Trending platform for creators
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7f5af0] to-[#2cb67d]">Content</span> Strategy
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
              Join thousands of creators publishing with Penora. Our platform offers powerful tools to help you create, distribute, and monetize your content.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
            <Button 
      onClick={handleCreatePost}
      color="primary" 
      size="lg" 
      radius="full"
      className="text-md font-medium px-8 bg-gradient-to-r from-[#7f5af0] to-[#6c4ac9] shadow-lg"
      startContent={<FiEdit3 className="text-lg" />}
    >
      Start Writing
    </Button>
              <Button
                as={Link}
                to="/blogs"
                variant="flat"
                size="lg"
                radius="full"
                className="text-md font-medium px-8 bg-[#2a2a3a] text-white border border-[#3a3a4a] hover:bg-[#3a3a4a]"
                startContent={<FiSearch className="text-lg" />}
              >
                Browse Articles
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="flex-1 flex justify-center"
          >
            <div className="relative w-full max-w-xl">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#7f5af0] to-[#2cb67d] rounded-3xl opacity-20 blur-xl"></div>
              <img
                src="https://illustrations.popsy.co/amber/writing.svg"
                alt="Content creation illustration"
                className="relative w-full rounded-lg"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Featured Publications
              </h2>
              <p className="text-gray-400 mt-2">
                Curated selection of our community's best work
              </p>
            </div>
            <Button
              as={Link}
              to="/blogs"
              variant="light"
              className="text-[#7f5af0] hover:text-[#9370ff]"
              endContent={<FiArrowRight className="ml-1" />}
            >
              View all content
            </Button>
          </div>
          
          <AnimatePresence mode="wait">
            <BlogCarousel blogs={blogs} isLoading={isLoading} />
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Value Proposition */}
      <section className="bg-[#161627] py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Creators Choose Penora
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Our platform is designed to help you focus on what matters most - creating amazing content.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiUsers className="text-3xl text-[#7f5af0] mb-4" />,
                title: "Engaged Audience",
                description: "Connect with thousands of active readers who are passionate about quality content."
              },
              {
                icon: <FiEdit3 className="text-3xl text-[#7f5af0] mb-4" />,
                title: "Powerful Editor",
                description: "Our intuitive writing tools help you craft beautiful stories with ease."
              },
              {
                icon: <FiClock className="text-3xl text-[#7f5af0] mb-4" />,
                title: "24/7 Availability",
                description: "Your content is always accessible to readers around the world."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="p-8 rounded-xl bg-[#1e1e2e] border border-[#2a2a3a] hover:border-[#7f5af0]/30 transition-all"
              >
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;