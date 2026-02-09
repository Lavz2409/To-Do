import React, { useState } from "react"
import { data, Link } from "react-router-dom"
import { CiEdit } from "react-icons/ci"
import { MdDeleteOutline } from "react-icons/md"
import { useDeleteTodoMutation, useGetTodosQuery } from "../slices/todoApiSlice"
import { toast } from "react-toastify"

export const TodoList = () => {
  const { data: todos } = useGetTodosQuery() //using the getTodos query from todoApiSlice
  console.log(todos && todos)

  const [deleteTodo] = useDeleteTodoMutation()

 const deleteHandler = async (id) => {
  try {
    await deleteTodo({ id }).unwrap();  // optional: .unwrap() gives better error handling if you're using RTK Query
    toast.success("Todo Deleted successfully");
  } catch (err) {
    toast.error("Failed to delete todo");
    console.error(err);
  }
};

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Your Todos
      </h2>

      {todos?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className={`p-5 my-2 bg-white rounded-lg shadow-lg border border-gray-200
               hover:shadow-xl transition-shadow ${
                 todo.status === "completed"
                   ? "opacity-70"
                   : ""
               }`}
            >
              <div className="flex flex-col ">
                <h3
                  className={`text-xl font-bold ${
                    todo.status === "completed"
                      ? "text-gray-500 line-through"
                      : "text-gray-800"
                  } `}
                >
                  {" "}
                  {todo.title}{" "}
                </h3>
                <p
                  className={`mt-2  ${
                    todo.status === "completed"
                      ? "text-gray-400 line-through"
                      : "text-gray-600"
                  }`}
                >
                  {" "}
                  {todo.descr}{" "}
                </p>
              </div>
              <div className="flex space-x-2">
                <Link
                  to={`/update/${todo._id}`}
                  aria-label="Edit Todo"
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                >
                  {" "}
                  <CiEdit />
                </Link>

                <button
                  onClick={() => deleteHandler(todo._id)}
                  aria-label="Delete Todo"
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  {" "}
                  <MdDeleteOutline />{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No Todos Yet, Start by adding one</p>
      )}
    </div>
  )
}
