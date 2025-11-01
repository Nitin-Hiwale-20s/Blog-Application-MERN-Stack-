import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaMoon, FaSun } from "react-icons/fa";
import { Search } from "lucide-react";

import logo from "../assets/logoNH.jpg";
import userLogo from "../assets/user.jpg";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { toggleTheme } from "../redux/themeSlice";
import { setUser } from "../redux/authSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from "./ui/ResponsiveMenu"; // Make sure this path is correct

const Navebar = () => {
  const { user } = useSelector((store) => store.auth);
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [openNav, setOpenNav] = useState(false);

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="py-2 fixed w-full z-50 bg-white dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-600">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0">
        {/* Logo + Search */}
        <div className="flex gap-7 items-center">
          <Link to="/">
            <div className="flex gap-2 items-center">
              <img
                src={logo}
                alt="Logo"
                className="w-7 h-7 md:w-10 md:h-10 dark:invert"
              />
              <h1 className="font-bold text-2xl md:text-3xl">Blog</h1>
            </div>
          </Link>

          <div className="relative hidden md:block">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[300px] border border-gray-700 dark:bg-gray-300"
            />
            <Button
              onClick={handleSearch}
              className="absolute right-0 top-0 rounded-l-none"
            >
              <Search />
            </Button>
          </div>
        </div>

        {/* Nav links + actions */}
        <nav className="flex items-center gap-4 md:gap-7">
          <ul className="hidden md:flex gap-7 items-center text-xl font-semibold">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>

          <Button onClick={() => dispatch(toggleTheme())}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </Button>

          {!user ? (
            <div className="ml-4 md:flex gap-2">
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/signup" className="hidden md:block">
                <Button>Signup</Button>
              </Link>
            </div>
          ) : (
            <div className="ml-4 flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user.photoUrl || userLogo} />
                    <AvatarFallback>
                      {user?.firstName?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard/profile")}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard/your-blogs")}
                  >
                    Your Blogs
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard/camments")}
                  >
                    Camments
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard/creat-blog")}
                  >
                    Write Blog
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    LogOut
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <span className="text-lg font-medium hidden md:block">
                Welcome, {user.firstName}
              </span>
              <Button className="hidden md:block " onClick={logoutHandler}>
                Logout
              </Button>
            </div>
          )}
          {openNav ? (
            <HiMenuAlt3
              onClick={toggleNav}
              className="w-7 h-7 md:hidden cursor-pointer"
            />
          ) : (
            <HiMenuAlt1
              onClick={toggleNav}
              className="w-7 h-7 md:hidden cursor-pointer"
            />
          )}
        </nav>
        
        {/* ** THIS IS THE UPDATED PART ** */}
        <ResponsiveMenu
          openNav={openNav}
          setOpenNav={setOpenNav}
          logoutHandler={logoutHandler}
          user={user}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          navigate={navigate}
        />
      </div>
    </div>
  );
};

export default Navebar;