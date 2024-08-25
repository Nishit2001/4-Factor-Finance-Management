import React, { useState } from 'react'
import {auth,db} from './firebase';
import {addDoc,setDoc,collection,doc,Timestamp, deleteDoc, updateDoc} from "firebase/firestore"
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setState } from '../redux/Slices/DbStateSlice';
const Modal = (props) => {
    const type = props.type
    const subtype = props.subtype
    const id = props.id
    const amount = props.amount

  const dispatch = useDispatch();

  const categories ={
    Expences : ['Food/Groceries','Rent/Mortgage','Utilities','Transportation','Entertainment','Health/Medical','Insurance','Clothing','Education','Others'],
    Earnings : ['Salary/Wages','Pension','Freelance/Contract','Business Income','Investment Income','Rental Income','Social Security','Bonuses','Gifts','Others'],
    Investments : ['Stocks','Bonds','Real Estate','Mutual Funds','Exchange-Traded Funds','Commodities','Cryptocurrency','Savings Account','Certificates of Deposit','Retirement Accounts'],
    Liabilities : ['Mortgage','Car Loan','Credit Card','Student Loan','Personal Loan','Medical Debt','Home Equity Loan','Payday Loan','Business Loan','Tax Debt'],
  }
  const [dataForm,setDataForm] = useState({
    amount:0,
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
                Amount:+dataForm.amount,
                Date:date,
                Category:dataForm.category,
                Description:dataForm.description
              });
              dispatch(setState());
              toast.success(`${type} added`);
              break;
            }
            case 'Earnings':{
              const collection2 = collection(val,'Earnings');
              addDoc(collection2,{
                Amount:+dataForm.amount,
                Date:date,
                Category:dataForm.category,
                Description:dataForm.description
              });
              dispatch(setState());
              toast.success(`${type} added`);
              break;
            }
            case 'Investments':{
              if(subtype === 'Reedem'){
                const collection2 = collection(val,'Earnings');
                addDoc(collection2,{
                  Amount:+dataForm.amount,
                  Date:date,
                  Category:"Realized Gains",
                  Description:dataForm.description
                });
                const docref = doc(db,"Users",user.uid,type,id);
                deleteDoc(docref).then(()=>toast.success("Record deleted Successfully"))
                .catch(error => toast.error(error.message));

                dispatch(setState());
              }
              else{
                const collection3 = collection(val,'Investments');
                addDoc(collection3,{
                  Amount:+dataForm.amount,
                  Date:date,
                  Category:dataForm.category,
                  Description:dataForm.description
                });
                const collectionA = collection(val, 'Expences')
                addDoc(collectionA,{
                  Amount:+dataForm.amount,
                  Date:date,
                  Category:"Investment",
                  Description:dataForm.description
                })
                dispatch(setState());
                toast.success(`${type} added`);
              }
              break;
            }
            case 'Liabilities':{
              if(subtype === 'pay'){
                const collection1 = collection(val,'Expences');
                addDoc(collection1,{
                  Amount:+dataForm.amount,
                  Date:date,
                  Category:"Liability Installment",
                  Description:dataForm.description
                });
                const docref = doc(val, "Liabilities", id);
                const updatedamount = (amount - dataForm.amount);
                updateDoc(docref, {Amount:updatedamount}).then(toast.success("Installment Paid")).catch(error=>toast.error(error))
                dispatch(setState());
              }
              else{
                const collection4 = collection(val,'Liabilities');
                addDoc(collection4,{
                  Amount:+dataForm.amount,
                  Date:date,
                  Category:dataForm.category,
                  Description:dataForm.description
                });
                dispatch(setState());
                toast.success(`${type} added`);
              }
              break;
            }
        }
      }
      
      setDataForm(()=>({
        amount:0,
        date:'',
        category:categories[type][0],
        description:''})
      )
      props.setShowModal(false);
    }
  catch(e){
      toast.error(e.message);
  }
  }
  return (
    <div>
    <div id="modal-backdrop" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

<div id="crud-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
     
        <div class="relative rounded-lg shadow dark:bg-gray-800">
            
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-[#2ee8c3]">
                    Create New Product
                </h3>
                <button type="button" onClick={()=>props.setShowModal(false)} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
          
            <form onSubmit={submitHandler} class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                        <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                        <input required
                            type="date"
                            name="date"
                            onChange={changeHandler}
                            value={dataForm.date}   
                            id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{subtype==="Reedem"?("Return"):("Amount")}</label>
                        <input required
                            type="number"
                            name="amount"
                            onChange={changeHandler}
                            value={dataForm.amount}  
                            id="amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" />
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <select value={dataForm.category} onChange={changeHandler} name="category" id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            {
                                categories[type].map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div class="col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea required
                            name="description"
                            onChange={changeHandler}
                            placeholder="Enter description"
                            value={dataForm.description} 
                            rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></textarea>                    
                    </div>
                </div>
                <button type="submit" class="text-white inline-flex items-center bg-[#2ee8c3] hover:bg-[#24d6a6] focus:ring-4 focus:outline-none focus:ring-[#24d6a6] font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    {(subtype === "") ? 
                    ("Add" + type):(subtype)}
                </button>
            </form>
        </div>
    </div>
</div> 
</div>
  )
}

export default Modal

