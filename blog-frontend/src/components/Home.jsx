import React from 'react'
import Hero from "../home/Hero.jsx"
import Trending from "../home/Trending.jsx"
import Educational from "../home/Educational.jsx"

const Home = () => {
  return (
    <div className='bg-neutral-200'>
      <Hero/>
      <Trending/>
      <Educational/>
    </div>
  )
}

export default Home
