import React from 'react'
import logo from "../assets/Spend.png"
import {Link} from "react-router-dom"
import {toast} from "react-hot-toast"
import { useSelector,useDispatch} from "react-redux"
import { setIsLoggedin } from '../redux/Slices/LoginSlice';
const Navbar = () => {

    const isLoggedIn = useSelector((state)=>state.isLoggedin.isLoggedin)
    const dispatch = useDispatch();

  return (
    <div className='flex w-full justify-around bg-gray-800 py-2 items-center'>
        
        <Link to="/"> 
          <div className='flex'>
            <img src={logo} alt="Logo" width={80} height={17} loading="lazy"/>
            <span class="container mx-auto flex justify-between items-center">
            <div class="text-3xl font-bold text-white tracking-wide">
                Spend<span class="text-[#2ee8c3]">Smart</span>
            </div>
            </span>
          </div>
        </Link>
        {isLoggedIn?(<nav><ul className='text-richblack-100 flex gap-x-6'>
                <li class="relative group">
                    <Link to="/" class="group text-white group-hover:text-[#2ee8c3]">Home</Link>
                    <span class="absolute left-0 bottom-0 top-7 w-0 group-hover:w-full h-0.5 bg-[#2ee8c3] ease-in-out duration-500"></span>
                </li>
                <li class="relative group">
                    <Link to="/earnings" class="text-white hover:text-[#2ee8c3]">Earnings</Link>
                    <span class="absolute left-0 bottom-0 top-7 w-0 group-hover:w-full h-0.5 bg-[#2ee8c3] ease-in-out duration-500"></span>
                </li>
                <li class="relative group">
                    <Link to="/expences" class="text-white hover:text-[#2ee8c3]">Expences</Link>
                    <span class="absolute left-0 bottom-0 top-7 w-0 group-hover:w-full h-0.5 bg-[#2ee8c3] ease-in-out duration-500"></span>
                </li>
                <li class="relative group">
                    <Link to="/investments" class="text-white hover:text-[#2ee8c3]">Investments</Link>
                    <span class="absolute left-0 bottom-0 top-7 w-0 group-hover:w-full h-0.5 bg-[#2ee8c3] ease-in-out duration-500"></span>
                </li>
                <li class="relative group">
                    <Link to="/liabilities" class="text-white hover:text-[#2ee8c3]">Liabilities</Link>
                    <span class="absolute left-0 bottom-0 top-7 w-0 group-hover:w-full h-0.5 bg-[#2ee8c3] ease-in-out duration-500"></span>
                </li>
            </ul>
            </nav>):
        (<nav>
            <ul className='text-richblack-100 tracking-wider flex gap-x-6'>
                <li class="relative group">
                    <Link to="/" class="text-white hover:text-[#2ee8c3]">Home</Link>
                    <span class="absolute left-0 bottom-0 top-7 w-0 group-hover:w-full h-0.5 bg-[#2ee8c3] ease-in-out duration-500"></span>
                </li>
                <li class="relative group">
                    <Link to="/about" class="text-white hover:text-[#2ee8c3]">About</Link>
                    <span class="absolute left-0 bottom-0 top-7 w-0 group-hover:w-full h-0.5 bg-[#2ee8c3] ease-in-out duration-500"></span>
                </li>
            </ul>
        </nav>)
        }
        {/* Login - SignUp - LogOut - Dashboard */}
        <div className='flex items-center gap-x-4'>
            { !isLoggedIn &&
                <Link to="/login">
                    <button className='bg-gray-800 text-[#2ee8c3] border-2 border-[#2ee8c3] hover:text-gray-800 hover:bg-[#2ee8c3] py-[8px] 
                    px-[12px] rounded-[8px]'>
                        Log in
                    </button>
                </Link>
            }
            { !isLoggedIn &&
                <Link to="/signup">
                    <button  className='bg-gray-800 text-[#2ee8c3] border-2 border-[#2ee8c3] hover:text-gray-800 hover:bg-[#2ee8c3] py-[8px] 
                    px-[12px] rounded-[8px]'>
                        Sign up
                    </button>
                </Link>
            }
            { isLoggedIn &&
                <Link to="/">
                    <button onClick={() => {
                        dispatch(setIsLoggedin(false));
                        toast.success("Logged Out");
                    }}
                    className='bg-gray-800 text-[#2ee8c3] border-2 border-[#2ee8c3] hover:text-gray-800 hover:bg-[#2ee8c3] py-[8px] 
                    px-[12px] rounded-[8px]'>
                        Log Out
                    </button>
                </Link>
            }
        </div>
      
    </div>
  )
}

export default Navbar
