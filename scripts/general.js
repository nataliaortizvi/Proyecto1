//////////////FIREBASE//////////////
var firebaseConfig = {
    apiKey: "AIzaSyAAZ-7q4FNYCxY-TbjxUcaxbi6aixx3DGY",
    authDomain: "taller-2-c2cff.firebaseapp.com",
    projectId: "taller-2-c2cff",
    storageBucket: "taller-2-c2cff.appspot.com",
    messagingSenderId: "249243790035",
    appId: "1:249243790035:web:b341e14ce1bf1962844226"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();