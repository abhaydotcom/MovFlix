 import {Outlet} from "react-router-dom"
import Header from "./components/header"
import Footer from "./components/footer"
import MobileNav from "./components/mobileNav"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setBannerData, setImageURL } from "./store/movieSlice"
import { useEffect } from "react"
 
 
const App=()=> { 

  const dispatch=useDispatch();

  const fetchTrendingData= async()=>{
      try {
        const response=await axios.get('/3/trending/all/week')
        dispatch(setBannerData(response.data.results))

      } catch (error) {
        console.log("error in trending ",error)
      }
  }
  const fetchConfiguration=async()=>{
    try {
      const response=await axios.get('/3/configuration')
      dispatch(setImageURL(response.data.images.secure_base_url+"original"))
    } catch (error) {
      console.log("Error in configuration",error)
    }
  }
   
  useEffect(()=>{
    fetchTrendingData();
    fetchConfiguration()
  },[])


  return (
    <div className="pb-14 lg:pb-0"  >
      <Header/>
     <div className="min-h-[90vh]  ">
      <Outlet/>
     </div>
    <Footer/>
    <MobileNav/>
    </div>
  )
}

export default App
