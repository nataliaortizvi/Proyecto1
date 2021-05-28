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

const setLoggedUser = (info, id) => {
  loggedUser = info;
  loggedUser.uid = id;
  userLoggedIn();
}

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    //User is signed in
    db.collection('users').doc(user.uid).get().then(function(doc){
      if(!doc.data()) return;
      setLoggedUser(doc.data(), user.uid);
      getMyCart(user.uid); 
    });
  }else{ 
    //User is signed out
    loggedUser = null;
    cart = [];
    userLoggedOut();
    cartBtnNumber.innerText = cart.length;
  }
});

let cart = [];
const cartBtnNumber = document.querySelector('.cartBtn span');
const CART_COLLECTION = db.collection('cart');

const addToMyCart = (product) => {
  cart.push(product);
  CART_COLLECTION.doc(loggedUser.uid).set({
    cart: cart,
  });
  cartBtnNumber.innerText = cart.length;
};

const getMyCart = (uid) => {
  CART_COLLECTION.doc(uid).get().then(snapShot => {
    const data = snapShot.data();
    if(!data) return;
    if(cartBtnNumber) cartBtnNumber.innerText = data.cart.length;
    cart = data.cart;

    if(renderCart) renderCart();
  });
}

/*
const cartFromLS = localStorage.getItem('store__cart');
if(cartFromLS){
    cart = JSON.parse(cartFromLS);
    if(cartBtnNumber){
      cartBtnNumber.innerText = cart.length;
    }
}*/



