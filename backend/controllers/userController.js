import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import asyncHandler from "../middlewares/asyncHandler.js"

const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400).json({ message: "User already exists" })
  }

  const salt = await bcrypt.genSalt(10) //347yfnvef3
  const encryptedPassword = await bcrypt.hash(
    password,
    salt
  )

  const databaseUser = await User.create({
    name,
    email,
    password: encryptedPassword,
  })

  if (databaseUser) {
    res.status(200).json({
      id: databaseUser._id,
      name: databaseUser.name,
      email: databaseUser.email,
      password: databaseUser.password,
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

const authUser = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    )

    res.cookie("jwt", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // ✅ fixed here (1 hour)
      httpOnly: true,
    })

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error("Invalid Email and password")
  }
}

const logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), 
  })

  res.status(200).json({ message: "Logout successful" })
}



export { registerUser, authUser, logout }
