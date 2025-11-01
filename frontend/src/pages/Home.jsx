import React from 'react'
import {Button} from "../components/ui/button";
import Hero from "../components/Hero"
import RecentBlogs from '@/components/RecentBlogs';
import PopularAuthors from '@/components/PopularAuthors';

function Home() {
  return (
    <div className=" pt-20">
     <Hero/>
     <RecentBlogs/>
     <PopularAuthors/>
    </div>
  )
}

export default Home;



