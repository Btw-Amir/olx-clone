import React,{useEffect,useState} from 'react'
import './post.css'
// import { useNavigate } from 'react-router-dom';
import Footer from "../../Components/Footer/Footer"
import {userAds,addData,multiImages } from '../../config/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Post() {
  // const navigate = useNavigate()
  const [latitude, setlatitude] = useState()
  const [longitude, setlongitude] = useState()
  const [userEmail,setUserEmail]=useState()
  const [title,setTitle]= useState('')
  const [brand,setBrand]= useState('')
  const [neww,setCondition]= useState('')
  const [price,setPrice]= useState('')
  const [url,setImage]= useState('')
  const [multiImage,setMultiImage]= useState('')
  const [description,setDesciption]= useState('')
  
  useEffect(() => {
        navigator.geolocation.getCurrentPosition((location) => {
            const { latitude, longitude } = location.coords
            setlatitude(latitude)
            setlongitude(longitude)
        })
    }, [])
// post ads
  function getuser() {
    const auth = getAuth();
    console.log(longitude)
     onAuthStateChanged(auth, async(user) => {
     if (user) {
       setUserEmail(user.email)
        const Ads ={
          title,
          brand,
        neww,
          price,
          description,
          url ,
          userEmail,
          multiImage
         }
       const image =  await userAds(Ads)
       const multiPic = await multiImages(Ads)
       console.log('multiple images --->',multiPic)
       Ads.url = image
       Ads.multiImage=multiPic
       addData(Ads)
       console.log('Final ad -->',Ads)

     } 
     else {
      alert('User not found ,please login')
       setUserEmail('Login')
     }
   }
   
   );
  
 }

 return (
      <div>
  <nav className="navbar navbar-light bg-light">
    <div className="fluid-container px-4">
        <img
          width={30}
          height={34}
          src="https://www.olx.com.pk/assets/logo_noinline.1cdf230e49c0530ad4b8d43e37ecc4a4.svg"
          alt="Logo"
          className="ae10437e"
        />
    </div>
    {/* <Try/> */}
  </nav>

  <div className="txt">
    <p>
      <b>POST YOUR AD</b>
    </p>
  </div>
  <div className="container">
    <div className="sub-cont-1">
      <p>
        <b>INCLUDES SOME DETAILS</b>
      </p>
      <label htmlFor="title">Ad title</label>
      <br />
      <input type="text" name="title" id="" 
      onChange={(e) => setTitle(e.target.value)}
       />
      <br />
      <label htmlFor="Discription">Description</label>
      <br />
      <textarea
        id="Description"
        name="Description"
        cols={135}
        rows={10}
        defaultValue={""}
        onChange={(e) => setDesciption(e.target.value)}
      />
      <br />
      <p>Inculde condition, features and reasons for selling</p>
      <label htmlFor="Brand">Brand</label>
      <br />
      <input type="text" name="Brand" id="" 
      onChange={(e) => setBrand(e.target.value)} 
      />
      <br />
      <label htmlFor="condition">condition</label>
      <br />
        <input type="text" name="Condition" id="" 
        onChange={(e) => setCondition(e.target.value)} 
        />
      <br />
    </div>
  </div>
  <div className="container">
    <p>
      <b>SET A PRICE</b>
    </p>
    <label htmlFor="price">Price</label>
    <br />
    <input type="number" name="Price" id="" 
    onChange={(e) => setPrice(e.target.value)} 
    />
  </div>
  <div className="container">
    <p>
      <b>UPLOAD THUMBNAIL OF PROCDUCT</b>
    </p>
    <input type="file" name="Image" id="file " 
    onChange={(e) => setImage(e.target.files[0])}
     />
  </div>
  <div className="container">
    <p>
      <b>UPLOAD SOME PICTURES OF PROCDUCT</b>
    </p>
    <input type="file" name="Image" id="file " multiple
    onChange={(e) => setMultiImage(e.target.files)}
     />
  </div>
  <div >
    
  <iframe title='Google-Map' src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.1438062765446!2d${latitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33c01e40a571b%3A0xf9e6a42d8b197f90!2sManzoor%20Colony%20Fire%20Station!5e0!3m2!1sen!2s!4v1707599373746!5m2!1sen!2s`} width="500" height="350" style={{border:0,marginLeft:62}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
  <div className="container">
    <button id="post-btn" className="post-btn" onClick={getuser} >
      Post now
    </button>
  </div>

      <Footer/>
    </div>

  )
}