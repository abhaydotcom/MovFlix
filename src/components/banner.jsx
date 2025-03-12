import React, { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Loading from './loading'
import { Link } from 'react-router-dom'

const Banner = () => {

    const bannerData=useSelector(state=>state.movieData.bannerData)
    const imageURL=useSelector(state=>state.movieData.imageURL)
    const [currentImage,setCurrentImage]=useState(0)
    const handleprevious=()=>{
    
        if(currentImage>0){
            setCurrentImage(prev=>prev-1)
        }
    }
    const handleNext=()=>{
        if(currentImage<bannerData.length-1){
            setCurrentImage(prev=>prev+1)
        }
    }

    useEffect(()=>{
        const interval=setInterval(()=>{
            if(currentImage< bannerData.length-1){
                handleNext();
            }else{
                setCurrentImage(0)
            }
        },3000)

        return ()=>clearInterval(interval)
    },[imageURL,bannerData,currentImage])

    if(!imageURL)return <Loading/>

    if(!bannerData)return <Loading/>

  return (
    <section className='w-full h-full '>
        <div className='flex min-h-full max-h-[95vh] overflow-hidden  group'>
            {
                bannerData.map((data,idx)=>{
                    return (
                        <div key={data.id+"bannerHome"+idx} className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all ' style={{transform:`translateX(-${currentImage*100}%)`}}>
                            <div className='w-full h-full'>
                                <img src={imageURL+data.backdrop_path} alt="" 
                                 className='h-full w-full object-cover'
                                />
                            </div>


                            {/* Button next and Previous */}

                            <div className='absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex '>
                                <button onClick={handleprevious} className='bg-white text-xl z-10 text-black p-1 rounded-full'>
                                    <FaAngleLeft/>
                                </button >
                                <button  onClick={handleNext} className='bg-white text-xl z-10 text-black p-1 rounded-full'>
                                    <FaAngleRight/>
                                </button>
                            </div>

                            <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'>
                            </div>

                            <div className='container mx-auto'>
                            <div className='  absolute w-full  bottom-0 max-w-md px-3 '>
                                <h1 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>{data?.title || data?.name}</h1>
                                <p className='text-ellipsis line-clamp-3'>{data.overview}</p>
                                <div className='flex items-center gap-4'>
                                        <p>Rating: {Number(data.vote_average).toFixed(1)}+</p> 
                                       <span>|</span>
                                        <p>View: {Number(data.popularity).toFixed(0)}</p>
                                </div>

                                    <Link to={'/'+data?.media_type+'/'+data.id}>
                                        <button className='bg-white px-4 py-2 text-black font-blod rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 transition-all hover:scale-104   '>
                                            Play Now
                                        </button>
                                    </Link>
                            </div>
                            </div>
                           
                            

                            
                        </div>
                    )
                })
            }
        </div>
    </section>
  )
}

export default Banner