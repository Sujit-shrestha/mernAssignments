const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
app.use(express.json());


const secretForAdmin = "secret123";
const secretForUser = "user456";

//define mongoose schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{type: mongoose.Schema.Types.ObjectId , ref:'Course'}]
})
const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});
const courseSchema = new mongoose.Schema({
  title: String,
  description:String,
  price: Number,
  imageLinke: String,
  published: Boolean
})

//define mongoose models
const User = mongoose.model('User',userSchema);
const Admin = mongoose.model('Admin',adminSchema);
const course = mongoose.model('Course',courseSchema);

const authenticateAdmin= (req,res,next)=> {
  var authHeader = req.headers.authorization;
  authHeader = authHeader.split(' ')[1];
  const apa = jwt.verify(authHeader , secretForAdmin);
  if(apa){
    next();
  }else{
    res.send({message:"Authentication Failed"})
  }
  
};
const generateJwtAdmin = (data)=> {
  
  const token = jwt.sign(data,secretForAdmin,{expiresIn:'1h'});
  return token;
}
const authenticateUser= (req,res,next)=> {
  var authHeader = req.headers.authorization;
  authHeader = authHeader.split(' ')[1];
  const apa = jwt.verify(authHeader , secretForUser);
  if(apa){
    req.username = apa.username;
    next();
  }else{
    res.send({message:"User Authentication Failed"})
  }
  
};
const generateJwtUser = (data)=> {
  
  const token = jwt.sign(data,secretForUser,{expiresIn:'1h'});
  return token;
}

//connectin to mongoDb
mongoose.connect('mongodb+srv://sujitshrestha0004:pass@cluster0.s2b3yyn.mongodb.net/', {useNewUrlParser : true , useUnifiedTopology:true});

// Admin routes
app.post('/admin/signup' ,  async(req, res) => {
  // logic to sign up admin
  const {username,password}= req.body;
  const admin = await Admin.findOne({username});
 // const existingAdmin= ADMINS.find(a => a.username === admin.username );
  if(admin){
    res.status(403).json({message:"Username Already Exists"})
  }else{
    const obj = {username , password};
    const newAdmin = new Admin(obj);
    await newAdmin.save();  
    const token = generateJwtAdmin(obj);
    res.status(200).json({message : "Admin created successfully" , token:"Bearer "+token});
  }
});

// app.post('/admin/login', (req, res) => {
//   // logic to log in admin
//   const admin = req.headers;
//   const existingAdmin = ADMINS.find(a=> a.username === admin.username && a.password === admin.password)
//   if(existingAdmin){
//     const token = generateJwtAdmin(admin);
//     res.json({message: "Logged in successfully", token:"Bearer "+token})
//   }else{
//     res.json({
//       message:"Authentication Failed"
//     })
//   }
// });

// app.post('/admin/courses',authenticateAdmin , (req, res) => {
//   // logic to create a course
//   var courseId = Math.floor(Math.random()*1000);
//   const course = req.body;
//   course.courseId = courseId;
//   COURSES.push(course)
//   var outputObj = {"message":"Course created successfully" , "courseId"  :courseId};
//   res.status(200).send(outputObj)
// });

// app.put('/admin/courses/:courseId', authenticateAdmin , (req, res) => {
//   // logic to edit a course
//   var courseId = Number(req.params.courseId);
//   var index= COURSES.findIndex(a=> a.courseId == courseId)
//   if(index == -1){
//     res.json({message: "Course Id not found."});
//   }else{
//     var course = req.body;
//     console.log(course);
//     course.courseId = courseId;
//     COURSES.splice(index,1,course);
//     res.status(200).send({"message" : "course updated Successfully" ,"courses":COURSES[index]} );
//   }
// });

// app.get('/admin/courses', authenticateAdmin , (req, res) => {
//   // logic to get all course
//  res.status(200).send({"courses": COURSES});
// });

// // User routes
// app.post('/users/signup', (req, res) => {
//   // logic to sign up user
//   const user = req.body;
//   const existingUser= USERS.find(a => a.username === user.username );
//   if(existingUser){
//     res.status(403).json({message:"Username Already Exists"})
//   }else{
//     const token = generateJwtAdmin(user);
//     user.purchasedCourses=[];
//     USERS.push(user);
//     res.status(200).json({message : "User created successfully" , token:"Bearer "+token});
//   }
// });

// app.post('/users/login', (req, res) => {
//   // logic to log in user
//   const user = req.headers;
//   const existingUser = USERS.find(a=> a.username === user.username && a.password === user.password)
//   if(existingUser){
//     const token = generateJwtUser(user);
//     res.json({message: "Logged in successfully", token:"Bearer "+token})
//   }else{
//     res.json({
//       message:"User Authentication Failed"
//     })
//   }
// });

// app.get('/users/courses', authenticateUser , (req, res) => {
//   // logic to list all courses
//   res.json({courses:COURSES});
// });

// app.post('/users/courses/:courseId', authenticateUser , (req, res) => {
//   // logic to purchase a course
//   const courseId = Number(req.params.courseId);
//   const username = req.username;
//   var index = COURSES.findIndex(a=> a.courseId == courseId);
//     if(index == -1){
//       res.status(403).send({message:"Course not found"})
//     }else{
//       //pushing purchased course into users object
//       var userIndex = USERS.findIndex(a => a.username = username);
//       USERS[userIndex].purchasedCourses.push(COURSES[index]);
//       res.status(200).send(
//         {
//         message:"Course Purchased successfully",
//         course:COURSES[index],
//         "all courses of  user" : USERS[userIndex].purchasedCourses
//         });
//     }
// });

// app.get('/users/purchasedCourses',authenticateUser, (req, res) => {
//   // logic to view purchased courses
//   const username = req.username;
//   var userIndex = USERS.findIndex(a => a.username = username);
//   res.send({
//     "courses" : USERS[userIndex].purchasedCourses
//   })


// });

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
