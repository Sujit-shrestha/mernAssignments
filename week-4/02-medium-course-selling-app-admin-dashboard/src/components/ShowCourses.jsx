import React, { useEffect } from "react";
import Landing from "./Landing";
import Cookies from "js-cookie";
function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    let currentToken = Cookies.get("token");
    
   // Add code to fetch courses from the server
    useEffect(
        ()=>{
            fetch("http://localhost:3000/admin/courses",{
                method:"GET",
                headers:{"Authorization" : currentToken}
                }).then((response)=>{
                         return response.json()
                }).then(
                     (data)=>{
                    setCourses(data.courses)
                })

            setInterval(() => {
                fetch("http://localhost:3000/admin/courses",{
                method:"GET",
                headers:{"Authorization" : currentToken}
                }).then((response)=>{
                         return response.json()
                }).then(
                     (data)=>{
                    setCourses(data.courses)
                })
            }, 15000);
            
        } , [])
   

    
    
    // and set it in the courses state variable.
    return <div>
        <Landing/>
        <h1>Create Course Page</h1>
        {courses.map(c => <Course title={c.title} />)}
    </div>
}

function Course(props) {
    return <div>
        
        <h1>{props.title}</h1>
    </div>
}

export default ShowCourses;