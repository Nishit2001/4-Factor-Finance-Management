import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name:"dashboard",
    initialState:{
        totalBalance:0,
        networth:0,
        thisMonthEarnings:0,
        thisMonthExpences:0,
        thisMonthBalance:0,
        totalInvestments:0,
        assets:0,
        totalLiabilities:0,
        highestEarningCategory:"",
        highestEarningAmount:0,
        highestExpenseCategory:"",
        highestExpenseAmount:0,
    },
    reducers:{
        setThisMonthEarnings : (state,action)=>{state.thisMonthEarnings=action.payload},
        setThisMonthExpences : (state,action)=>{state.thisMonthExpences=action.payload},
        setThisMonthBalance : (state,action)=>{state.thisMonthBalance=action.payload},
        setTotalBalance : (state,action)=>{state.totalBalance = action.payload},
        setTotalInvestments : (state,action)=>{state.totalInvestments = action.payload},
        setAssets : (state,action)=>{state.assets = action.payload},
        setTotalLiabilities : (state,action)=>{state.totalLiabilities=action.payload},
        setNetWorth : (state,action)=>{state.networth=action.payload},
        setHeighestEarnings : (state,action)=>{state.highestEarningAmount=action.payload.highestEarningAmount; state.highestEarningCategory=action.payload.highestEarningCategory},
        setHeighestSpendings : (state,action)=>{state.highestExpenseAmount=action.payload.highestExpenseAmount; state.highestExpenseCategory=action.payload.highestExpenseCategory}
    }
})

export const {setThisMonthEarnings,setThisMonthExpences,setThisMonthBalance,setTotalBalance,
setTotalInvestments,setAssets,setTotalLiabilities,setNetWorth,setHeighestEarnings, setHeighestSpendings} = dashboardSlice.actions;
export default dashboardSlice.reducer;