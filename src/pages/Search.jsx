import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/card'

const Search = () => {

  const [data,setData]=useState([])
  const [page,setPage]=useState(1)
  const location=useLocation();
  const navigate=useNavigate();

 const query=location?.search?.slice(3)

  const fetchData=async()=>{
    try {
      const response=await axios.get(`/3/search/multi`,{
        params:{
          query:location?.search?.slice(3),
          page:page
        }
      })
      setData((prev)=>{
        return[
          ...prev,
          ...response.data.results
        ]
      })
       
    } catch (error) {
      console.log("error in explore page ",error)
    }
  }

  const handleScroll=()=>{
    if((window.innerHeight + window.scrollY)>= document.body.offsetHeight){
      setPage(prev=>prev+1)
    }
  }

  useEffect(()=>{
    if(query){
      setData([])
      setPage(1)
      fetchData()
    }
  },[location?.search])

  useEffect(()=>{
    if(query){
      fetchData()
    }
  },[page])

  useEffect(()=>{
    window.addEventListener('scroll',handleScroll)
  },[])

  return (
    <div className=" py-16">
      <div className="lg:hidden my-2 mx-1 sticky top-[70px] z-30">
        <input
          type="text"
          placeholder="Search here..."
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          value={query?.split("%20")?.join(" ")}
          className="px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900 "
        />
      </div>

      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold">
          Search Results
        </h3>

        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-4 px-3 py-3 justify-center lg:justify-start">
          {data.map((searchData) => {
            return (
              <Card
                data={searchData}
                key={searchData.id + "search"}
                media_type={searchData.media_type}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Search