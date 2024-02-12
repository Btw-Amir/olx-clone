import React, { useEffect,useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Slider from '../../Components/Slider/Slider'
import Products from '../../Components/Products/Products'
import Footer from '../../Components/Footer/Footer'
import { getAllProducts } from '../../config/firebase'
export default function Dashboard() {
  const [ads, setAds] = useState([])
  useEffect(() => {
    getAds()
  }, [])
  async function getAds() {
    const res = await getAllProducts()
    setAds(res)
  }
  return (
    <div>
      <Navbar/>
      <Slider/>
      <div className='parent-card'>

      <div className='card-cover'>

        {ads.map(function (item, index) {
          return <Products data={ads} key={index} sno={index} />
        })}
      </div>
      </div>

      <Footer/>
    </div>
  )
}
