import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import b1 from "../../../public/b1.avif";
import b2 from "../../../public/b2.jpg";
import b3 from "../../../public/b3.avif";
import BlogCard from "./BlogCart";

const Blog = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const blogs = [
    {
      image: b1,
      title: "Boost Your Immune System with Sports",
      date: "October 2, 2024",
      comments: 5,
      description:
        "Discover how regular sports activities can strengthen your immune system and improve your overall health.",
      category: "Health & Wellness",
    },
    {
      image: b2,
      title: "Top 5 Exercises for Better Endurance",
      date: "October 1, 2024",
      comments: 8,
      description:
        "Explore these five key exercises to increase your stamina and endurance for sports and fitness activities.",
      category: "Fitness Training",
    },
    {
      image: b3,
      title: "Stay Active During the Off-Season & Tips",
      date: "September 28, 2024",
      comments: 3,
      description:
        "Even during the off-season, staying active is essential. Learn how to maintain your fitness year-round.",
      category: "Lifestyle Tips",
    },
  ];

  return (
    <div className="py-12">
      <h2 className="text-4xl mx-auto text-orange-600 max-w-xl font-bold text-center mb-8">
        Stay Updated with Our Latest Fitness & Sports Articles
      </h2>
      <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
        Keep up with the latest trends, tips, and insights in sports, fitness,
        and wellness. From expert advice to beginner-friendly guides, we have
        something for everyone.
      </p>
      <div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 ">
            {blogs.map((blog, index) => (
              <div key={index} data-aos="fade-up" data-aos-delay={index * 200}>
                <BlogCard
                  image={blog.image}
                  title={blog.title}
                  date={blog.date}
                  comments={blog.comments}
                  description={blog.description}
                  category={blog.category}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
