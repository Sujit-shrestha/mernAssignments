import React, { useEffect } from "react";


function App() {
  const [todos , setTodos] = React.useState([{
    title: "Go to gym",
    description: "Hit gym from 5-7",
    id: 1
  },
  {
    title: "Go to class",
    description: "Hit gym from 7-9",
    id: 2
  }]);

  return (
    <div>
      {todos.map((todo) => {
        return <div>
          {todo.title}
          {todo.description}
          <br />
          </div>
      })}
    </div>
  )
}

export default App;