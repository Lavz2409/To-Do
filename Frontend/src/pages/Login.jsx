import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { setCredentials } from "../slices/authSlice"
import { useLoginMutation } from "../slices/userApiSlice"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const [login] = useLoginMutation()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials(res))
      navigate("/home")
    } catch (error) {
      console.log("Username or Password is Incorrect")
      toast.error(
        error?.data?.message || "Invalid Credentials"
      )
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-200">
      <div
        style={{ padding: "20px" }}
        className="w-full max-w-md bg-white rounded-lg shadow-lg"
      >
        <h2
          className="text-2xl font-bold text-center text-gray-800
        "
        >
          To-Do App
        </h2>
        <p className="text-center text-gray-500 mt-2 ">
          Manage Your Tasks Efficientily
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              {" "}
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Your Email"
              id="email"
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg 
              focus:ring focus:inset-ring-teal-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              {" "}
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Your Password"
              id="password"
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg 
            focus:ring focus:inset-ring-teal-500"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-teal-500 rounded-lg mt-3"
          >
            Login
          </button>
        </form>
        <p className="text-center">
          Dont't have an account?
          <Link
            to="/signup"
            className="text-gray-500 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
