/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */
const { Console } = require('console');
const express = require('express');
const fs = require('fs');
const { type } = require('os');
const path = require('path');
const app = express();
const port = 3000;

//fuinction 
function getFilesList(req , res){
  var fileNameList = [];

  fs.readdir('./files' , (err , files)=> {
    files.forEach(file => {
      fileNameList.push(file);
    })
  
    res.send(fileNameList);
  })
  
}
function getFileByName(req, res){
  var fileName = (req.params.filename) ;
  fileName = path.join(__dirname , 'files' , fileName);
  fs.readFile(fileName , 'utf-8' , (err , data)=>{
    if(err){
      res.status(404).send("File not found");
    }
    res.send(data);
  })

 
}

//http servers endpoint descriptions
app.get('/files' , getFilesList);
app.get('/file/:filename', getFileByName);

//middleware
app.use((req , res)=>{
  res.send(404);
})

app.listen(port , ()=>{
  console.log(`Listening in port ${port}`)
})
module.exports = app;
