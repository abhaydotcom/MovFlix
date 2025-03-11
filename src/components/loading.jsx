import React from 'react'
import loadingGif from '../assets/loading.gif'

const Loading = () => {
  return (
    <div className='h-screen w-full bg-[#171C1D] flex justify-center items-center'>
    <img src={loadingGif} className='select-none max-h-full max-w-full object-cove' />
    </div>
  )
}

export default Loading