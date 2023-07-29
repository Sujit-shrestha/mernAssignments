import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

function useTodos(){
  const [todos, setTodos] = useState([])
    // fetch all todos from server
    useEffect(()=>{
      fetch("http://localhost:3000/todos" , {
      method : "GET"
    }).then((response)=> {
      response.json().then((data)=>{
        console.log(data);
        setTodos(data);
      })
    })

    setInterval(() => {
      fetch("http://localhost:3000/todos" , {
      method : "GET"
    }).then((response)=> {
      response.json().then((data)=>{
        console.log(data);
        setTodos(data);
      })
    })
    }, 15000);
    } , [])
    

  return todos;
}

function App() {
 const todos = useTodos();

  return (
    <>
      <div>
        <h1>Easy Todo App</h1>
        {todos.map((todo)=>{
          return (
            <div class="todo-container">
              <div class="todo-title">{todo.title}</div>
              <div class="todo-description">{todo.description}</div>
              {todo.completed}
              <Todo></Todo>
            </div>
            
          )
        })}
      
      </div>
    </>
  )
}

function Todo(props) {
    // Add a delete button here so user can delete a TODO.
    return <div>
      <button>Delete</button> 
    </div>
}

export default App
