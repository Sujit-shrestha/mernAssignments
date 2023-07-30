const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
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
const Course = mongoose.model('Course',courseSchema);

const authenticateAdmin= (req,res,next)=> {
  var authHeader = req.headers.authorization;
  if(!authHeader){
    res.json("Authorization header not provided.")
  }
  try{
    authHeader = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(authHeader , secretForAdmin);
    req.username = decodedToken.username;
    next();
  }
  catch(err){
    res.json({message:"User Authentication Failed"})
  }
};
const generateJwtAdmin = (data)=> {
  
  const token = jwt.sign(data,secretForAdmin,{expiresIn:'1h'});
  return token;
}
const authenticateUser= (req,res,next)=> {
  var authHeader = req.headers.authorization;
  if(!authHeader){
    res.json("Authorization header not provided.")
  }
  try{
    authHeader = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(authHeader , secretForUser);
    req.username = decodedToken.username;
    next();
  }
  catch(err){
    res.json({message:"User Authentication Failed"})
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

app.post('/admin/login', async(req, res) => {
  // logic to log in admin
  const {username , password} = req.headers;
  const admin = await Admin.findOne({username , password})
  if(admin){
    const token = generateJwtAdmin(req.headers);
    res.json({message: "Logged in successfully", token:"Bearer "+token})
  }else{
    res.json({
      message:"Authentication Failed"
    })
  }
});

app.post('/admin/courses',authenticateAdmin , async(req, res) => {
  // logic to create a course
  const newCourse = new Course(req.body)
  await newCourse.save();
  res.status(200).send({message:"Course created successfully" , "courseId"  :newCourse.id})
});

app.put('/admin/courses/:courseId', authenticateAdmin , async(req, res) => {
  // logic to edit a course
  var course = await Course.findByIdAndUpdate(req.params.courseId , req.body , {new:true})
  if(course){
    res.status(200).json({"message" : "course updated Successfully"} );
  }else{
    res.status(404).json({message: "Course Id not found."});
  }
});

app.get('/admin/courses', authenticateAdmin , async(req, res) => {
  // logic to get all course
  const courses = await Course.find({});
 res.status(200).send({courses});

});

// User routes
app.post('/users/signup', async(req, res) => {
  // logic to sign up user
  const {username , password} = req.body;
  const existingUser = await User.findOne({username});
  if(existingUser){
    res.status(403).json({message:"Username Already Exists"})
  }else{
    const user = req.body;
    const token = generateJwtUser(user);
  const newUser = new User(user);
  await newUser.save();
    res.status(200).json({message : "User created successfully" , token:"Bearer "+token});
  }
});

app.post('/users/login', async(req, res) => {
  // logic to log in user
  const {username , password} = req.headers;
  const existingUser = await User.findOne({username , password,});
  if(existingUser){
    
    const token = generateJwtUser(req.headers);
    res.json({message: "Logged in successfully", token:"Bearer "+token})
  }else{
    res.json({
      message:"User Authentication Failed"
    })
  }
});

app.get('/users/courses', authenticateUser , async (req, res) => {
  // logic to list all courses
  const courses = await Course.find({published:true});
  res.json(courses);
});

app.post('/users/courses/:courseId', authenticateUser, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course) {
    const user = await User.findOne({ username: req.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/users/purchasedCourses',authenticateUser, async(req, res) => {
  // logic to view purchased courses
  const username = req.username;
  const user = await User.findOne({username}).populate('purchasedCourses');
  if(user){
    var array = user.purchasedCourses;
    const uniqueArray = array.filter((item, index, self) =>
  index === self.findIndex(obj => obj._id === item._id)
);

    res.send({purchasedCourses: uniqueArray || [] })
  }else{
    res.status(403).json({ message: 'User not found' });
  }
  
 });

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
