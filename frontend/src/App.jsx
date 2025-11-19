import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navebar from './components/Navebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import YourBlog from './pages/YourBlog';
import CreatBlog from './pages/CreatBlog';
import UpdateBlog from './pages/UpdateBlog';
import BlogView from './pages/BlogView';
import Footer from './components/ui/Footer';
import Comments from './pages/Comments';
import SearchList from './pages/SearchList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navebar /><Home /><Footer/></>
  },
  {
    path: "/blogs",
    element: <><Navebar /><Blogs /><Footer/></>
  },
  {
    path: "/about",
    element: <><Navebar /><About /><Footer/> </>
  },
   {
     path: "/login",
    element: <><Navebar/> <Login /></>
   },
    {
    path: "/search",  
    element: (
      <>
        <Navebar />
        <SearchList />
        <Footer />
      </>
    ),
  },
   
  {
    path: "/signup",
    element: <><Navebar /><Signup /></>
  },
   {
    path: "/blogs/:blogId",
    element: <><Navebar /><BlogView /></>
  },
  {
    path: "/dashboard",
    element: <><Navebar /><Dashboard /></>,
    children:[
      {
        path:"profile",
        element:<Profile/>
      },
      {
        path:"your-blogs",
        element:<YourBlog/>
      },
      {
        path:"camments",
        element:<Comments/>
      },
      {
        path:"creat-blog",
        element:<CreatBlog/>
      },
      {
        
        // path:"write-blog/:id",
        path:"write-blog/:id",
        element:<UpdateBlog/>
      },
    ]
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
