import React, { useEffect, useState } from "react";

function registration(email, password) {
  
    const dataForBody = {
      username: email,
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    registration(email, password);
  };

  return (
    <div>
      <h1>Register to the website</h1>
      <br />
      <label>Email:</label>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleRegister}>Register</button>
      Already a user? <a href="/login">Login</a>
    </div>
  );
}

export default Register;
