import React from 'react'
import { useSelector } from 'react-redux';
import { auth, db } from '../components/firebase';
const Dashboard = () => {
    const thisMonthEarnings = useSelector((state)=>state.dashboard.thisMonthEarnings);
    const totalBalance = useSelector((state)=>state.dashboard.totalBalance);
    const thisMonthExpences = useSelector((state)=>state.dashboard.thisMonthExpences);
    const thisMonthBalance = useSelector((state)=>state.dashboard.thisMonthBalance);
    const totalInvestments = useSelector((state)=>state.dashboard.totalInvestments);
    const assets = useSelector((state)=>state.dashboard.assets);
    const totalLiabilities = useSelector((state)=>state.dashboard.totalLiabilities);
    const networth = useSelector((state=>state.dashboard.networth));
    const highestEarningAmount = useSelector((state=>state.dashboard.highestEarningAmount));
    const highestEarningCategory = useSelector((state=>state.dashboard.highestEarningCategory));
    const highestExpenseAmount = useSelector((state=>state.dashboard.highestExpenseAmount)); 
    const highestExpenseCategory = useSelector((state=>state.dashboard.highestExpenseCategory));

    console.log(auth.currentUser)
  return (
      <div class="container bg-gray-800 mx-auto flex flex-col py-6 px-16">
        <h1 class="text-4xl font-bold mb-10 pt-10 text-center text-[#2ee8c3]">Financial Summary</h1>
        
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 hover:shadow-2xl transition-shadow duration-300">
            <div className='text-white'>
            <h2 class="text-2xl font-semibold mb-4 text-[#2ee8c3]">Total Balance</h2>
            <p class="text-2xl font-bold">${totalBalance}</p>
            </div>
        </div>

        <div class="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 hover:shadow-2xl transition-shadow duration-300">
            <h2 class="text-2xl font-semibold mb-4 text-[#2ee8c3]">Net Worth</h2>
            <div className='text-white'>
            <p>Total Assets: <span class="font-bold">${assets}</span></p>
            <p>Total Investment Value: <span class="font-bold">${totalInvestments}</span></p>
            <p>Total Liabilities: <span class="font-bold">${totalLiabilities}</span></p>
            <p className='font-bold text-xl'>Net Worth: <span class="font-bold text-xl">${networth}</span></p>
            </div>
        </div>
        
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 hover:shadow-2xl transition-shadow duration-300">
            <h2 class="text-2xl font-semibold mb-4 text-[#2ee8c3]">Income vs. Expenses (This Month)</h2>
            <div className='text-white'>
            <p className='font-bold text-xl'>Total Balance (This Month): <span class="font-bold font-xl">${thisMonthBalance}</span></p>
            <p>Total Income: <span class="font-bold text-green-500">${thisMonthEarnings}</span></p>
            <p>Total Expenses: <span class="font-bold  text-red-500">${thisMonthExpences}</span></p>
            </div>
        </div>

        <div class="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 hover:shadow-2xl transition-shadow duration-300">
            <h2 class="text-2xl font-semibold mb-4 text-[#2ee8c3]">Top Categories</h2>
            <div className='text-white'>
            <p>Top Spending Category: <span class="font-bold">{highestExpenseCategory} (${highestExpenseAmount})</span></p>
            <p>Top Earning Category: <span class="font-bold">{highestEarningCategory} (${highestEarningAmount})</span></p>
            </div>
        </div>

        {/* <div class="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 hover:shadow-2xl transition-shadow duration-300">
            <h2 class="text-2xl font-semibold mb-4 text-[#2ee8c3]">Monthly Overview</h2>
            <div className='text-white'>
            <p>Savings Rate: <span class="font-bold">20%</span></p>
            <p>Net Savings: <span class="font-bold">$1,000</span></p>
            </div>
        </div>

        <div class="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 hover:shadow-2xl transition-shadow duration-300">
            <h2 class="text-2xl font-semibold mb-4 text-[#2ee8c3]">Savings Goals</h2>
            <div className='text-white'>
            <p>Goal: <span class="font-bold">$10,000</span></p>
            <p>Saved: <span class="font-bold">$5,000 (50%)</span></p>
            </div>
        </div>

        <div class="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 hover:shadow-2xl transition-shadow duration-300">
            <h2 class="text-2xl font-semibold mb-4 text-[#2ee8c3]">Investment Summary</h2>
            <div className='text-white'>
            <p>Total Investment Value: <span class="font-bold">${totalInvestments}</span></p>
            <p>Recent Returns: <span class="font-bold">$1,000</span></p>
            </div> 
        </div> */}

    </div>
  )
}

export default Dashboard
