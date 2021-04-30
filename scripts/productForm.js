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


//////////////INITIALIZE VARIABLES//////////////
const productForm = document.querySelector('.productForm');

productForm.addEventListener('submit', function(event){
    event.preventDefault();

   const product = {
       name: productForm.name.value,
       price: parseInt(productForm.price.value),
       color: [],
       gender: [],
   };

   if(productForm.color_blanco.checked) product.color.push('blanco');
   if(productForm.color_negro.checked) product.color.push('negro');
   if(productForm.color_rosa.checked) product.color.push('rosa');
   if(productForm.color_azul.checked) product.color.push('azul');
   if(productForm.color_rojo.checked) product.color.push('rojo');
   if(productForm.color_verde.checked) product.color.push('verde');
   if(productForm.color_amarillo.checked) product.color.push('amarillo');
   if(productForm.color_morado.checked) product.color.push('morado');
   if(productForm.color_naranja.checked) product.color.push('naranja');
   if(productForm.color_gris.checked) product.color.push('gris');

   if(productForm.gender_mujer.checked) product.gender.push('mujer');
   if(productForm.gender_hombre.checked) product.gender.push('hombre');

   console.log(product);

   // Add a new document in collection "cities"
   db.collection('products').add(product);
});


