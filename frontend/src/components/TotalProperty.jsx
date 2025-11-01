
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { BarChart3, Eye, MessageSquare, ThumbsUp } from "lucide-react";
// import { setBlog } from "../redux/blogSlice"; // <-- make sure you import your action

// const TotalProperty = () => {
//   const { blog } = useSelector((store) => store.blog);
//   const [totalComments, setTotalComments] = useState(0);
//   const [totalLikes, setTotalLikes] = useState(0);
//   const dispatch = useDispatch();

//   const getOwnBlog = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:8000/api/v1/blog/get-own-blogs`,
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         dispatch(setBlog(res.data.blogs));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getTotalComments = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:8000/api/v1/comment/my-blogs/comments`,
//         { withCredentials: true }
//       );
//       if (res.data.totalComments) {
//         setTotalComments(res.data.totalComments);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getTotalLikes = async () => {
//     try {
//       const res = await axios.get(
//         // `http://localhost:8000/api/v1/blog/my-blogs/like`,
//            `http://localhost:8000/api/v1/blog/my-blogs/likes`,
//         { withCredentials: true }
//       );
//       if (res.data.totalLikes) {
//         setTotalLikes(res.data.totalLikes);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getOwnBlog();
//     getTotalComments();
//     getTotalLikes();
//   }, []);

//   const stats = [
//     {
//       title: "Total Views",
//       value: "24.8K",
//       icon: Eye,
//       change: "+12%",
//       trend: "up",
//     },
//     {
//       title: "Total Blogs",
//       value: blog?.length || 0,
//       icon: BarChart3,
//       change: "+4%",
//       trend: "up",
//     },
//     {
//       title: "Comments",
//       value: totalComments,
//       icon: MessageSquare,
//       change: "+18%",
//       trend: "up",
//     },
//     {
//       title: "Likes",
//       value: totalLikes,
//       icon: ThumbsUp,
//       change: "+7%",
//       trend: "up",
//     },
//   ];

//   return (
//     <div className="md:p-10 p-4">
//       <div className="flex flex-col md:flex-row justify-around gap-3 md:gap-7">
//         {stats.map((stat) => (
//           <Card key={stat.title} className="w-full dark:bg-gray-800">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2">
//               <stat.icon className="h-4 w-4 text-muted-foreground mr-2" />
//               <CardTitle className="text-sm font-medium">
//                 {stat.title}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stat.value}</div>
//               <p
//                 className={`text-xs ${
//                   stat.trend === "up" ? "text-green-500" : "text-red-500"
//                 }`}
//               >
//                 {stat.change} from last month
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TotalProperty;









import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart3, Eye, MessageSquare, ThumbsUp } from "lucide-react";
import { setBlog } from "../redux/blogSlice";

// Axios instance with credentials
const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, // cookie-based auth
});

const TotalProperty = () => {
  const { blog } = useSelector((store) => store.blog);
  const [totalComments, setTotalComments] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const dispatch = useDispatch();

  // Fetch own blogs
  const getOwnBlog = async () => {
    try {
      const res = await api.get("/blog/get-own-blogs");
      if (res.data.success) {
        dispatch(setBlog(res.data.blogs));
      }
    } catch (error) {
      console.error("Error fetching own blogs:", error);
    }
  };

  // Fetch total comments
  const getTotalComments = async () => {
    try {
      const res = await api.get("/comment/my-blogs"); // backend route
      if (res.data.totalComments !== undefined) {
        setTotalComments(res.data.totalComments);
      }
    } catch (error) {
      console.error("Error fetching total comments:", error);
    }
  };

  // Fetch total likes
  const getTotalLikes = async () => {
    try {
      const res = await api.get("/blog/my-blogs/likes"); // backend route
      if (res.data.totalLikes !== undefined) {
        setTotalLikes(res.data.totalLikes);
      }
    } catch (error) {
      console.error("Error fetching total likes:", error);
    }
  };

  useEffect(() => {
    getOwnBlog();
    getTotalComments();
    getTotalLikes();
  }, []);

  const stats = [
    {
      title: "Total Views",
      value: "24.8K",
      icon: Eye,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Total Blogs",
      value: blog?.length || 0,
      icon: BarChart3,
      change: "+4%",
      trend: "up",
    },
    {
      title: "Comments",
      value: totalComments,
      icon: MessageSquare,
      change: "+18%",
      trend: "up",
    },
    {
      title: "Likes",
      value: totalLikes,
      icon: ThumbsUp,
      change: "+7%",
      trend: "up",
    },
  ];

  return (
    <div className="md:p-10 p-4">
      <div className="flex flex-col md:flex-row justify-around gap-3 md:gap-7">
        {stats.map((stat) => (
          <Card key={stat.title} className="w-full dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2">
              <stat.icon className="h-4 w-4 text-muted-foreground mr-2" />
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TotalProperty;

