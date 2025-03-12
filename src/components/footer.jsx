import React from 'react'
import { Link } from 'react-router-dom'
import linkLogo from '../assets/linkLogo.png'

const Footer = () => {
  return (
   <footer className='text-center   bg-neutral-800 bg-opacity-35 py-2 text-neutral-400'>
    <div className='flex items-center justify-center  font-mono  gap-4 '>
      <Link className=' hover:text-neutral-600 ' to={'/'}>About</Link>
      <Link className=' hover:text-neutral-600 ' to={'/'}>Contact
       
      </Link >
      <Link to={ 'https://www.linkedin.com/in/abhaydotcom/' }> <img src={linkLogo}  className='text-blue-400 bg-blue-500 hover:bg-blue-700' width={25} alt="" /></Link>
    </div>
    <p className='text-sm mt-4 '>Created By 💗𝓐𝓫𝓱𝓪𝔂</p>
   </footer>
  )
}

export default Footer