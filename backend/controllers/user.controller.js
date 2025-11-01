import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js"; 






// Register user
export const register = async (req, res) => {
  try {
    //  console.log("Incoming body:", req.body);
    const { firstName, lastName, email, password } = req.body;
    

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to register user",
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: `Welcome ${user.firstName}`,
        user,
      });




  } catch (error) {
    console.log("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to login user",
    });
  }
};

// Logout user
export const logout = async (__, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({
        message: "Logout successful",
        success: true,
      });
  } catch (error) {
    console.log("Logout Error:", error);
  }
};

// Get user progile
export const updateProfile = async(req,res)=>{
  try{
    // const userId=req.id
      const userId = req.userId;
    const{firstName,lastName,occupation,bio,instagram,facebook,linkdin,github}=req.body;
    const file =req.file

    const fileUri=getDataUri(file)
    let cloudResponse= await cloudinary.uploader.upload(fileUri)
   

    const user=await User.findById(userId).select("-password")
    if(!user){
      return res.status(404).json({
        message:"data not found",
        success:false
      })
    }

    // Update Datafile

    if(firstName)user.firstName=firstName
    if(lastName)user.lastName=lastName
    if(occupation)user.occupation=occupation
    if(instagram)user.instagram=instagram
    if(facebook)user.facebook=facebook
    if(linkdin)user.linkdein=linkdin
    if(github)user.github=github
    if(bio)user.bio=bio
    if(file)user.photoUrl=cloudResponse.secure_url

    await user.save()
    return res.status(200).json({
      message:"profile update Success",
      success:true,
      user
    })

  }catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Failed to update profile"
    })
    
  }
}

export const getAllUsers = async (req, res)=>{
  try {
    const users= await User.find().select("-password")
    res.status(200).json({
      success:true,
      message:"User List Fetched Successfully",
      toal:users.length,
      users
    })
    
  } catch (error) {
    console.log("Error fetching user List : ",error)
    res.status(500).json({
      success:false,
      message:"Error fetching user list"
    })
    
  }
} 
