import { initializeApp } from 'firebase/app'
import 'firebase/database'
import { getDatabase, ref, onValue, child, get } from 'firebase/database'

// Initialize Firebase with your Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC0QgfHHPmQ9G_hEu-BGFxOfMDYV_pDKLs',
  authDomain: 'ikea-kodtest.firebaseapp.com',
  databaseURL: 'https://ikea-kodtest-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'ikea-kodtest',
  storageBucket: 'ikea-kodtest.appspot.com',
  messagingSenderId: '938047988593',
  appId: '1:938047988593:web:d2ade6099f31ed78948cd0',
  measurementId: 'G-39W82T0ETV'
}

const app = initializeApp(firebaseConfig)

const db = getDatabase(app)

export async function fetchDataFromFirebase(path: string): Promise<any> {
  const balanceRef = ref(db, `/${path}`)
  onValue(balanceRef, (snapshot) => {
    console.log('test: ', snapshot.val())
    return snapshot.val()
  })
}
