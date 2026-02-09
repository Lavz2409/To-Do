import logo from "./assets/react.svg"
import viteLogo from "../public/vite.svg"
import "./App.css"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import { Login } from "./pages/Login"
import { SignUp } from "./pages/SignUp"
import { HomePage } from "./pages/HomePage"
import { NavBar } from "./components/NavBar"
import { UpdateTodo } from "./pages/UpdateTodo"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/update/:id"
            element={<UpdateTodo />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
