import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useRegisterUserMutation } from "../slices/userApiSlice"
import { toast } from "react-toastify"

export const SignUp = () => {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [registerUser] = useRegisterUserMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("tugijopkjibg")

    try {
      await registerUser({ name, email, password }).unwrap()
      toast.success("User Registered Successfully")
      navigate("/")
    } catch (error) {
      toast.error(
        error?.data?.message || "Registration failed"
      )
    }
  }

  return (
    <div className="flex bg-sky-200 items-center justify-center min-h-screen">
      <div
        style={{
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
        className="w-full bg-lime-50 max-w-md  rounded-lg shadow-lg p-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          To-Do App
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Create your account to get started
        </p>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              style={{ padding: "10px" }}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="Enter Your Name"
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring"
            />
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              style={{ padding: "10px" }}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter Your Email"
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring"
            />
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              style={{ padding: "10px" }}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Enter Your Password"
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-teal-500 rounded-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-teal-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
