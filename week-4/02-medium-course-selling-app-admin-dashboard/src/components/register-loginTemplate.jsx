import Helmet from 'react-helmet'
import { useState } from 'react'
function RegisterLoginTemplate(props){
  const [Rusername , setRusername] = useState("");
  const [Rpassword , setRpassword] = useState("");

  const handleUsername = (e)=>{
    setRusername(e.target.value)
  }
  const handlePassword = (e)=>{
    setRpassword(e.target.value)
  }
  const handleSignupSubmit = (e)=>{
    e.preventDefault();
   console.log(Rusername + " in the handleSubmit" + Rpassword)
   
    props.onSubmit(Rusername , Rpassword);
  }

  
 

  return (<div>
    <Helmet> 
    
    <title> Login and Registration Form in HTML & CSS | CodingLab </title>
    <link rel="stylesheet" href="style.css"/>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
   
    </Helmet>
  
    
    <div class="container">
  <input type="checkbox" id="flip" />
  <div class="cover">
    <div class="front">
      <img src="images/frontImg.jpg" alt="" />
      <div class="text">
        <span class="text-1">Every new friend is a <br/> new adventure</span>
        <span class="text-2">Let's get connected</span>
      </div>
    </div>
    <div class="back">
      <img class="backImg" src="images/backImg.jpg" alt="" />
      <div class="text">
        <span class="text-1">Complete miles of journey <br/> with one step</span>
        <span class="text-2">Let's get started</span>
      </div>
    </div>
  </div>
  <div class="forms">
      <div class="form-content">
        <div class="login-form">
          <div class="title">Login</div>
        <form action="#">
          <div class="input-boxes">
            <div class="input-box">
              <i class="fas fa-envelope"></i>
              <input type="text" placeholder="Enter your email" required />
            </div>
            <div class="input-box">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Enter your password" required />
            </div>
            <div class="text"><a href="#">Forgot password?</a></div>
            <div class="button input-box">
              <input type="submit" value="Sumbit" />
            </div>
            <div class="text sign-up-text">Don't have an account? <label for="flip">Sigup now</label></div>
          </div>
      </form>
    </div>
      <div class="signup-form">
        <div class="title">Signup</div>
      <form onSubmit={handleSignupSubmit}>
          <div class="input-boxes">
            <div class="input-box">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="Enter your username" required  onChange={handleUsername}/>
            </div>
            <div class="input-box">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Enter your password" required onChange={handlePassword}/>
            </div>
            <div class="button input-box">
              <input type="submit" value="Sumbit" />
            </div>
            <div class="text sign-up-text">Already have an account? <label for="flip">Login now</label></div>
          </div>
    </form>
  </div>
  </div>
  </div>
</div>
</div>
  )
}
export default RegisterLoginTemplate