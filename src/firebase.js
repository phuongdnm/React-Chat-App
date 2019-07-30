import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyCtYuIH0hi4YFzyRgRHdsCVVRq8_N9bxyc",
  authDomain: "react-chat-app-bc3b8.firebaseapp.com",
  databaseURL: "https://react-chat-app-bc3b8.firebaseio.com",
  projectId: "react-chat-app-bc3b8",
  storageBucket: "react-chat-app-bc3b8.appspot.com",
  messagingSenderId: "120265953383",
  appId: "1:120265953383:web:d3cb85d68125b441"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;