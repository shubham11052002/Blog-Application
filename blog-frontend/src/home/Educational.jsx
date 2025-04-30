import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Educational = () => {
  const { blogs } = useAuth();
  const educationalBlogs = Array.isArray(blogs)
    ? blogs.filter((blog) => blog?.category === "Education")
    : [];
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className="container mx-auto my-12 p-4">
      <h1 className="text-2xl font-bold mb-6">Educational</h1>
      <p className="text-center mb-8">
      Education empowers individuals, enriches minds, and shapes a brighter future.
      </p>

      {educationalBlogs.length > 0 ? (
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          keyBoardControl
          showDots={false}
          itemClass="px-2"
        >
          {educationalBlogs.slice(0, 6).map((blog, index) => (
            <div key={index} className="p-2">
              <Link
                to={`/blog/${blog._id}`}
                className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300 block"
              >
                <img
                  src={blog?.blogImage?.url || "/fallback.jpg"}
                  alt={blog?.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-lg font-semibold">{blog?.title}</h2>
                  <p className="text-sm">{blog?.category}</p>
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="flex h-40 items-center justify-center">Loading...</div>
      )}
    </div>
  );
};

export default Educational;
