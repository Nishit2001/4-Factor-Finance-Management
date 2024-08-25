import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector,useDispatch } from 'react-redux'
import Dashboard from '../components/Dashboard'
import Intro from '../components/Intro'

const Home = () => {
  const isLoggedIn = useSelector((state)=>state.isLoggedin.isLoggedin)
  const dispatch = useDispatch();
  return (
    <div>
        {
          isLoggedIn ? (<Dashboard/>):(<Intro/>)
        }
    </div>
  )
}

export default Home
