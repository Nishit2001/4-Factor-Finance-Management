import React, { useState } from 'react'
import {auth,db} from './firebase';
import {addDoc,setDoc,collection,doc,Timestamp} from "firebase/firestore"
import { toast } from 'react-hot-toast';
const EntryForm = (props) => {
  const type = props.type
  const categories ={
    Expences : ['Food/Groceries','Rent/Mortgage','Utilities','Transportation','Entertainment','Health/Medical','Insurance','Clothing','Education','Others'],
    Earnings : ['Salary/Wages','Pension','Freelance/Contract','Business Income','Investment Income','Rental Income','Social Security','Bonuses','Gifts','Others'],
    Investments : ['Stocks','Bonds','Real Estate','Mutual Funds','Exchange-Traded Funds','Commodities','Cryptocurrency','Savings Account','Certificates of Deposit','Retirement Accounts'],
    Liabilities : ['Mortgage','Car Loan','Credit Card','Student Loan','Personal Loan','Medical Debt','Home Equity Loan','Payday Loan','Business Loan','Tax Debt'],
  }
  const [dataForm,setDataForm] = useState({
    amount:null,
    date:'',
    category:categories[type][0],
    description:''
  })
  function changeHandler(event){
    setDataForm((prev)=>(
      {...prev,
      [event.target.name]:event.target.value
    }))
  }
  async function submitHandler(event){
    event.preventDefault();
    try{
      const user = auth.currentUser;
      if(user){
        const date = new Date(`${dataForm.date} 01:10:00`);
        const val = doc(db,"Users",user.uid);
          switch(type){
            case 'Expences':{
              const collection1 = collection(val,'Expences');
              addDoc(collection1,{
                Amount:dataForm.amount,
                Date:date,
                Category:dataForm.category,
                Description:dataForm.description
              });
              break;
            }
            case 'Earnings':{
              const collection2 = collection(val,'Earnings');
              addDoc(collection2,{
                Amount:dataForm.amount,
                Date:date,
                Category:dataForm.category,
                Description:dataForm.description
              });
              break;
            }
            case 'Investments':{
              const collection3 = collection(val,'Investments');
              addDoc(collection3,{
                Amount:dataForm.amount,
                Date:date,
                Category:dataForm.category,
                Description:dataForm.description
              });
              break;
            }
            case 'Liabilities':{
              const collection4 = collection(val,'Liabilities');
              addDoc(collection4,{
                Amount:dataForm.amount,
                Date:date,
                Category:dataForm.category,
                Description:dataForm.description
              });
              break;
            }
        }
      }
      toast.success(`${type} added`);
      setDataForm(()=>({
        amount:0,
        date:'',
        category:categories[type][0],
        description:''})
      )
    }
  catch(e){
      toast.error(e.message);
  }
  }
  return (
    <div>
      <form onSubmit={submitHandler} class="bg-white p-6 rounded-lg shadow-md mb-8">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="amount">Amount</label>
                <input required
                            type="number"
                            name="amount"
                            onChange={changeHandler}
                            placeholder="Enter Amount"
                            value={dataForm.amount} 
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="amount"/>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="date">Date</label>
                <input required
                            type="date"
                            name="date"
                            onChange={changeHandler}
                            value={dataForm.date}  
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date"/>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="category">Category</label>
                <select value={dataForm.category} onChange={changeHandler} name='category' class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="category">
                    {
                      categories[type].map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))
                    }
                </select>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Description</label>
                <textarea required
                            name="description"
                            onChange={changeHandler}
                            placeholder="Enter description"
                            value={dataForm.description} 
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description"></textarea>
            </div>
            <div class="flex items-center justify-between">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Add {type}
                </button>
            </div>
        </form>
    </div>
  )
}

export default EntryForm
