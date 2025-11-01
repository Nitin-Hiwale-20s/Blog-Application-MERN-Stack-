import React, { useEffect, useState } from "react";
import axios from "axios";
import userLogo from "../assets/user.jpg";

function PopularAuthors() {
  const [popularUser, setPopularUser] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/all-users`);
      if (res.data.success) {
        setPopularUser(res.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-4 items-center">
          <h1 className="text-3xl md:text-4xl font-bold pt-10">
            Popular Authors
          </h1>
          <hr className="w-14 text-center border-2 border-red-500" />
        </div>
      </div>

      <div className="flex items-center pb-10 justify-around my-10 px-4 md:px-0">
        {popularUser?.slice(0, 3)?.map((user, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <img
              src={user.photoUrl || userLogo}
              alt={user.firstName}
              className="rounded-full h-16 w-16 md:w-32 md:h-32"
            />
            <p className="font-semibold">
              {user.firstName} {user.lastName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularAuthors;
