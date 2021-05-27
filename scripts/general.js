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
 
let loggedUser = null;

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    //User is signed in
    db.collection('users').doc(user.uid).get().then(function(doc){
      loggedUser = doc.data();
      loggedUser.uid = user.uid;

      userLoggedIn();
    });
  }else{ 
    //User is signed out
    userLoggedOut();
  }
});

