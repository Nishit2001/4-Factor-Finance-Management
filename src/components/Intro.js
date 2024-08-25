import React from 'react'
import earning_logo from "../assets/Coins-amico.png"
import expences_logo from "../assets/expences-amico.png"
import invest_logo from "../assets/Investing-amico.png"
import liability_logo from "../assets/liability-amico.png"
import dashboard_logo from '../assets/Dashboard-bro.png'
import { Link } from 'react-router-dom'

const Intro = () => {
  return (
    <div class="bg-gray-100 font-sans leading-normal tracking-normal">
    <header class="flex bg-gray-800 text-white">
        <div class="flex flex-col container pr-80 pl-[170px] py-80 mr-20 bg-Revenue-bro bg-contain bg-no-repeat bg-right max-h-screen max-w-screen">
            <h1 class="text-4xl mr-20 text-left font-bold">Welcome to SpendSmart</h1>
            <p class="text-lg text-left mt-2">Your Comprehensive Finance Management Companion</p>
            <Link to="/signup" class="mt-3">
                <button  className='bg-gray-800 text-[#2ee8c3] border-2 border-[#2ee8c3] hover:text-gray-800 hover:bg-[#2ee8c3] py-[8px] 
                px-[50px] rounded-[20px]'>
                    Start Now!
                </button>
            </Link>
        </div>
    </header>

    <section>
        <div class="flex bg-white ">
            <div class="flex flex-col container pl-[800px] py-80 ml-20 bg-Personal-Finance bg-contain bg-no-repeat bg-left max-h-screen max-w-screen">
            <h1 class="text-4xl mr-20 text-left font-bold">Effortlessly manage your finances with SpendSmart</h1>
            <p class="text-lg text-left mr-20 mt-2">Track your earnings, control expenses, grow investments, and keep liabilities in check.</p>
            </div>
        </div>
    </section>
  
    <section class="bg-gray-100 py-12">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <img src={earning_logo} alt="Earnings" class="w-16 h-16 mx-auto mb-4"/>
                <h3 class="text-xl font-bold text-white">Manage Your Earnings</h3>
                <p class="text-white mt-2">Keep track of your income sources and optimize your earnings.</p>
            </div>
         
            <div class="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <img src={expences_logo} alt="Expenses" class="w-16 h-16 mx-auto mb-4"/>
                <h3 class="text-xl font-bold text-white">Monitor Your Expenses</h3>
                <p class="text-white mt-2">Monitor and control your spending habits.</p>
            </div>

            <div class="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <img src={invest_logo} alt="Investments" class="w-16 h-16 mx-auto mb-4"/>
                <h3 class="text-xl font-bold text-white">Grow Your Investments</h3>
                <p class="text-white mt-2">Analyze your investment portfolio and maximize returns.</p>
            </div>
       
            <div class="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <img src={liability_logo} alt="Liabilities" class="w-16 h-16 mx-auto mb-4"/>
                <h3 class="text-xl font-bold text-white">Manage Liabilities</h3>
                <p class="text-white mt-2">Manage your debts and liabilities to ensure financial health.</p>
            </div>
        </div>
    </section>

    <section class="bg-gray-100 py-12">
        <div class="container mx-auto text-center flex flex-col items-center p-6 min-h-80">
            <div class="bg-gray-800 p-12 rounded-lg shadow-lg text-center min-h-80">
                <img src={dashboard_logo} alt="Liabilities" class="w-16 h-16 mx-auto mb-4"/>
                <h3 class="text-xl font-bold text-white">Summary Dashboard</h3>
                <p class="text-white mt-2">Get an at-a-glance overview of your financial health with our intuitive dashboard.</p>
            </div>
            {/* <img src="../assets/Coins-amico.png" alt="Summary Dashboard" class="w-2/3 max-w-md mb-6"/>
            <h2 class="text-3xl font-bold text-gray-800">Summary Dashboard</h2>
            <p class="text-gray-600 mt-4 mb-8">Get an at-a-glance overview of your financial health with our intuitive dashboard.</p> */}
        </div>
    </section>
</div>
  )
}

export default Intro
