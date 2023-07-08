/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();
  const PORT =3000;
  var todoList = [
    //DEFAULT TODOS
    {
      "id":11, 
      "title":"Buy groceries(Default TODO )",
      "completed" : false,
      "desctription" : "I should buy groceries"
    },
    {
      "id":203 , 
      "title":"Buy groceries",
      "completed" : false,
      "desctription" : "I should buy groceries"
    }
  ];
  //middlewares
  app.use(bodyParser.json());
  
  
  //functins for http servcers handlers
  function retrieveTodos(req,res){
    res.status(200).json(todoList);
  }
  
    function getIndex(inputID){
      var index = -1;
      for(var i=0;i<todoList.length;i++){
        if(todoList[i].id == inputID){
          index=i;
        }
      }
      return index;
    }
  
  function retrieveTodosById(req,res){
    var id=req.params.id;
    var index=-1;
    index = getIndex(id);
  
    if(index== -1){
      res.send("Todo ID not Found");
    }else{
      res.send(todoList[index]);
    }
  
  }
  
  function createTodos(req,res){
    var id = Math.floor(Math.random()*1000);
    var title = req.body.title;
    var description = req.body.description;
    var tempObj = {
      "id":id,
      "title":title,
      "completed":false,
      "description":description
    }
    todoList.push(tempObj);
    var sendObj={"id":id}
    res.status(201).json(sendObj)
  }
  
  function updateTodos(req,res){
    var id= req.params.id;
    var title = req.body.title;
    var description = req.body.description;
    var index= getIndex(id);
    if(index== -1){
      res.status(404).send(`404 not found : id ${id} NOT AVAILABLE in DATABASE `);
    }else{
      var tempObj = {
        "id":id,
        "title":title,
        "completed":false,
        "description":description
      }
      todoList.splice(index , 1 , tempObj)
      res.send("TODO list updated in the given id");
    }
    
  }
  
  function deleteTodos(req,res){
    var id = req.params.id;
    var index = getIndex(id);
    if(index == -1 ){
      res.status(404).send(`Given id ${id} was not found`);
    }else{
      todoList.splice(index , 1);
      res.status(200).send(`Todo item was found and deketed`);
    }
    
    
  }
  //http servers description
  app.get('/todos' , retrieveTodos);
  app.get('/todos/:id', retrieveTodosById);
  app.post('/createTodos', createTodos);
  app.put('/updateTodos/:id' , updateTodos);
  app.delete('/deleteTodos/:id' , deleteTodos);
  
  //default handler/middleware for non defined routes requests
  app.use((req,res)=>{
    res.status(404).send("404 NOT FOUND as said by middleware");
  })
  
  
  //LISTNER
  app.listen(PORT, ()=>{
    console.log(`app listeneing in port ${PORT}`);
  })
  module.exports = app;
  