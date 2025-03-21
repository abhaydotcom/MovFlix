import axios from "axios";
import { useEffect, useState } from "react";

const useFetchDetails=(endpoint)=>{
    const [data,setData]=useState();
    const [loading,setLoading]=useState(false);

    const fetchData=async()=>{
      try {
        setLoading(true)
        const respone=await axios.get(endpoint)
        setLoading(false)
        setData(respone.data);
      } catch (error) {
          console.log("error in fetchNowPlaying",error)
      }
    }
  
    useEffect(()=>{
      fetchData()
    },[endpoint])

    return {data,loading}

}

export default useFetchDetails