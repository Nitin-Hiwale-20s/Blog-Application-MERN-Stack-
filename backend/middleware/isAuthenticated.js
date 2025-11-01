
// import jwt from "jsonwebtoken";

// export const isAuthenticated = (req, res, next) => {

//   const token =
//     req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "User not authenticated",
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "User not authenticated",
//     });
//   }
// };




import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = req.cookies?.token || (authHeader && authHeader.split(" ")[1]);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};