import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useGetTodoQuery, useUpdateTodoMutation, useGetTodosQuery } from "../slices/todoApiSlice"
import { useEffect } from "react"
import { toast } from "react-toastify"


export const UpdateTodo = () => {
  const [title, setTitle] = useState("")
  const [descr, setDescr] = useState("")
  const [status, setStatus] = useState("pending")

  const navigate= useNavigate()

  const {id}=useParams()
console.log(id);


  const {data: todo} = useGetTodoQuery(id)
  console.log(todo ? todo: "No todo found with this ID");
  
 const [updateTodo] = useUpdateTodoMutation()
 const {refetch} = useGetTodosQuery()

  const handleSubmit = async(e) => {
    e.preventDefault()
    await updateTodo({id, title, descr, status})
    refetch()
    navigate ("/home")
    toast.success("Todo updated succesfully")
  }

useEffect(() => {
  if (todo){
    setTitle(todo.title)
    setDescr(todo.descr)
    setStatus(todo.status)
  }
  console.log("Todo data fetched:", todo);
}, [todo])

  return (
    <div className="min-h-screen bg-sky-200 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Update Todo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              value={title}
              type="text"
              id="title"
              placeholder="Enter todo title"
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg 
            shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="desc"
              className="block text-sm font-medium text-gray-700"
            >
              Decription
            </label>
            <textarea
              value={descr}
              onChange={(e) => setDescr(e.target.value)}
              type="text"
              id="desc"
              placeholder="Enter todo
            Description"
              className="mt-1 block w-full p-3
            border border-gray-300 rounded-lg shadow-sm
            focus:outline-none focus:ring-blue-500
            focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              id="status"
              className="mt-1 block w-full p-3 border-3 border-gray-300 rounded-lg shadow-sm focus:outline-none
           focus:ring-blue-500 focus:border-blue-500 "
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg
           shadow-md hover:bg-blue-600 transition duration-200"
            >
              Update Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
