import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useLogoutMutation } from "../slices/userApiSlice"
import { logout } from "../slices/authSlice"



export const NavBar = () => {
  const user = useSelector((state) => state.auth.userInfo)
  console.log(user)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try{
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate("/")
    } catch(error){
      console.log(error.message);
      
    }
  }
    
   

  return (
    <div
      // style={{ padding: "20px" }}
      className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white
     shadow-lg  p-5 px-6"
    >
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wider">
          <Link
            to="/home"
            className="hover:text-gray-200"
          >
            Todo Manager
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/home"
            className="text-lg px-3.5 font-medium hover:text-gray-200 transition
             duration-300"
          >
            Home
          </Link>
            {user && (
            <span className="text-lg font-medium sm:inline">{user.name}</span>
          )}

          <button
            style={{ padding: "10px" }}
            onClick={logoutHandler}
            className="bg-red-600 hover:bg-red-700 text-sm font-bold py-2 px-4
             rounded-md transition  duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
