import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTodos, toggleComplete } from "../slice.jsx";
import { removeTodo } from "../slice.jsx";
import { updateTodo } from "../slice.jsx";
import axios from "axios";
import { nanoid } from "@reduxjs/toolkit";


const Todos = ()=>{
   // const [todos , setTodos] = useState([])
    const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('http://localhost:2300/api/todos');
      console.log(response.data); 
      dispatch(setTodos(response.data));
    };
  
    fetchTodos();
  }, [dispatch]);
  

  const handleUpdateFunction = async (todo)=>{
    const newText = prompt("updated text" , todo.text)
    // if(newText && newText.trim())
    // {
    //     await axios.put(`http://localhost:2300/api/todos/${todo._id}` , {text : newText})
    //     dispatch(updateTodo({_id: todo._id , text : newText}))
    // }
    if (newText && newText.trim()) {
        try {
            const response = await axios.put(`http://localhost:2300/api/todos/${todo._id}`, { text: newText,
                  completed: todo.completed });
            console.log('Update response:', response.data); // Log the response
            dispatch(updateTodo({ _id: todo._id, text: newText }));
        } catch (error) {
            console.error('Error updating todo:', error); // Log the error if any
        }
    }

  }
return (
    <>
      <div>Todos</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
          //key={todo.id}
          key={todo._id}
          onClick={async (e) => {
            try {
               // e.stopPropagation(); // Prevent toggleComplete when button is clicked
                const response = await axios.put(`http://localhost:2300/api/todos/${todo._id}`, { ...todo ,
                        completed: !todo.completed })
                        dispatch(toggleComplete(todo._id));
            } catch (error) {
                console.log("error deleting todo:" + error);
                
            }
          }}
         // onClick={() =>
            //{
            //  axios.put(`http://localhost:2300/api/todos/${todo._id}`, { text: text,
            //     completed: !todo.completed });
            // dispatch(toggleComplete(todo._id))}}
            className={`mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded ${todo.completed ? 'line-through' : ''}`} // Conditionally apply line-through
            
            // Toggle completed on click
          >
            <div className="text-white">{todo.text}</div>
            <button 
            className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
            onClick={(e)=>{ 
                e.stopPropagation()
                //dispatch(updateTodo( todo.id , todo.text))
                handleUpdateFunction(todo)
                }}>
                Update
            </button>
            <button
           
              onClick={async (e) => {
                try {
                    e.stopPropagation(); // Prevent toggleComplete when button is clicked
                    const response = await axios.delete(`http://localhost:2300/api/todos/${todo._id}`)
                    dispatch(removeTodo(todo._id));
                } catch (error) {
                    console.log("error deleting todo:" + error);
                    
                }
              }}
              className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos


