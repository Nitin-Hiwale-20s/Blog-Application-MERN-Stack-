import React, { useState } from 'react';
import auth from "../assets/auth.jpg";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { EyeOff, Eye } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );

      if (res.data.success) {
        // console.log("Server Response:", res.data); 
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex h-screen md:pt-14 md:h-[760px]">
      <div className="hidden md:block ">
        <img
          src={auth}
          alt="Auth Illustration"
          className="h-[700px]"
        />
      </div>
      <div className="flex justify-center items-center w-full md:w-1/2 px-4 md:px-0">
        <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-xl font-semibold">Create an Account</h1>
            </CardTitle>
            <p className="mt-2 text-sm font-serif text-center dark:text-gray-300">
              Enter your details below to create your account
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    className="dark:border-gray-600 dark:bg-gray-900"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    className="dark:border-gray-600 dark:bg-gray-900"
                    value={user.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  name="email"
                  className="dark:border-gray-600 dark:bg-gray-900"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <Label>Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className="dark:border-gray-600 dark:bg-gray-900 pr-10"
                  value={user.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-6 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <Button type="submit" className="w-full">Sign up</Button>
              <p className="text-center">
                Already have an account?
                <Link to="/login"><span className="underline"> Sign in</span></Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
