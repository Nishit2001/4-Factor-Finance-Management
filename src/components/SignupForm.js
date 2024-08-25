import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import {FcGoogle} from "react-icons/fc"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth,db} from './firebase';
import {addDoc,setDoc,collection,doc} from "firebase/firestore"
import { useDispatch } from 'react-redux';
import { setIsLoggedin } from '../redux/Slices/LoginSlice';

const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState("personal");

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
        if(formData.password === '' && formData.confirmPassword === ''){
            toast.error("Password field mustn't be empty");
            return;
        }
        else if(formData.password !== '' && formData.confirmPassword !== ''){
            if(formData.password !== formData.confirmPassword) {
                toast.error("Passwords do not match");
                return ;
            }
            else{
                try{
                    await createUserWithEmailAndPassword(auth, formData.email, formData.password)
                    const user = auth.currentUser;
                    if(user){
                        const val = doc(db,"Users",user.uid);
                        await setDoc(val,{
                            email:user.email,
                            firstname : formData.firstName,
                            lastname : formData.lastName,
                            accountType : accountType,
                        });
                    }
                    dispatch(setIsLoggedin(true));
                    toast.success("Account Created");
                    navigate("/");
                }
                catch(e){
                    toast.error(e.message);
                }
            }
        }
    }


  return (
    <div>
        <header class="flex bg-gray-800 text-white p-6">
            <div class="container mx-auto text-center">
                <h1 class="text-4xl font-bold">Create Your Account</h1>
                <p class="text-lg mt-2">Join SpendSmart and start managing your finances today!</p>
            </div>
        </header>
    <section class="bg-white py-12">
    <div class="container mx-auto max-w-lg p-6 bg-gray-100 rounded-lg shadow-lg">
        <div className='flex bg-white p-1 gap-x-1 my-6 rounded-full max-w-max'>

            <button
            className={`${accountType === "personal" 
            ?
              "bg-gray-800 text-[#2ee8c3] border-2 font-bold border-[#2ee8c3]"
            :"bg-transparent text-gray-800 vborder-2 font-bold border-[#2ee8c3]"} py-2 px-5 rounded-full transition-all duration-200`}
            onClick={()=> setAccountType("personal")}>
                Personal
            </button>

            <button
            className={`${accountType === "business" 
            ?
              "bg-gray-800 text-[#2ee8c3] border-2 font-bold border-[#2ee8c3]"
            :"bg-transparent text-gray-800 vborder-2 font-bold border-[#2ee8c3]"} py-2 px-5 rounded-full transition-all duration-200`}
            onClick={() => setAccountType("business")}>
                Business
            </button>
        </div>

        <form onSubmit={submitHandler} >
        {/* first name and lastName */}
            <div className='flex gap-x-4 mt-[20px]'>
                    <label className='w-full'>
                        <p className='block text-gray-800 font-bold'>First Name<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            className='w-full p-3 mt-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#2ee8c3]                '
                        />
                    </label>

                    <label className='w-full'>
                        <p className='block text-gray-800 font-bold'>Last Name<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            className='w-full p-3 mt-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#2ee8c3]'
                        />
                    </label>
            </div>
            {/* email Add */}
            <div className='mt-[20px]'>
            <label className='w-full mt-[20px]'>
                    <p className='block text-gray-800 font-bold'>Email Address<sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type="email"
                        name="email"
                        onChange={changeHandler}
                        placeholder="Enter Email Address "
                        value={formData.email}
                        className='w-full p-3 mt-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#2ee8c3]'
                    />
            </label>
            </div>
            

            {/* createPassword and Confirm Password */}
            <div className='w-full flex gap-x-4 mt-[20px]'>
                <label className='w-full relative'>
                    <p className='block text-gray-800 font-bold'>Create Password<sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type= {showPassword ? ("text") : ("password")}
                        name="password"
                        onChange={changeHandler}
                        placeholder="Enter Password"
                        value={formData.password}
                        className='w-full p-3 mt-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#2ee8c3]'
                    />
                    <span
                     className='absolute right-3 top-[38px] cursor-pointer' 
                    onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? 

                        (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                        (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                    </span>
                </label>
            </div>
            <div class='mt-[20px]'>
                <label className='w-full relative'>
                    <p className='block text-gray-800 font-bold'>Confirm Password<sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type= {showConfirmPassword ? ("text") : ("password")}
                        name="confirmPassword"
                        onChange={changeHandler}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        className='w-full p-3 mt-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#2ee8c3]'
                    />
                    <span 
                     className='absolute right-3 top-[38px] cursor-pointer'
                    onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword ?

                         (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                         (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                    </span>
                </label>
            </div>
        <button type='submit' className='w-full mt-[20px] bg-gray-800 text-[#2ee8c3] border-2 border-[#2ee8c3] hover:text-gray-800 hover:bg-[#2ee8c3] py-3 rounded-lg font-bold'>
            Create Account
        </button>

        <div className='flex w-full items-center my-4 gap-x-2'>
                <div className='w-full h-[1px] bg-richblack-700'></div>
                <p className='text-richblack-700 font-medium leading[1.375rem]'>
                    OR
                </p>
                <div className='w-full h-[1px] bg-richblack-700'></div>
            </div>

            <button className='w-full flex justify-center items-center gap-x-2 bg-gray-800 text-[#2ee8c3] border-2 border-[#2ee8c3] hover:text-gray-800 hover:bg-[#2ee8c3] py-3 rounded-lg font-bold'>
                <FcGoogle/>
                <p>Sign Up with Google</p>
            </button>
        </form>
    </div>
    </section>
    </div>
  )
}

export default SignupForm