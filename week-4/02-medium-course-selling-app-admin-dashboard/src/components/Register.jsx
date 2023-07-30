
import { useEffect } from 'react';
import './register-login.css'
import RegisterLoginTemplate from "./register-loginTemplate";
import { useNavigate } from "react-router-dom";


function registration(username, password) {
 
    const dataForBody = {
      username: username,
      password: password,
    };
   
    fetch("http://localhost:3000/admin/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(dataForBody),
    })
      .then((response) => response.json())
      .then((jsonifiedData) => {
        console.log("The registered data is: ", jsonifiedData);
        

      });
}


function Register() {
  
  const navigate = useNavigate();
  const handleRegister = (username , password) => {
    registration(username, password);
    navigate("/login")
  };
  

  return (
    <div >
      <RegisterLoginTemplate onSubmit = {handleRegister}/>
    </div>
  );
}

export default Register;
