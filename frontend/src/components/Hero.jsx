import React from 'react'
import { Link } from "react-router-dom";
import {Button} from "../components/ui/button";
import heroImg from "../assets/blog2.png"

const Hero = () => {
  return (
    <div className="px-4 md:px-0"> 
     <div className="max-w-7xl mx-auto flex flex-col ms:flex md:flex-row items-center h-[600px] my-10 md:my-0">  
  
    {/* text selection*/}
    <div className="max-w-2xl ">
        <h1 className="text-4xl md:text-6xl font-bold md-4"> Explore the Latest Tech & Trends </h1>
        <p className="text-lg mg:text-xl opticty-80 mb-6 "> Stay ahead with in-depth articles, tutorials, and insighths on web development, digital markrting, and tech innovations.  </p>
        <div className=" flex space-x-4 ">
            <Link> <Button className="text-lg"> Get Started</Button> </Link>
             <Link> <Button variant="outline" className="border-white px-6 py-3 text-lg "> learn More </Button> </Link>
        </div>
    </div>
    {/* Image Selection */}
     <div className="flex items-center justify-center">
        <img src={heroImg} alt="" className=" md:h-[550px] md:w-[550px]" />
     </div>
    </div>
    </div>
  )
}

export default Hero















