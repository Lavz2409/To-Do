import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/db.js"
import todoRouter from "./routes/todoRoutes.js"
import userRouter from "./routes/userRoutes.js"
import CookieParser from "cookie-parser"
import {
  notFound,
  errorHandler,
} from "./middlewares/errorHandler.js"
import cors from "cors"

connectDB()

const app = express()
const port = process.env.PORT || 3000

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ], // Your React app URL
    credentials: true, // ✅ Allow sending cookies
  })
)

app.use(express.json())
app.use(CookieParser())

// app.get("/api/todo", getTodos)
// app.post("/api/todo", addTodo)
// app.patch("/api/todo/:id", updateTodo)
app.use("/api/todo", todoRouter)
app.use("/api/user", userRouter)
// app.use(notFound) //This cathes u3nmatched routes
// app.use(errorHandler) //This cathes all the  server errors

app.listen(port, () => {
  console.log(
    `Server is running on http://localhost:${port}`
  )
})