import express from "express"
import {
  registerUser,
  authUser,
  logout,
} from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.route("/").post(registerUser)
userRouter.route("/auth").post(authUser)
userRouter.route("/logout").post(logout)

export default userRouter
