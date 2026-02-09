import express from "express"
import {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js"
import { protect } from "../middlewares/authMiddleware.js"

const todoRouter = express.Router()

todoRouter
  .route("/")
  .get(protect, getTodos)
  .post(protect, addTodo)
todoRouter
  .route("/:id")
  .get(protect, getTodo)
  .patch(protect, updateTodo)
  .delete(protect, deleteTodo)

export default todoRouter
