import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const protect = async (req, res, next) => {
  let token = req.cookies.jwt
  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized, no token" })
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    )
    req.user = await User.findById(decoded.userId).select(
      "-password"
    )
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "User not found" })
    }
    next()
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Not authorized, token failed" })
  }
}

export { protect }
