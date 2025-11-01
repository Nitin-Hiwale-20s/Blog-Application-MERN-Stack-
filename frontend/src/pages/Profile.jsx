// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // ✅ fixed
// import { Card } from "../components/ui/card";
// import React, { useState } from "react";
// import userLogo from "../assets/user.jpg";
// import {
//   FaFacebook,
//   FaGithub,
//   FaInstagram,
//   FaLinkedinIn,
// } from "react-icons/fa";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading, setUser } from "@/redux/authSlice";
// import axios from "axios";
// import { toast } from "sonner";

// const Profile = () => {
//   const [open, setOpen] = useState(false);
//   const { user, loading } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();

//   const [input, setInput] = useState({
//     firstName: user?.firstName || "",
//     lastName: user?.lastName || "",
//     occupation: user?.occupation || "",
//     bio: user?.bio || "",
//     facebook: user?.facebook || "",
//     linkedin: user?.linkedin || "",
//     github: user?.github || "",
//     instagram: user?.instagram || "",
//     file: null,
//   });

//   const changeEventHandler = (e) => {
//     const { name, value } = e.target;
//     setInput((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const changeFileHandler = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setInput((prev) => ({ ...prev, file }));
//     }
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("firstName", input.firstName);
//     formData.append("lastName", input.lastName);
//     formData.append("bio", input.bio);
//     formData.append("occupation", input.occupation);
//     formData.append("facebook", input.facebook);
//     formData.append("linkedin", input.linkedin);
//     formData.append("github", input.github);
//     formData.append("instagram", input.instagram);

//     if (input.file) {
//       formData.append("file", input.file);
//     }

