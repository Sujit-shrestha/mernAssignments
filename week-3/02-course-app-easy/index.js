//Course selling Website
const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser')
//middlewares
app.use(express.json());


let ADMINS = [
  {
    "username" :"admin" ,
    "password" :"pass"
  }
];
let USERS = [];
let COURSES = [
  { "courseId":1,
    "title": "course title ", 
    "description": "course description", 
    "price": 100,
    "imageLink": "https://linktoimage.com", 
    "published": true
    
    }
];

//FUNCTION for http handlers
function userIndexFinder(userArray , username ){
  
  var userIndex= -1;
  var count =-1;
  userArray.forEach(arrayUser =>{
    count++;
    if(arrayUser.username == username){
     
     userIndex = count;
    }
  })
  return userIndex;
}
function courseIndexFinder(courseArray , courseId ){
  
  var index= -1;
  var count =-1;
  courseArray.forEach(arrayElement =>{
    count++;
    if(arrayElement.courseId == courseId){
     
     index = count;
    }
  })
  return index;
}
function Authenticate(array , username , password){
  var userIndex = userIndexFinder(array , username);
  if(userIndex== -1){
    return false;
  }
  
  if(array[userIndex].password == password){
    return true;
  }else{
    return false;
  }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  var username = req.body.username;
  var password = req.body.password; 
  var userIndex = -1;
  var adminObj = {
    "username" :username,
    "password" : password
  }
 userIndex = userIndexFinder(ADMINS ,username);
  if(userIndex == -1){
    ADMINS.push(adminObj);
    var outputMsg = {"message":"Admin created successfully"};
    res.status(200).send(ADMINS);
   
  }else{
    res.status(403).send(`Username ${username} already exists`);
  }
  
});

app.post('/admin/login', (req, res) => {
  //console.log("request arriving");
  var username = req.headers.username;
  var password = req.headers.password;
  var userIndex = userIndexFinder(ADMINS ,username);

  if(userIndex > -1){
    if(ADMINS[userIndex].password == password){
      var outputObj = {"message":"Logged in Successfully"};
      res.send(outputObj);
    }else{
      res.status(401).send("INCORRECT PASSWORD")
    }
  }else{
    res.send("User not found");
  }
 
  
  
});

app.post('/admin/courses', (req, res) => {
  // logic to create a course
  var password = req.headers.password;
  var username = req.headers.username;
  var title = req.body.title;
  var description = req.body.description;
  var price = req.body.price;
  var imageLink = req.body.imageLink;
  var poublished = req.body.poublished;
  var courseId = Math.floor(Math.random()*1000);
  var courseObj = {
    "courseId":courseId,
    "title" :title,
    "description" :description,
    "price":price,
    "imageLink":imageLink,
    "published":true
  }
  var outputObj = {"message":"Course created successfully" , "courseId"  :courseId};
  res.status(200).send(outputObj)
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
  var username = req.headers.username;
  var password = req.headers.password;
  var courseId = req.params.courseId;
  var auth = Authenticate(ADMINS , username , password);
  console.log(auth);
  if(auth == false){
    res.status(401).json({"message" : "Unauthorised"})
  }else{
    var title = req.body.title;
    var description =req.body.description;
    var price = req.body.price;
    var imageLink = req.body.imageLink;
    var published = req.body.published;
    var updatedCourseObj = {
      "courseId":courseId,
      "title" :title,
      "description" :description,
      "price":price,
      "imageLink":imageLink,
      "published":published
    }
  var index =   courseIndexFinder(COURSES , courseId)
    
    COURSES.splice(index,1,updatedCourseObj);

    res.status(200).send({"message" : "course updated Successfully" ,"courseObj":COURSES} );
  }
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
  var username = req.headers.username;
  var password = req.headers.password;
  var auth = Authenticate(ADMINS , username , password);
  console.log("here");
  if(auth == false){
    res.status(401).json({"message" : "Unauthorised"})
  }else{
    res.status(200).send({"courses": COURSES});
  }

});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
