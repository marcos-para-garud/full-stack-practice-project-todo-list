import { createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   todos : [ {
    _id: 1,
    text: "this my todo app",
    completed: false,
   }
   ]
}


export const todoslice = createSlice({
    name : "todo",
    initialState,
    reducers : {

        setTodos:(state , action)=>{
            state.todos = action.payload
        },
        addtodo: (state , action)=>{
            state.todos.push({_id: nanoid() , text: action.payload , toggleText: false})
        },
        removeTodo: (state , action)=>{
            const _id = action.payload
            state.todos = state.todos.filter((todo)=>( todo._id !== _id))
        },
        updateTodo: (state, action) => {
            const { _id, text } = action.payload; // Destructure the payload to get both id and content
            const todo = state.todos.find((todo) => todo._id === _id); // Find the todo by id
            if (todo) {
                todo.text = text; // Update the content if todo is found
            }
        },
        
        toggleComplete: (state , action)=>{
            const _id = action.payload
            const todo = state.todos.find((todo)=> todo._id === _id)
            if(todo){
            todo.completed = !todo.completed
            }
        }
    }
})

export const {setTodos , addtodo , removeTodo , updateTodo , toggleComplete} = todoslice.actions
export default todoslice.reducer