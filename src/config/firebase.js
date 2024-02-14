import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc,addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdIAViR-QQ8ezfktjU0zdIlahhDrKZOfA",
  authDomain: "fire-base-e703c.firebaseapp.com",
  projectId: "fire-base-e703c",
  storageBucket: "fire-base-e703c.appspot.com",
  messagingSenderId: "648516897593",
  appId: "1:648516897593:web:da8fbd86673a1e612a36e8",
  measurementId: "G-NK0VFMXF07"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();

export async function signIn(userdata) {
  const { email, password } = userdata
  await signInWithEmailAndPassword(auth, email, password)
}

export async function signUp(userdata) {
  const { email, password, contact, username } = userdata
  const { user: { uid } } = await createUserWithEmailAndPassword(auth, email, password)
  console.log('id-->', uid)
  await setDoc(doc(db, "userInfo", uid), {
    contact,
    username
  });
}

export async function getAllProducts() {
  const querySnapshot = await getDocs(collection(db, "Ads"));
  const products = []
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() })
  })
  return products
}

export async function getpro(id) {
  const docRef = doc(db, "Ads", id);
  console.log(docRef)
  const docSnap = await getDoc(docRef);
  var data
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    data = docSnap.data()
  } else {
    console.log("No such document!");
  }
  console.log('this is data -->', data)
  return data
}
export async function userAds(Ads) {
  try {
    const { url: { name } } = Ads
    const storageRef = ref(storage, 'Images/' + name);
   await uploadBytes(storageRef, Ads.url)
    const url = await getDownloadURL(storageRef)
    return url

  }
  catch (e) {
    alert(e.message)
  }
}
// multi images
export async function multiImages(Ads){
  debugger
  const all =[]
  const {multiImage} = Ads
  for( let i =0; i<multiImage.length; i++){
    const storageRef = ref(storage,`/mutlipleImages/${multiImage[i].name}`);
    await uploadBytes(storageRef, multiImage[i])
    .then(() =>{
      console.log('success')
    }).catch(()=>{
      console.log('failed')
    })
    const url = await getDownloadURL(storageRef)
   all.push(url)
    
  }
return
}
export async function addData(Ads) {
  try {
    const docRef = await addDoc(collection(db, "Ads"),Ads );
    console.log("Document written with ID: ", docRef.id);
    console.log('THis is the add from fb',Ads)
  } catch (e) {
    console.log(e.message)
  }
}
