import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import TextScroll from '../components/TextScroll'
import ImageSlider from '../components/ImgeSlider'
import HomeVideo from '../components/HomeVideo'
import ImageSlider2 from '../components/ImageSlider2'
import Herovideo1 from '../components/Herovideo1'

const Home = () => {
  return (
    <div className='flex flex-col'>
      <Herovideo1/>
      {/* <Hero /> */}
      <LatestCollection />
      <TextScroll />
      <HomeVideo />
      <BestSeller />
      <ImageSlider />
      <ImageSlider2 />
      <OurPolicy />
      {/* <NewsletterBox /> */}
    </div>
  )
}

export default Home;