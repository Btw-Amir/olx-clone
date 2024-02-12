import React,{useEffect,useState} from 'react'
import './post.css'
// import Map from 'react-map-gl';
// import { useNavigate } from 'react-router-dom';
import Footer from "../../Components/Footer/Footer"
import {userAds } from '../../config/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addData } from '../../config/firebase';
import { Try } from '@mui/icons-material';
// import Map, { Marker } from 'react-map-gl';

export default function Post() {
  // const navigate = useNavigate()
  const [latitude, setlatitude] = useState()
  const [longitude, setlongitude] = useState()

  //   const [Viewport, setViewport] = useState({
  //       width: "100%",
  //       height: "100%",
  //       latitude: '24.8827022',
  //       longitude: '67.0669543',
  //       zoom: 16,
  //     });
  //   // console.log('user inside the compoinent', user)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((location) => {
            const { latitude, longitude } = location.coords
            setlatitude(latitude)
            setlongitude(longitude)
        })
        
    }, [])
useEffect(()=>{
  // userdata()
  // getuser()
  getAddress()
  // AdsInfo ()
},[])
function getAddress (latitude, longitude) {
    try {
      return new Promise(function (resolve, reject) {
          var request = new XMLHttpRequest();
          var method = 'GET';
          var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=24.8524824,67.0852996&sensor=true';
          var async = true;
          request.open(method, url, async);
          request.onreadystatechange = function () {
              if (request.readyState == 4) {
                  if (request.status == 200) {
                      var data = JSON.parse(request.responseText);
                      var address = data.results[0];
                      console.log(address)
                      resolve(address);
                  }
                  else {
                      reject(request.status);
                  }
              }
          };
          request.send();
      });
  }
      catch (error) {
        console.log('map ka error --->',error.message)
    }
    getAddress(24.8524824, 67.0852996).then(console.log).catch(console.error);
};
const [userEmail,setUserEmail]=useState()
const [title,setTitle]= useState('')
const [brand,setBrand]= useState('')
const [neww,setCondition]= useState('')
const [price,setPrice]= useState('')
const [url,setImage]= useState('')
// const [Image1,setImage1]= useState('')
// const [Image1,setImage2]= useState('')
// const [Image1,setImage3]= useState('')

const [description,setDesciption]= useState('')
  function getuser() {
    const auth = getAuth();
    console.log(url)
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

          // location:latitude,longitude
         }
        // console.log( Ads.url.name) 
       const image =  await userAds(Ads)
       console.log(image)
       Ads.url = image
       addData(Ads)
         alert('data sucessfully added to firebase')
        //  const{Image:{name}}= Ads
        //  console.log(Ads.Image)
        //  console.log (name)
        //  console.log(userEmail)
         
      
     } else {
      alert('please login')
       setUserEmail('Login')
     }
   }
   );
 }
  // async function userdata(){
  //   const userEmail = await getuser()
  //   setUserEmail(userEmail.email)
  //   return userEmail
  // }


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
  {/* <div className="container">
    <p>
      <b>UPLOAD SOME PICTURES OF PROCDUCT</b>
    </p>
    <input type="file" name="Image" id="file " 
    onChange={(e) => setImage1(e.target.files[1])}
     />
     <input type="file" name="Image" id="file " 
    onChange={(e) => setImage2(e.target.files[2])}
     /><input type="file" name="Image" id="file " 
     onChange={(e) => setImage3(e.target.files[3])}
      />
  </div> */}
  <div>
    
  <iframe src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.1438062765446!2d${latitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33c01e40a571b%3A0xf9e6a42d8b197f90!2sManzoor%20Colony%20Fire%20Station!5e0!3m2!1sen!2s!4v1707599373746!5m2!1sen!2s`} width="500" height="350" style={{border:0,marginLeft:62}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
{/*  
  {location && <Map
            mapboxAccessToken=""
            initialViewState={{
                longitude: location.longitude,
                latitude: location.latitude,
                zoom: 16
            }}
            style={{ width: 600, height: 400, overflow: 'hidden' }}
            mapStyle="mapbox://styles/muzammil144/ckth155c31as017qfkormprrh"
        >
            <Marker
                draggable={true}
                onDragEnd={e => console.log(e)}
                offsetLeft={-20}
                offsetTop={-10}
                longitude={location.longitude} latitude={location.latitude} anchor="bottom" >
                <p
                        role="img"
                        className="cursor-pointer text-2xl animate-bounce"
                        aria-label="pin"
                      >
                        📍
                      </p>
            </Marker>
        </Map>} */}

  <div className="container">
    <button id="post-btn" className="post-btn" onClick={getuser} >
      Post now
    </button>
  </div>

      <Footer/>
    </div>

  )
}