import React from "react"
import { AddTodo } from "../components/AddTodo"
import { TodoList } from "../components/TodoList"
import { NavBar } from "../components/NavBar"

export const HomePage = () => {
  return (
    <div>
      <NavBar/>

      <div className="min-h-screen bg-sky-200 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden ">
          <header
            style={{ padding: "20px" }}
            className="bg-gradient-to-r frum bg-purple-500 to-indigo-500 
        p-6 text-center text-white"
          >
            <p className="text-sm mt-2">
              Organize your tasks efficientily
            </p>
          </header>
          <main className="p-6 space-x-6">
            <AddTodo />
            <TodoList />
          </main>
        </div>
      </div>
    </div>
  )
}
