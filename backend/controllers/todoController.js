import Todo from "../models/todoModel.js"
import asyncHandler from "../middlewares/asyncHandler.js"

const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find()
  res.json(todos)
})

const getTodo = async (req, res) => {
  const { id } = req.params
  try {
    const todo = await Todo.findById(id)
    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found" })
    }
    res.json(todo)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const addTodo = asyncHandler(async (req, res) => {
  console.log(req.body)

  const { title, descr, status } = req.body

  const todo = await Todo.create({
    title,
    descr,
    status,
    user: req.user._id, // add the user id from the request
  })
  res.json(todo)
})

const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params

  const { title, descr, status } = req.body

  const todo = await Todo.findById(id)

  todo.title = title || todo.title
  todo.descr = descr || todo.descr
  todo.status = status || todo.status

  const updatedTodo = await todo.save()

  res.json(updatedTodo)
})

const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params
  await Todo.findByIdAndDelete(id)
  res.json("Todo deleted succcesfully")
})

export {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
}
