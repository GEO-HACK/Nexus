import React from 'react'
import Hero from '../components/Hero'
import Categories from "../components/Categories"
import Research from "../components/Research"
import Features from "../components/Features"
import Stats from "../components/Stats"
import Testimonials from "../components/Testimonials"
import CTA from "../components/CTA"

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Stats />
      <Features />
      <Research />
      <Categories />
      <Testimonials />
      <CTA />
    </div>
  )
}

export default Home