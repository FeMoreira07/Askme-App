import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';



import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCGL89ZMet86gda4N-kjYpFg2lM9J3BOtY",
  authDomain: "letmeask-888ed.firebaseapp.com",
  databaseURL: "https://letmeask-888ed-default-rtdb.firebaseio.com",
  projectId: "letmeask-888ed",
  storageBucket: "letmeask-888ed.appspot.com",
  messagingSenderId: "630108439636",
  appId: "1:630108439636:web:34e43f7b613b023f6bd9c1"
};



firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const database = firebase.database();

  export {firebase, auth, database}