import Helmet from 'react-helmet'
import React from "react";
import LandingCSS from "./Landing.module.css"
import { useState } from 'react';
import {useRef} from "react" ;
/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
    const[iconName , setIconName] = useState('menu');
    const [showNavLinks, setShowNavLinks] = useState(false);
  //  const navlinks = document.querySelector('.nav-links')
    
    const onToggleMenu = (e)=>{
        setIconName(
            (prevIconName) => (prevIconName === 'menu' ? 'close' : 'menu')
        )
        setShowNavLinks(prevShowNavLinks => !prevShowNavLinks);
       //navlinks.classList.toggle();
    }
     

    return <>
      <Helmet>
            <script  src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        </Helmet>
    
    <div>
      
        <header className="bg-white">
            <nav className="flex justify-between items-center w-[92%]">
                <div>
                    <img className="w-16" src="https://www.shutterstock.com/image-vector/simple-c-education-pin-map-600w-1870149382.jpg" ></img>
                </div>
                <div 
                className={`nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 ${
                    showNavLinks ? 'top-[9%]' : 'top-[-100%]'
                  } md:w-auto w-full flex md:items-center px-5`}
                >
                    
                    <ul className="flex md:flex-row flex-col md:item-center gap-[4vw] gap-8">
                        <li>
                            <a className="hover:text-gray-500" href="/about">Login</a>
                        </li>
                        <li>
                            <a className="hover:text-gray-500" href="/courses">Courses</a>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-4">
                    <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"><a href="/login">Login</a></button>
                    <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"><a href="/register">Sign Up</a></button>
                    <div className="text-3xl cursor-pointer md:hidden" >
                        <ion-icon name={iconName} onClick={onToggleMenu}></ion-icon>
                    </div>
                    
                </div>
            </nav>
        </header>
       
    </div>
    </>
}

export default Landing;