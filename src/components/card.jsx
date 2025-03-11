import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Loading from './loading'
 
const Card = ({data,index,trending,media_type}) => {

   
    const imageURL=useSelector(state=>state.movieData.imageURL)
    const mediaType=data.media_type??media_type

   
 if(!imageURL)return <Loading/>
  return (
    <Link to={"/"+mediaType+"/"+data.id} className='w-full min-w-[230px] max-w-[230px]  h-80 rounded overflow-hidden block relative hover:scale-105 transition-all'>
        
        {
             data.poster_path? (
                <img src={imageURL+data?.poster_path} alt="" />
             ):(
                <Loading/>
             )
        }

        <div className='absolute top-0'>
            {
                trending && (
                    <div className='py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden'>   
                        #{index} Trending
                        </div>
                )
            }
        </div>

        <div className='  absolute w-full  bottom-0 h-16 backdrop-blur-3xl bg-black/30 p-2  '>
                                <h1 className='text-ellipsis line-clamp-1 text-lg font-semibold'>{data?.title || data?.name}</h1>
                                <div className='text:sm text-neutral-400 flex justify-between items-center'>
                                    <p>{moment(data.release_date).format("MMM Do YY")}</p>
                                    <p className='text-xs text-white rounded-full bg-black px-1'>Rating: {Number(data.vote_average).toFixed(1)}</p>
                                </div>
                                 
                                </div>
    </Link>
  )
}

export default Card