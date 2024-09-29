import { isValidObjectId } from "mongoose";
import { Todo } from "../model/todo.model.js";


//create todos
export const createTodo = async (req , res)=>{
    try {
        const {text , completed} = req.body
        const newTodo = await Todo.create({
            text,
            completed
        })

        return res.status(201).json({
            newTodo
        })
    } catch (error) {
        console.log("todo did not get created");
        
    } 
}

// get all todo

export const getTodos = async (req , res)=>{
    try {
        const todos = await Todo.find();
        if(!todos)
            {
                console.log("cant find getTodos");
                
            }
        return res.status(201).json(todos)
    } catch (error) {
        console.log("error in getting all todos");
        
    }
}

// update todos

export const updateTodo = async (req , res)=>{
    try {
        const { id } = req.params
        const { text , completed } = req.body
        const todo = await Todo.findById(id)
        if(!todo)
            {
                console.log("cant find updateTodo");
                return res.status(404).json({ message: "Todo not found" });
            }
        todo.text = text
        todo.completed = completed;
        await todo.save()
        res.status(201).json(todo)

    } catch (error) {
        console.log("error in updating all todos", error);
        res.status(500).json({ message: "Error updating todo" }); 
    }
}

// delete todo

// export const deleteTodo = async (req , res)=>{
//     try {
//         const {id} = req.params
//         const todo = await Todo.findById(id)
//         if(!todo)
//         {
//             console.log("cant find deleteTodo");
            
//         }
//         await todo.deleteOne()
//         res.status(201).json(todo)
//     } catch (error) {
//         console.log("error in deleting task");
        
//     }
// }

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        if(!isValidObjectId(id))
        {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        console.log(`Deleting todo with id: ${id}`); // Log the ID being deleted

        const todo = await Todo.findById(id);
        if (!todo) {
            console.log("Todo not found for deletion");
            return res.status(404).json({ message: "Todo not found" }); // Return a 404 response if not found
        }

        await todo.deleteOne();
        console.log(`Todo with id: ${id} deleted successfully`); // Log success message
        res.status(200).json(todo); // Change to 200 OK for successful delete
    } catch (error) {
        console.error("Error in deleting task:", error); // Log the full error for better debugging
        res.status(500).json({ message: "Error deleting todo" }); // Return a 500 response on error
    }
};
