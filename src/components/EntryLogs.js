import { collectionGroup } from 'firebase/firestore'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setState } from '../redux/Slices/DbStateSlice'
import {doc,collection,deleteDoc} from 'firebase/firestore'
import { db,auth } from './firebase'
import { toast } from 'react-hot-toast';
import Modal from './Modal';
const EntryLogs = (props) => {
    const type = props.type
    const data = props.data
    const setLogLimit = props.setLogLimit
    const error = props.error
    const [showModal,setShowModal] = useState(false);
    const [id,setId] = useState(null);
    const [amount,setAmount] = useState(0);
    const dispatch = useDispatch();
    const getButtonText = (type) => {
        switch(type) {
          case "Investments":
            return "Redeem";
          default:
            return "Delete";
        }
      };
    
    function clickHandler(id,type){
        const user = auth.currentUser;
        if(user){
            if(type === "Investments"){
                setShowModal(true);
                setId(id);
            }
            else{
                const docref = doc(db,"Users",user.uid,type,id);
                deleteDoc(docref).then(()=>toast.success("Record deleted Successfully"))
                .catch(error => toast.error(error.message));
                dispatch(setState());
            }  
        }
    }

    function clickHandlerSecondary(id,amount){
        setShowModal(true);
        setId(id);
        setAmount(amount);
    }

  return (
    <div class="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h2 class="text-2xl font-semibold mb-4 text-[#2ee8c3]">Recent {type}</h2>
        <table class="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
            <thead>
                <tr>
                    <th class="py-2 px-4 text-left">Amount</th>
                    <th class="py-2 px-4 text-left">Date</th>
                    <th class="py-2 px-4 text-left">Category</th>
                    <th class="py-2 px-4 text-left">Description</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {error ? (
                    <tr>
                    <td colSpan="4">error encounterd</td>
                    </tr>
                ) : (
                    data.map((doc, index) => {
                    const ts = (doc.Date.seconds + doc.Date.nanoseconds / 1000000000) * 1000;
                    const date = new Date(ts);
                    const finaldate = date.toDateString();
                    return (
                        <tr key={index} className='border-b border-gray-700'>
                        <td className="py-2 px-4">{doc.Amount}</td>
                        <td className="py-2 px-4">{finaldate}</td>
                        <td className="py-2 px-4">{doc.Category}</td>
                        <td className="py-2 px-4">{doc.Description}</td>
                        <td className="py-2 px-4">
                        <div className='flex gap-x-5'>
                            <button onClick={()=>clickHandler(doc.id,type)}
                            className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition-all duration-200"
                            >
                            {
                                getButtonText(type)
                            }
                            </button>
                            { type === "Liabilities" &&
                                <button onClick={()=>clickHandlerSecondary(doc.id,doc.Amount)}
                                className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 transition-all duration-200"
                                >
                                    Pay
                                </button>
                            }
                        </div>
                        </td>
                        </tr>
                    );
                    })
                )}
            </tbody>

        </table>
        {type==="Investments" ? (showModal && <Modal type={'Investments'} subtype={"Reedem"} setShowModal={setShowModal} id={id}/>) : (showModal && <Modal type={'Liabilities'} subtype={"pay"} setShowModal={setShowModal} id={id} amount={amount}/>)}
    </div>
  )
}

export default EntryLogs
