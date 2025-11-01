// import express from 'express';
// import { login, register,logout, updateProfile } from "../controllers/user.controller.js";
// import { isAuthenticated } from '../middleware/isAuthenticated.js';
// import { singleUpload } from '../middleware/multer.js';


// const router = express.Router();
// router.route("/register").post(register);
// router.route("/login").post(login);
// router.route("/logout").get(logout);
// router.route("/profile/update").put(isAuthenticated, singleUpload, updateProfile);

// export default router;





import express from "express";
import { 
  login, 
  register, 
  logout, 
  updateProfile, 
  getAllUsers
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

// ✅ Register
router.post("/register", register);

// ✅ Login
router.post("/login", login);

// ✅ Logout
router.get("/logout", logout);

// ✅ Update Profile (with image upload)
router.put("/profile/update", isAuthenticated, singleUpload, updateProfile);

router.route("/all-users").get(getAllUsers)

// ✅ Get current logged-in user details (optional)
router.get("/me", isAuthenticated, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user, // isAuthenticated middleware मध्ये user attach होतो
  });
});

export default router;












