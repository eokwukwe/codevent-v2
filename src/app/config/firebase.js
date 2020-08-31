import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCewZ8NLyNLK8zzdFXGFPVRFhi3qT15olw',
  authDomain: 'codeventsapp.firebaseapp.com',
  databaseURL: 'https://codeventsapp.firebaseio.com',
  projectId: 'codeventsapp',
  storageBucket: 'codeventsapp.appspot.com',
  messagingSenderId: '196440114051',
  appId: '1:196440114051:web:d2e5e9ed1d57998c52ecb6'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase
