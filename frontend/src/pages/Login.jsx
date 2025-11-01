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
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice'; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUserState] = useState({ email: '', password: '' });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt:", user);

    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/login", user, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user)); 
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen md:pt-14 md:h-[760px]">
      <div className="hidden md:block ">
        <img src={auth} alt="Auth Illustration" className="h-[700px]" />
      </div>
      <div className="flex justify-center items-center w-full md:w-1/2 px-4 md:px-0">
        <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-xl font-semibold">Login into your account</h1>
            </CardTitle>
            <p className="mt-2 text-sm font-serif text-center dark:text-gray-300">
              Enter your details below to login
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={user.email}
                  onChange={handleChange}
                  className="dark:border-gray-600 dark:bg-gray-900"
                />
              </div>

              <div className="relative">
                <Label>Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChange}
                  className="dark:border-gray-600 dark:bg-gray-900 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-6 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <Button type="submit" className="w-full">Login</Button>
              <p className="text-center">
                Don't have an account?
                <Link to="/signup"><span className="underline"> Sign up</span></Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
