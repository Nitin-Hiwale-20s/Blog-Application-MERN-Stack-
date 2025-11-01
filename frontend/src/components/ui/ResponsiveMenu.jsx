import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const ResponsiveMenu = () => {
  const { user } = useSelector((store) => store.auth);
  const [openNav, setOpenNav] = useState(false);

  return (
    <div
      className={`${
        openNav ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-800 px-8 pb-6 pt-16 text-black dark:text-gray-100 md:hidden rounded-r-xl shadow-md transition-all`}
    >
      <div>
        <div className="flex items-center justify-start gap-3">
          {user ? (
            <Avatar className="w-14 h-14">
              {/* AvatarImage has no size prop, style via className */}
              <AvatarImage
                src={user.photoUrl}
                className="w-14 h-14 rounded-full object-cover"
              />
            </Avatar>
          ) : (
            <FaUserCircle size={50} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