//     try {
//       dispatch(setLoading(true));
//       const res = await axios.put(
//         "http://localhost:8000/api/v1/user/profile/update",
//         formData,
//         {
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         setOpen(false);
//         toast.success(res.data.message);
//         dispatch(setUser(res.data.user));
//         setInput((prev) => ({ ...prev, file: null })); 
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong.");
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   return (
//     <div className="pt-20 md:ml-[320px] md:h-screen">
//       <div className="max-w-6xl mx-auto mt-8">
//         <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
//           {/* Image Section */}
//           <div className="flex flex-col items-center justify-center md:w-[400px]">
//             <Avatar className="w-40 h-40 border-2 overflow-hidden rounded-full">
//               <AvatarImage
//                 src={
//                   input.file && typeof input.file === "object"
//                     ? URL.createObjectURL(input.file)
//                     : user?.photoUrl || userLogo
//                 }
//               />
//               <AvatarFallback>{user?.firstName?.[0] || "U"}</AvatarFallback>
//             </Avatar>

//             <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3">
//               {user?.occupation || "MERN Dev"}
//             </h1>
//             <div className="flex gap-4 items-center">
//               {user?.facebook && (
//                 <a
//                   href={user.facebook}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <FaFacebook className="w-6 h-6 text-gray-800 dark:text-gray-300" />
//                 </a>
//               )}
//               {user?.linkedin && (
//                 <a
//                   href={user.linkedin}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <FaLinkedinIn className="w-6 h-6 text-gray-800 dark:text-gray-300" />
//                 </a>
//               )}
//               {user?.github && (
//                 <a href={user.github} target="_blank" rel="noopener noreferrer">
//                   <FaGithub className="w-6 h-6 text-gray-800 dark:text-gray-300" />
//                 </a>
//               )}
//               {user?.instagram && (
//                 <a
//                   href={user.instagram}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <FaInstagram className="w-6 h-6 text-gray-800 dark:text-gray-300" />
//                 </a>
//               )}
//             </div>
//           </div>

//           {/* Info Section */}
//           <div>
//             <h1 className="font-bold text-center md:text-start text-4xl mb-7">
//               Welcome {user?.firstName || "User"}!
//             </h1>
//             <p>
//               <span className="font-semibold">Email:</span>{" "}
//               {user?.email || "email"}
//             </p>
//             <div className="flex flex-col gap-2 items-start justify-start my-5">
//               <Label>About Me</Label>
//               <p className="border dark:border-gray-600 p-6 rounded-lg">
//                 {user?.bio ||
//                   "Hi, a passionate and dedicated front-end developer and a Computer Science student. I specialize in building responsive and user-friendly web interfaces using React.js, Next.js, JavaScript, HTML, and CSS. I also have experience working with Node.js, MongoDB, and MySQL for full-stack development."}
//               </p>
//             </div>

//             <Dialog open={open} onOpenChange={setOpen}>
//               <form onSubmit={submitHandler}>
//                 <Button onClick={() => setOpen(true)}>Edit Profile</Button>
//                 <DialogContent className="sm:max-w-[425px]">
//                   <DialogHeader>
//                     <DialogTitle className="text-center">
//                       Edit Profile
//                     </DialogTitle>
//                     <DialogDescription className="text-center">
//                       Make changes to your profile here. Click save when you're
//                       done.
//                     </DialogDescription>
//                   </DialogHeader>

//                   <div className="grid gap-4 py-4">
//                     <div className="flex gap-2">
//                       <div className="grid gap-2 w-full">
//                         <Label htmlFor="firstName">First Name</Label>
//                         <Input
//                           id="firstName"
//                           name="firstName"
//                           placeholder="First Name"
//                           value={input.firstName}
//                           onChange={changeEventHandler}
//                         />
//                       </div>
//                       <div className="grid gap-2 w-full">
//                         <Label htmlFor="lastName">Last Name</Label>
//                         <Input
//                           id="lastName"
//                           name="lastName"
//                           placeholder="Last Name"
//                           value={input.lastName}
//                           onChange={changeEventHandler}
//                         />
//                       </div>
//                     </div>

//                     <div className="grid gap-2">
//                       <Label htmlFor="occupation">Occupation</Label>
//                       <Input
//                         id="occupation"
//                         name="occupation"
//                         placeholder="Developer, Designer..."
//                         value={input.occupation}
//                         onChange={changeEventHandler}
//                       />
//                     </div>

//                     <div className="flex gap-2">
//                       <div className="grid gap-2 w-full">
//                         <Label htmlFor="linkedin">LinkedIn</Label>
//                         <Input
//                           id="linkedin"
//                           name="linkedin"
//                           placeholder="Enter LinkedIn URL"
//                           value={input.linkedin}
//                           onChange={changeEventHandler}
//                         />
//                       </div>
//                       <div className="grid gap-2 w-full">
//                         <Label htmlFor="github">GitHub</Label>
//                         <Input
//                           id="github"
//                           name="github"
//                           placeholder="Enter GitHub URL"
//                           value={input.github}
//                           onChange={changeEventHandler}
//                         />
//                       </div>
//                     </div>

//                     <div className="flex gap-2">
//                       <div className="grid gap-2 w-full">
//                         <Label htmlFor="facebook">Facebook</Label>
//                         <Input
//                           id="facebook"
//                           name="facebook"
//                           placeholder="Enter Facebook URL"
//                           value={input.facebook}
//                           onChange={changeEventHandler}
//                         />
//                       </div>
//                       <div className="grid gap-2 w-full">
//                         <Label htmlFor="instagram">Instagram</Label>
//                         <Input
//                           id="instagram"
//                           name="instagram"
//                           placeholder="Enter Instagram URL"
//                           value={input.instagram}
//                           onChange={changeEventHandler}
//                         />
//                       </div>
//                     </div>

//                     <div className="grid gap-2">
//                       <Label htmlFor="bio">Bio</Label>
//                       <Textarea
//                         id="bio"
//                         name="bio"
//                         placeholder="Enter a description"
//                         className="text-gray-500"
//                         value={input.bio}
//                         onChange={changeEventHandler}
//                       />
//                     </div>

//                     <div className="grid gap-2">
//                       <Label htmlFor="file" className="text-right">
//                         Profile Picture
//                       </Label>
//                       <Input
//                         id="file"
//                         type="file"
//                         accept="image/*"
//                         onChange={changeFileHandler}
//                         className="w-[277px]"
//                       />
//                       {input.file && typeof input.file === "object" && (
//                         <img
//                           src={URL.createObjectURL(input.file)}
//                           alt="Preview"
//                           className="w-20 h-20 rounded-full mt-2"
//                         />
//                       )}
//                     </div>
//                   </div>

//                   {/* <DialogFooter>
//                     <DialogClose asChild>
//                       <Button variant="outline">Cancel</Button>
//                     </DialogClose>
//                     <Button onClick={submitHandler} type="submit">
//                       Save changes
//                     </Button>
//                   </DialogFooter>
//                 </DialogContent> */}



       

//               </form>
//             </Dialog>
//           </div>
//         </Card>
//       </div>
//     </div>
//  );
//  };

// export default Profile;













import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "../components/ui/card";
import React, { useState, useEffect } from "react";
import userLogo from "../assets/user.jpg";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
import TotalProperty from "@/components/TotalProperty";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    occupation: user?.occupation || "",
    bio: user?.bio || "",
    facebook: user?.facebook || "",
    linkedin: user?.linkedin || "",
    github: user?.github || "",
    instagram: user?.instagram || "",
    file: null,
  });

  // ✅ preview image cleanup to prevent memory leaks
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (input.file && typeof input.file === "object") {
      const objectUrl = URL.createObjectURL(input.file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [input.file]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prev) => ({ ...prev, file }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", input.firstName);
    formData.append("lastName", input.lastName);
    formData.append("bio", input.bio);
    formData.append("occupation", input.occupation);
    formData.append("facebook", input.facebook);
    formData.append("linkedin", input.linkedin);
    formData.append("github", input.github);
    formData.append("instagram", input.instagram);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        "http://localhost:8000/api/v1/user/profile/update",
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setOpen(false);
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        setInput((prev) => ({ ...prev, file: null }));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="pt-20 md:ml-[320px] md:h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
          {/* Image Section */}
          <div className="flex flex-col items-center justify-center md:w-[400px]">
            <Avatar className="w-40 h-40 border-2 overflow-hidden rounded-full">
              <AvatarImage
                src={
                  preview || user?.photoUrl || userLogo
                }
              />
              <AvatarFallback>{user?.firstName?.[0] || "U"}</AvatarFallback>
            </Avatar>

            <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3">
              {user?.occupation || "MERN Dev"}
            </h1>
            <div className="flex gap-4 items-center">
              {user?.facebook && (
                <a href={user.facebook} target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </a>
              )}
              {user?.linkedin && (
                <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </a>
              )}
              {user?.github && (
                <a href={user.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </a>
              )}
              {user?.instagram && (
                <a href={user.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </a>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div>
            <h1 className="font-bold text-center md:text-start text-4xl mb-7">
              Welcome {user?.firstName || "User"}!
            </h1>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {user?.email || "email"}
            </p>
            <div className="flex flex-col gap-2 items-start justify-start my-5">
              <Label>About Me</Label>
              <p className="border dark:border-gray-600 p-6 rounded-lg">
                {user?.bio ||
                  "Hi, a passionate and dedicated front-end developer and a Computer Science student. I specialize in building responsive and user-friendly web interfaces using React.js, Next.js, JavaScript, HTML, and CSS. I also have experience working with Node.js, MongoDB, and MySQL for full-stack development."}
              </p>
            </div>

            {/* Edit Profile Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
              <Button onClick={() => setOpen(true)}>Edit Profile</Button>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={submitHandler}>
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      Edit Profile
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    {/* Name */}
                    <div className="flex gap-2">
                      <div className="grid gap-2 w-full">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="First Name"
                          value={input.firstName}
                          onChange={changeEventHandler}
                        />
                      </div>
                      <div className="grid gap-2 w-full">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Last Name"
                          value={input.lastName}
                          onChange={changeEventHandler}
                        />
                      </div>
                    </div>

                    {/* Occupation */}
                    <div className="grid gap-2">
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input
                        id="occupation"
                        name="occupation"
                        placeholder="Developer, Designer..."
                        value={input.occupation}
                        onChange={changeEventHandler}
                      />
                    </div>

                    {/* Socials */}
                    <div className="flex gap-2">
                      <div className="grid gap-2 w-full">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          name="linkedin"
                          placeholder="Enter LinkedIn URL"
                          value={input.linkedin}
                          onChange={changeEventHandler}
                        />
                      </div>
                      <div className="grid gap-2 w-full">
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                          id="github"
                          name="github"
                          placeholder="Enter GitHub URL"
                          value={input.github}
                          onChange={changeEventHandler}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="grid gap-2 w-full">
                        <Label htmlFor="facebook">Facebook</Label>
                        <Input
                          id="facebook"
                          name="facebook"
                          placeholder="Enter Facebook URL"
                          value={input.facebook}
                          onChange={changeEventHandler}
                        />
                      </div>
                      <div className="grid gap-2 w-full">
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input
                          id="instagram"
                          name="instagram"
                          placeholder="Enter Instagram URL"
                          value={input.instagram}
                          onChange={changeEventHandler}
                        />
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="grid gap-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        placeholder="Enter a description"
                        className="text-gray-500"
                        value={input.bio}
                        onChange={changeEventHandler}
                      />
                    </div>

                    {/* File */}
                    <div className="grid gap-2">
                      <Label htmlFor="file" className="text-right">
                        Profile Picture
                      </Label>
                      <Input
                        id="file"
                        type="file"
                        accept="image/*"
                        onChange={changeFileHandler}
                        className="w-[277px]"
                      />
                      {preview && (
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-20 h-20 rounded-full mt-2"
                        />
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Saving..." : "Save changes"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>
      
      <TotalProperty/>
    </div>
  );
};

export default Profile;
