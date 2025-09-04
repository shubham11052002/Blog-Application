import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardBody, Skeleton } from "@nextui-org/react";
import { FiArrowRight, FiClock, FiChevronLeft, FiChevronRight, FiBookOpen } from "react-icons/fi";

const BlogCarousel = ({ blogs, isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const itemsPerView = Math.min(4, blogs.length || 4);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => Math.min(blogs.length - itemsPerView, prev + 1));
  };

  const carouselVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
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
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
    hover: { y: -10, scale: 1.03, transition: { duration: 0.3 } },
    tap: { scale: 0.98 },
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
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"
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
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      className="flex-1"
                    >
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
                : blogs
                    .slice(currentIndex, currentIndex + itemsPerView)
                    .map((blog, index) => (
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
                                <p className="text-sm text-gray-400 line-clamp-3 mb-5">{blog.about}</p>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#2a2a3a]">
                                  <div className="flex items-center text-[#7f5af0] text-sm font-medium transition-colors group-hover:text-white">
                                    <FiBookOpen className="mr-2" />
                                    {Math.ceil(blog.about.split(" ").length / 200)} min read
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
                    ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.button
          onClick={handleNext}
          disabled={currentIndex >= blogs.length - itemsPerView}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute right-0 z-10 p-3 rounded-full bg-[#7f5af0] hover:bg-[#6c4ac9] text-white shadow-lg transition-all ${
            currentIndex >= blogs.length - itemsPerView ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }`}
          aria-label="Next"
        >
          <FiChevronRight className="text-xl" />
        </motion.button>
      </div>
    </div>
  );
};

export default BlogCarousel;
