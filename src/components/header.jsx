import React, { useEffect, useState } from 'react'
 
import user from "../assets/user.png"
import {Link, NavLink ,useLocation,useNavigate} from "react-router-dom"
import { IoSearchOutline } from 'react-icons/io5'
import navigation from '../navigation/navigation'
import {motion } from 'framer-motion'


const Header = () => {

 const location=useLocation();
 const removeSpace=location?.search?.slice(3)?.split("%20")?.join(" ")
 
 const[searchInput,setSearchInput]=useState(removeSpace);
 const navigate=useNavigate();

 const handleSubmit=(e)=>{
    e.preventDefault();
 
 }

 useEffect(()=>{
  if(searchInput){ navigate(`/search?q=${searchInput}`)}
 },[searchInput])




 const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setIsVisible(false); // Hide on scroll down
            } else {
                setIsVisible(true); // Show on scroll up
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);




  return (
    <motion.div 
    initial={{ y: 0 }}
    animate={{ y: isVisible ? 0 : "-100%"  }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className=' fixed top-0 w-full h-16  bg-black/60   z-40'>
      <div className='container mx-auto px-5 flex items-center h-full'>
        <Link to={'/'}  >
          {/* <img src={logo} alt="Logo img" width={120}  /> */}
          <h1 className='text-3xl font-bold text-purple-600 mb-2'>ᴍᴏᴠꜰʟɪχ</h1>
        </Link>

      <nav className='hidden lg:flex items-center gap-3 ml-5 '>
        {
          navigation.map((nav,idx)=>{
            return (
              <div>
                <NavLink key={nav.label+"header"+idx} to={nav.href} className={({isActive})=>`px-2  hover:text-neutral-400  ${isActive && 'underline '}`}>
                  {nav.label}
                </NavLink>
              </div>
            )
          })
        }
      </nav>

      <div className='ml-auto flex items-center gap-5'>

          <form className='flex items-center gap-3' onSubmit={handleSubmit}>
            <input type="text"
            placeholder='Search movies...'
            className='bg-transparent px-4 py-1 outline-none border-none  hidden   lg:block '
            onChange={(e)=>setSearchInput(e.target.value)}
            value={searchInput}
            
            />
            <button className=' text-2xl active:scale-80 transition-all text-white '>
            <IoSearchOutline/>
            </button>
          </form>

      

      </div>


      </div>
    </motion.div>
  )
}

export default Header