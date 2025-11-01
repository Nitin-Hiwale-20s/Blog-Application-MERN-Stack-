import React from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Play,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Logo & About */}
        <div>
          <h2 className="text-xl font-bold text-white">MyBlog</h2>
          <p className="mt-2 text-sm">
            A place to share knowledge, stories, and ideas with the world.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/blogs" className="hover:text-white">
                Blogs
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                FAQS
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://www.linkedin.com/in/nitin-hiwale-5409gn"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="w-5 h-5 hover:text-white" />
            </a>

            <a
              href="https://github.com/Nitin-Hiwale-20s"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="w-5 h-5 hover:text-white" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram className="w-5 h-5 hover:text-white" />
            </a>
            <a
              href="https://youtube.com/@nitinhiwale-96k?si=ixFe4CdzPk-VRmcU"
              target="_blank"
              rel="noreferrer"
            >
              <Play className="w-5 h-5 hover:text-white" />
            </a>
          </div>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-lg font-semibold text-white">Subscribe</h3>
          <p className="mt-2 text-sm">
            Get the latest blogs delivered to your inbox.
          </p>
          <form action="" className="mt-4 flex">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 rounded-l-md  text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-4 rounded-r-md hover:bg-red-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-sm text-gray-500 mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} MyBlog. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
