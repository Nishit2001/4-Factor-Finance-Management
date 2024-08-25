import React,{useState,useEffect} from "react";
import {Route,Routes} from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import { auth,db } from "./components/firebase";
import { doc,collection,query,where,getAggregateFromServer,sum, collectionGroup, orderBy, limit, getDoc, getDocs } from "firebase/firestore";
import { setAssets, setNetWorth, setThisMonthBalance, setThisMonthEarnings,setThisMonthExpences, 
setTotalBalance, setTotalInvestments, setTotalLiabilities, setHeighestEarnings, setHeighestSpendings } from "./redux/Slices/DashboardSlice";
import axios from 'axios';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Expences from "./pages/Expences";
import Earnings from "./pages/Earnings";
import Investments from "./pages/Investments";
import Liabilities from "./pages/Liabilities";
import EntryLogs from "./components/EntryLogs";
import Footer from "./components/Footer";

export default function App() {
  const dispatch = useDispatch();
  const stateChange = useSelector((state)=>state.stateChange.stateChange);
  const isLoggedIn = useSelector((state)=>state.isLoggedin.isLoggedin);
  async function setSummary(){
    const user = auth.currentUser;
    let coll = null;
    if(user){
      coll = collection(db,"Users",user.uid,"Earnings");
    }
    const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11
    const currentYear = new Date().getFullYear();
    let q1 = query(coll, where('Date', '>=', new Date(currentYear,currentMonth-1,1)));
    const snapshotE = await getAggregateFromServer(q1, {
      totalPopulation: sum('Amount')
    });   
    const earnings = snapshotE.data().totalPopulation;
    await dispatch(setThisMonthEarnings(earnings))
    let q11 = query(coll);
    const snapshotTBE = await getAggregateFromServer(q11, {
      totalPopulation: sum('Amount')
    });   
    const totalearnings = snapshotTBE.data().totalPopulation;
    let q111 = query(coll, orderBy("Amount", 'desc'), limit(1));
    const snapshotHE = await getDocs(q111);
    snapshotHE.forEach((doc)=>{
      let highestEarningAmount = doc.data().Amount;
      let highestEarningCategory = doc.data().Category;
      dispatch(setHeighestEarnings({highestEarningAmount:highestEarningAmount, highestEarningCategory:highestEarningCategory}))
    })

    if(user){
      coll = collection(db,"Users",user.uid,"Expences");
    }
    let q2 = query(coll, where('Date', '>=', new Date(currentYear,currentMonth-1,1)));
    const snapshotX = await getAggregateFromServer(q2, {
      totalPopulation: sum('Amount')
    });   
    const expences = snapshotX.data().totalPopulation;
    await dispatch(setThisMonthExpences(expences))
    let q22 = query(coll);
    const snapshotTBX = await getAggregateFromServer(q22, {
      totalPopulation: sum('Amount')
    });   
    const totalexpences = snapshotTBX.data().totalPopulation;
    let thismonthbalance = earnings - expences;
    await dispatch(setThisMonthBalance(thismonthbalance));
    let totalbalance = totalearnings - totalexpences;
    dispatch(setTotalBalance(totalbalance));
    let q222 = query(coll, orderBy("Amount", 'desc'), limit(1));
    const snapshotHS = await getDocs(q222);
    snapshotHS.forEach((doc)=>{
      let highestExpenseAmount = doc.data().Amount;
      let highestExpenseCategory = doc.data().Category;
      dispatch(setHeighestSpendings({highestExpenseAmount:highestExpenseAmount, highestExpenseCategory:highestExpenseCategory}))
    })

    if(user){
      coll = collection(db,"Users",user.uid,"Investments");
    }
    let q3 = query(coll);
    const snapshotI= await getAggregateFromServer(q3, {
      totalPopulation: sum('Amount')
    });   
    const totalinvestments = snapshotI.data().totalPopulation;
    dispatch(setTotalInvestments(totalinvestments));

    if(user){
      coll = collection(db,"Users",user.uid,"Liabilities");
    }
    let q4 = query(coll);
    const snapshotL= await getAggregateFromServer(q4, {
      totalPopulation: sum('Amount')
    });   
    const totalliabilities = snapshotL.data().totalPopulation;
    dispatch(setTotalLiabilities(totalliabilities));

    const assets = totalbalance + totalinvestments;
    dispatch(setAssets(assets));

    const networth = assets - totalliabilities;
    dispatch(setNetWorth(networth));
  }

  useEffect(()=>{
    if(isLoggedIn){
      setSummary();
    //   console.log("inside useeffect : ")
    //   console.log(thisMonthEarnings);
   }
  },[stateChange,isLoggedIn]);

  return (
    <div className="min-h-screen min-w-screen bg-white flex flex-col">
    <Navbar/>

    <Routes>
      <Route path="/" element= {<Home />} />
      <Route path="/login" element = {<LoginForm/>} />
      <Route path="/signup" element={<SignupForm/>} />
      <Route path="/about" element= {<About/>} />
      <Route path="/earnings" element= {<Earnings/>} />
      <Route path="/expences" element= {<Expences/>} />
      <Route path="/investments" element= {<Investments/>} />
      <Route path="/liabilities" element= {<Liabilities/>} />
    </Routes>

    <Footer/>

  </div>
  )
}
