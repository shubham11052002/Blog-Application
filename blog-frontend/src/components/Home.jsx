import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Card, CardBody, Skeleton } from "@nextui-org/react";
import { FiArrowRight, FiEdit3, FiSearch, FiTrendingUp, FiUsers, FiClock, FiChevronLeft, FiChevronRight, FiBookOpen, FiAward, FiBarChart2 } from "react-icons/fi";

const BlogCarousel = ({ blogs, isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); 
  const navigate = useNavigate();
  const itemsPerView = Math.min(4, blogs.length || 4);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex(prev => Math.min(blogs.length - itemsPerView, prev + 1));
  };

  const carouselVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      scale: 1.03,
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <div className="relative w-full overflow-hidden py-12">
      <div className="relative flex items-center">
        <motion.button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute left-0 z-10 p-3 rounded-full bg-[#7f5af0] hover:bg-[#6c4ac9] text-white shadow-lg transition-all ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
          }`}
          aria-label="Previous"
        >
          <FiChevronLeft className="text-xl" />
        </motion.button>

        <div className="w-full overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={carouselVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4"
            >
              {isLoading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    className="flex-1"
                  > <h5>{blogs.length}</h5>
                    <Card className="bg-[#1e1e2e] h-full border border-[#2a2a3a] rounded-2xl overflow-hidden">
                      <CardBody className="p-0">
                        <Skeleton className="w-full aspect-video rounded-b-none" />
                        <div className="p-6">
                          <Skeleton className="h-6 w-3/4 rounded mb-3" />
                          <Skeleton className="h-4 w-full rounded mb-2" />
                          <Skeleton className="h-4 w-5/6 rounded" />
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))
              ) : (
                blogs.slice(currentIndex, currentIndex + itemsPerView).map((blog, index) => (
                  <motion.div
                    key={blog._id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    variants={itemVariants}
                    className="flex-1"
                  >  
                 
                    <Link to={`/blogs/${blog._id}`} className="block h-full group">
                      <Card className="bg-[#1e1e2e] text-white h-full border border-[#2a2a3a] rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-[#7f5af0] group-hover:shadow-xl group-hover:shadow-[#7f5af0]/20">
                        <CardBody className="p-0">
                          <div className="relative overflow-hidden aspect-video">
                            <motion.img
                              src={blog.blogImage?.url || "/default-blog.jpg"}
                              alt={blog.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              initial={{ opacity: 0.9 }}
                              whileHover={{ opacity: 1, scale: 1.1 }}
                              transition={{ duration: 0.5 }}
                              onError={(e) => {
                                e.target.src = "/default-blog.jpg";
                              }}
                            />
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 flex items-end p-6"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <span className="text-white text-sm font-medium bg-[#7f5af0] px-3 py-1 rounded-full">
                                Read full story
                              </span>
                            </motion.div>
                          </div>
                          <div className="p-6">
                            <div className="flex items-center mb-4">
                              <motion.span 
                                className="text-xs font-medium px-3 py-1 bg-[#7f5af0]/20 text-[#7f5af0] rounded-full"
                                whileHover={{ scale: 1.05 }}
                              >
                                {blog.category || "General"}
                              </motion.span>
                              <span className="text-xs text-gray-500 ml-auto flex items-center">
                                <FiClock className="mr-1" />
                                {new Date(blog.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 line-clamp-2 leading-tight">
                              {blog.title}
                            </h3>
                            <p className="text-sm text-gray-400 line-clamp-3 mb-5">
                              {blog.about}
                            </p>
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#2a2a3a]">
                              <div className="flex items-center text-[#7f5af0] text-sm font-medium transition-colors group-hover:text-white">
                                <FiBookOpen className="mr-2" />
                                {Math.ceil(blog.about.split(' ').length / 200)} min read
                              </div>
                              <motion.div 
                                className="text-[#7f5af0] group-hover:text-white"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 500 }}
                              >
                                <FiArrowRight className="text-lg" />
                              </motion.div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Link>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.button
          onClick={handleNext}
          disabled={currentIndex >= blogs.length - itemsPerView}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute right-0 z-10 p-3 rounded-full bg-[#7f5af0] hover:bg-[#6c4ac9] text-white shadow-lg transition-all ${
            currentIndex >= blogs.length - itemsPerView ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
          }`}
          aria-label="Next"
        >
          <FiChevronRight className="text-xl" />
        </motion.button>
      </div>

      {!isLoading && blogs.length > itemsPerView && (
        <motion.div 
          className="flex justify-center mt-10 space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Array.from({ length: Math.ceil(blogs.length / itemsPerView) }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex / itemsPerView ? 1 : -1);
                setCurrentIndex(index * itemsPerView);
              }}
              whileHover={{ scale: 1.2 }}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex >= index * itemsPerView && currentIndex < (index + 1) * itemsPerView 
                  ? 'bg-[#7f5af0] w-6' 
                  : 'bg-[#3a3a4a] hover:bg-[#4a4a5a]'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </motion.div>
      )}
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
        setBlogs(data.blogs.filter(blog => blog.title && blog.about));
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
    <div className=" bg-gradient-to-b from-[#0f0f1c] to-[#161627] text-white font-sans ">
      <section className="relative px-6 md:px-1 py-24 md:py-32 max-w-7xl mx-auto">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.15 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7f5af0] rounded-full filter blur-[100px]"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.15 }}
            transition={{ duration: 3, delay: 0.3, ease: "easeOut" }}
            className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#2cb67d] rounded-full filter blur-[100px]"
          />
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="flex-1 space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-5 py-2.5 bg-[#7f5af0]/10 text-[#7f5af0] rounded-full text-sm font-medium backdrop-blur-md border border-[#7f5af0]/20"
            >
              <FiTrendingUp className="mr-2 text-lg" />
              Trending platform for creators
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7f5af0] via-[#9370ff] to-[#2cb67d]">
                Unleash Your Creativity
              </span> With <b><i>Penora</i></b>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 max-w-2xl leading-relaxed"
            >
              The ultimate platform for writers and content creators to share their stories with the world. Join our community of passionate creators today.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              <Button 
                onClick={handleCreatePost}
                color="primary" 
                size="lg"
                radius="full"
                className="text-lg font-semibold px-10 py-6 bg-gradient-to-r from-[#7f5af0] to-[#6c4ac9] shadow-xl hover:shadow-[#7f5af0]/40 transition-all"
                startContent={<FiEdit3 className="text-xl" />}
              >
                Start Writing Now
              </Button>
              <Button
                as={Link}
                to="/blogs"
                variant="flat"
                size="lg"
                radius="full"
                className="text-lg font-semibold px-10 py-6 bg-[#2a2a3a] text-white border-2 border-[#3a3a4a] hover:bg-[#3a3a4a] hover:border-[#4a4a5a] transition-all"
                startContent={<FiSearch className="text-xl" />}
              >
                Explore Articles
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-8 pt-8"
            >
              <div className="flex items-center">
                <div className="p-3 bg-[#7f5af0]/10 rounded-full mr-4">
                  <FiUsers className="text-2xl text-[#7f5af0]" />
                </div>
                <div>
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-gray-400 text-sm">Active Readers</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="p-3 bg-[#2cb67d]/10 rounded-full mr-4">
                  <FiAward className="text-2xl text-[#2cb67d]" />
                </div>
                <div>
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-gray-400 text-sm">Featured Writers</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="p-3 bg-[#9370ff]/10 rounded-full mr-4">
                  <FiBarChart2 className="text-2xl text-[#9370ff]" />
                </div>
                <div>
                  <div className="text-2xl font-bold ">1M+</div>
                  <div className="text-gray-400 text-sm">Monthly Views</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="flex-1 flex justify-center"
          >
            <div className="relative w-full max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute -inset-6 bg-gradient-to-r from-[#7f5af0] to-[#2cb67d] rounded-3xl opacity-20 blur-2xl"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="relative overflow-hidden rounded-2xl border-2 border-[#3a3a4a] shadow-2xl hover:border-none hover:shadow-none hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-[#7f5af0]/30 "
              >
                
                <img src="/blog_image.png" alt="Blog showcase" className="w-full h-auto" loading="eager" />

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6"
                >
                  <div className="text-white text-xl font-bold ">Featured Story</div>
                  <div className="text-gray-300 mt-1">Discover trending content from our community</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <div className="text-[#7f5af0] font-medium mb-2 flex items-center">
                <div className="w-4 h-0.5 bg-[#7f5af0] mr-2"></div>
                TRENDING STORIES
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Discover Popular <span className="text-[#7f5af0]">Content</span>
              </h2>
              <p className="text-gray-400 mt-3 max-w-2xl">
                Explore the most engaging and popular stories from our creative community
              </p>
            </div>
            <Button
              as={Link}
              to="/blogs"
              variant="flat"
              size="lg"
              radius="full"
              className="text-md font-medium px-8 bg-[#2a2a3a] text-white border-2 border-[#3a3a4a] hover:bg-[#3a3a4a] hover:border-[#4a4a5a] transition-all"
              endContent={<FiArrowRight className="ml-1" />}
            >
              View All Articles
            </Button>
          </div>
          
          <AnimatePresence mode="wait">
          <i className="flex justify-center items-center"><b >Total Number of blogs : {blogs.length}</b></i>
                   <BlogCarousel blogs={blogs} isLoading={isLoading} />
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Value Proposition */}
      <section className="bg-[#161627] py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="text-[#7f5af0] font-medium mb-3">WHY CHOOSE US</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The <span className="text-[#7f5af0]">Ultimate</span> Platform for Creators
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              We provide everything you need to focus on your creativity and grow your audience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <FiUsers className="text-4xl text-[#7f5af0]" />,
                title: "Engaged Community",
                description: "Connect with thousands of active readers who appreciate quality content and provide valuable feedback.",
                bg: "bg-[#7f5af0]/10"
              },
              {
                icon: <FiEdit3 className="text-4xl text-[#2cb67d]" />,
                title: "Powerful Tools",
                description: "Our advanced editor and analytics help you create better content and understand your audience.",
                bg: "bg-[#2cb67d]/10"
              },
              {
                icon: <FiBarChart2 className="text-4xl text-[#9370ff]" />,
                title: "Growth Opportunities",
                description: "Monetization options and promotion features to help you grow your personal brand.",
                bg: "bg-[#9370ff]/10"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl bg-[#1e1e2e] border border-[#2a2a3a] hover:border-[#7f5af0]/50 transition-all"
              >
                <div className={`w-16 h-16 ${feature.bg} rounded-xl flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-r from-[#0f0c29] via-[#2a0845] to-[#0f0c29]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Share Your <span className="text-[#7f5af0]">Story</span> With the World?
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-3xl mx-auto">
              Join thousands of creators who are already building their audience on Penora
            </p>
            <Button 
              onClick={handleCreatePost}
              color="primary" 
              size="lg"
              radius="full"
              className="text-lg font-semibold px-12 py-7 bg-gradient-to-r from-[#7f5af0] to-[#9370ff] shadow-xl hover:shadow-[#7f5af0]/50 transition-all"
              startContent={<FiEdit3 className="text-xl" />}
            >
              Start Writing Today
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;