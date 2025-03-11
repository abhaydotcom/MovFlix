import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/card'
import Loading from '../components/loading'

const ExplorePage = () => {

  const params=useParams()
  const [pageNo,setPageNo]=useState(1)
  const [data,setData]=useState([])
  const [totalPage,setTotalPage]=useState(0 )
  const fetchData=async()=>{
    try {
      const response=await axios.get(`/3/discover/${params.explore}`,{
        params:{
          page:pageNo
        }
      })
      setData((prev)=>{
        return[
          ...prev,
          ...response.data.results
        ]
      })
      setTotalPage(response.data.total_pages)
       
    } catch (error) {
      console.log("error in explore page ",error)
    }
  }

  const handleScroll=()=>{
    if((window.innerHeight + window.scrollY)>=document.body.offsetHeight){
      setPageNo(prev=>prev+1)
    }
  }

  useEffect(()=>{
    fetchData()
  },[pageNo])

  useEffect(()=>{
    setPageNo(1);
    setData([])
    fetchData()
  },[params.explore])

  useEffect(()=>{
    window.addEventListener('scroll',handleScroll)
  },[])
  
  if(!data)return <Loading/>
  return (
    <div className='py-16'>
      <div className='container mx-auto'>
          <h3 className='capitalize text-lg lg:text-xl font-semibold'>Popular {params.explore}</h3>
          <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-4 px-3 py-3 justify-center lg:justify-start'>
            {
              data.map((exploreData)=>{
                return(
                  <Card data={exploreData} key={exploreData.id+'exploreSection'} media_type={params.explore} />
                )
              })
            }
          </div>
      </div>

    </div>
  )
}

export default ExplorePage