import React, { useEffect, useState } from 'react'
import EntryLogs from '../components/EntryLogs'
import Modal from '../components/Modal'
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../components/firebase';

const Earnings = () => {
  const [showModal,setShowModal] = useState(false);
  const [logLimit,setLogLimit] = useState(15);
  const [earningsData,setEarningsData] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [user, setUser] = useState(null); // State to manage user
  
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
      const docRef = doc(db, 'Users', user.uid);
      const earningCollectionref = collection(docRef, 'Earnings');

      const unsubscribe = onSnapshot(
        earningCollectionref,
        (snapshot) => {
          if (snapshot.empty) {
            setError(true);
            setEarningsData([]);
            setLoading(false);
          } else {
            setEarningsData(
              snapshot.docs.map((doc) => {
                let data = doc.data();
                data.id = doc.id;
                return data;
              })
            );
            setLoading(false);
          }
        },
        (error) => {
          console.error('Error fetching earnings data: ', error);
          setError(true);
          setLoading(false);
        }
      );

      // Cleanup the Firestore listener on component unmount
      return () => unsubscribe();
    }
  }, [user]); // Dependency on user to run effect when user state changes

  if (!user) {
    // Show a loading indicator or message while waiting for auth state
    return <div>Loading...</div>;
  }

  return (
    <div className={`bg-gray-800 container mx-auto px-16 py-6 min-h-screen`}>
      <h1 class="text-4xl font-bold mb-10 pt-10 text-center text-[#2ee8c3]">Earnings</h1>
      <div class="flex justify-end mb-8">
      <button
        className="bg-gray-800 text-[#2ee8c3] border-2 border-[#2ee8c3] hover:text-gray-800 hover:bg-[#2ee8c3] py-3 px-6 rounded-lg font-bold transition-all duration-200"
        type="button"
        onClick={() => setShowModal(true)}>
        Add Earnings
      </button>
      </div>
      {showModal && <Modal type={'Earnings'} subtype={""} setShowModal={setShowModal}/>}
      {loading ? ("loading...") : (<EntryLogs type={'Earnings'} data={earningsData} setLogLimit={setLogLimit} error={error}/>)}
    </div>
  )
}

export default Earnings
