import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyBVdqWajEpMrgN8DcdqhbdUK6AkbGP-g8E",
    authDomain: "bartar-system.firebaseapp.com",
    databaseURL: "https://bartar-system.firebaseio.com",
    projectId: "bartar-system",
    storageBucket: "bartar-system.appspot.com",
    messagingSenderId: "573044276501",
    appId: "1:573044276501:web:f6f2ef6db00ef2683efd1c",
    measurementId: "G-YWPCLZGHR3"
  };
  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
