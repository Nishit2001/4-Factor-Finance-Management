import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {FcGoogle} from "react-icons/fc"
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useSelector,useDispatch } from 'react-redux';
import { setIsLoggedin } from '../redux/Slices/LoginSlice';

const LoginForm = () => {
    const isLoggedIn = useSelector((state)=>state.isLoggedin.isLoggedin)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState( {
        email:"", password:""
    })

    const[showPassword, setShowPassword] = useState(false);

    function changeHandler(event) {

        setFormData( (prevData) =>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ) )

    }

    async function submitHandler(event) {
        event.preventDefault();
        try{
            await signInWithEmailAndPassword(auth,formData.email,formData.password)
            dispatch(setIsLoggedin(true));
            toast.success("Logged In");
            navigate("/");
        }
        catch(e){
            toast.error(e);
        }
    }

  return (
    <div>
    <header class="flex bg-gray-800 text-white p-6">
        <div class="container mx-auto text-center">
            <h1 class="text-4xl font-bold">Login to Your Account</h1>
            <p class="text-lg mt-2">Access your SpendSmart dashboard and manage your finances.</p>
        </div>
    </header>

    <section class="bg-white py-12">
    <div class="container mx-auto max-w-lg p-6 bg-gray-100 rounded-lg shadow-lg">
    <form onSubmit={submitHandler}
    className="flex flex-col w-full gap-y-4 mt-6">

        <label className='w-full'>
            <p className='block text-gray-800 font-bold'>
                Email Address<sup className='text-pink-200'>*</sup>
            </p>
            <input 
                required
                type="email"
                value = {formData.email}
                onChange={changeHandler}
                placeholder="Enter email address"
                name="email"
                className='w-full p-3 mt-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#2ee8c3]  '
            />
        </label>

        <label className='w-full relative'>
            <p className='block text-gray-800 font-bold'>
                Password<sup className='text-pink-200'>*</sup>
            </p>
            <input 
                required
                type= {showPassword ? ("text") : ("password")}
                value = {formData.password}
                onChange={changeHandler}
                placeholder="Enter Password"
                name="password"
                className='w-full p-3 mt-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#2ee8c3]' 
            />

            <span 
            className='absolute right-3 top-[38px] cursor-pointer'
            onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? 

                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
            </span>

            <Link to="#">
                <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
                    Forgot Password
                </p>
            </Link>
        </label>

        <button type='submit' className='w-full bg-gray-800 text-[#2ee8c3] border-2 border-[#2ee8c3] hover:text-gray-800 hover:bg-[#2ee8c3] py-3 rounded-lg font-bold transition-all duration-200'>
            Sign In
        </button>

        <div class="text-center mt-4">
            <p class="text-gray-600">
                <a href="/forgot-password" class="text-[#2ee8c3] hover:text-gray-800">Forgot Password?</a>
            </p>
            <p class="text-gray-600 mt-2">Don't have an account? <a href="/signup" class="text-[#2ee8c3] hover:text-gray-800">Sign Up</a>
            </p>
        </div>

        <div className='flex w-full items-center my-4 gap-x-2'>
                <div className='w-6/12 h-[1px] bg-black'></div>
                <p className='text-black font-medium leading[1.375rem]'>
                    OR
                </p>
                <div className='w-6/12 h-[1px] bg-black'></div>
            </div>

            <button className='w-full flex justify-center items-center gap-x-2 bg-gray-800 text-[#2ee8c3] border-2 border-[#2ee8c3] hover:text-gray-800 hover:bg-[#2ee8c3] py-3 rounded-lg font-bold'>
                <FcGoogle/>
                <p>Sign In with Google</p>
            </button>

    </form>
    </div>
    </section>
    </div>
  )
}

export default LoginForm
