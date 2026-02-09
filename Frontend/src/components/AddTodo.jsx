import React from "react"
import { useState } from "react"
import { useAddTodoMutation } from "../slices/todoApiSlice"
import { toast } from "react-toastify"

export const AddTodo = () => {
  const [title, setTitle] = useState("")
  const [descr, setDescr] = useState("")
  const [status, setStatus] = useState("pending") //default pending state

  const [addTodo] = useAddTodoMutation() //using the addTodo mutation from todoApiSlice

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !descr) {
      toast.error("Title and Description are required")
    } else {
      try {
        await addTodo({ title, descr, status }).unwrap()
        toast.success("Todo added successfully")
        setTitle("")
        setDescr("")
        setStatus("pending") //resetting the status to pending after adding a todo
      } catch (error) {
        toast.error("Error while adding todo")
      }
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-4  rounded-lg shadow-md border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-gray-700  mb-4">
          Add a new Todo
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your title"
            className="w-full mt-1
           p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Decription
          </label>
          <textarea
            value={descr}
            onChange={(e) => setDescr(e.target.value)}
            cols="30"
            rows="4"
            type="text"
            placeholder="Enter your description"
            className="w-full mt-1 p-2 border
            border-gray-300 rounded-lg shadow-sm
            focus:ring-2 focus:ring-indigo-500"
          ></textarea>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full mt-3 bg-gradient-to-r from-purple-500 to-indigo-500
           text-white py-2 rounded-lg
           shadow-md hover:shadow-lg
          tranform hover:scale-105 transition-transform"
          >
            Add Todo
          </button>
        </div>
      </form>
    </div>
  )
}
