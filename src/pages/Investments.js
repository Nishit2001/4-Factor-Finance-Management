import React, { useEffect, useState } from 'react'
import EntryLogs from '../components/EntryLogs'
import Modal from '../components/Modal'
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../components/firebase';
const Assets = () => {
  const [showModal,setShowModal] = useState(false);
  const [logLimit,setLogLimit] = useState(15);
  const [InvestmentsData,setInvestmentsData] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    // Cleanup the auth listener on component unmount
    return () => unsubscribeAuth();
  }, []);
  useEffect(() => {
    if (user) {
      setLoading(true);
        const docRef = doc(db,'Users',user.uid);
        const expenseCollectionref = collection(docRef,'Investments');
        const unsubscribe = onSnapshot(expenseCollectionref, snapshot => {
          if (snapshot.empty) {
            setError(true);
            setInvestmentsData([]);
            setLoading(false);
          }
          else{
              setInvestmentsData(snapshot.docs.map(doc=>{
                let data = doc.data();
                data.id = doc.id;
                return data;       
              }))
              setLoading(false);
          }
        })
    return()=>{
      unsubscribe();
    };}
  }, [user]);

  return (
    <div className="bg-gray-800 container mx-auto px-16 py-6 min-h-screen">
      <h1 class="text-4xl font-bold mb-10 pt-10 text-center text-[#2ee8c3]">Investments</h1>
      <div class="flex justify-end mb-8">
      <button
        className="bg-gray-800 text-[#2ee8c3] border-2 border-[#2ee8c3] hover:text-gray-800 hover:bg-[#2ee8c3] py-3 px-6 rounded-lg font-bold transition-all duration-200"
        type="button"
        onClick={() => setShowModal(true)}>
        Add Investment
      </button>
      </div>
      {showModal && <Modal type={'Investments'} subtype={""} setShowModal={setShowModal}/>}
      {loading ? ("loading...") : (<EntryLogs type={'Investments'} data={InvestmentsData} setLogLimit={setLogLimit} error={error}/>)}
    </div>
  )
}

export default Assets
