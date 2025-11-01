import React from 'react';
import aboutImg from "../assets/About-blog.avif"

const About = () => {
  return (
    <div className=" min-h-screen pt-28 px-4 md:px-0 mb-7 ">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="md:text-5xl text-4xl font-extrabold  mb-4">
            About Our Blog
          </h1>
          <p className="text-lg ">
            A place to share thoughts, inspire others, and grow together.
          </p>
        </div>

        {/* Image + Text Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
          <img
            src={aboutImg}
            alt="Blog Illustration"
            className="w-full h-72 object-cover rounded-2xl shadow-md"
          />
          <div>
            <p className=" text-lg mb-4">
             Welcome to <span className="font-semibold text-indigo-600">Our Blog</span>!  
          We created this platform to share knowledge, ideas, and stories 
          with a global audience. Whether you're a tech enthusiast, writer, 
          or just someone who loves to learn, this is the place for you.
            </p>
            <p className=" text-lg mb-4">
              Our mission is to provide high-quality, insightful, and engaging 
          content that helps readers grow, stay informed, and get inspired.  
          We cover topics like technology, programming, lifestyle, and more.  
            </p>
            <p className=" text-lg">
              This blog is built using the latest web technologies such as 
          <span className="font-semibold text-indigo-600"> React.js</span> and 
          modern backend APIs. We believe in the power of open-source 
          learning and community-driven growth.
            </p>
             <p className=" text-lg">
               To become a trusted platform where developers, learners, and 
            thinkers come together to share their experiences, projects, 
            and knowledge with the world.
            </p>
           
            <p className=" text-lg">
              Thank you for being a part of our growing community.
            </p>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="mt-16 text-center">
          <blockquote className="text-2xl italic text-gray-500">
            "anytime. We’d love to hear from you!"
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default About;