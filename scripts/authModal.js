const authModal = document.createElement('section');
authModal.classList.add('modal');
authModal.classList.add('hidden');
authModal.innerHTML = `
<div class="modal__backdrop"></div>
<article class="modal__content">
     <button class="modal__close">X</button>
     <form class="authform">

         <label class="authform__regfield labelFrom">
             Nombre
             <input type="text" name="name">
         </label>

         <label class="authform__regfield labelFrom">
             Apellido
             <input type="text" name="lastname">
         </label>


         <label class="labelFrom">
             Email
             <input type="email" name="email">
         </label>

         <label class="labelFrom">
             Contraseña
             <input type="password" name="password">
         </label>

         <p class="errorModal"></p>

         <button type="button" class="authform__register">Registrarse</button>
         <button type="button" class="authform__login">Ya tengo una cuenta</button>
         <button type="submit">Enviar</button>
         
     </form>
 </article>
`;


document.body.appendChild(authModal);

const authForm = authModal.querySelector('.authform');
const regFields = authModal.querySelectorAll('.authform__regfield');
const registerBtn = authModal.querySelector('.authform__register');
const loginBtn = authModal.querySelector('.authform__login');
const errorModal = authModal.querySelector('.errorModal');


//OPEN AND CLOSE MODAL
const modal__close =  authModal.querySelector('.modal__close');
const modal = document.querySelector('.modal');
const modalBtn =  document.querySelectorAll('.modalBtn');

modal__close.addEventListener('click', () => {
    modal.classList.add('hidden');
});
modalBtn.forEach(function(elem){
    elem.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });
});


//CHANGE BETWEEN REGISTER AND LOGIN
let isLogin = true;

function handleGoToLogin() {
    regFields.forEach(function(elem){
        elem.classList.add('hidden');
    });
    loginBtn.classList.add('hidden');
    registerBtn.classList.remove('hidden');
    isLogin = true;
}

loginBtn.addEventListener('click', handleGoToLogin);

registerBtn.addEventListener('click', function (){
    regFields.forEach(function(elem){
        elem.classList.remove('hidden');
    });
    loginBtn.classList.remove('hidden');
    registerBtn.classList.add('hidden');
    isLogin = false;
});

handleGoToLogin();

authForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = authForm.name.value;
    const lastname = authForm.lastname.value;
    const email = authForm.email.value;
    const password = authForm.password.value;

    if(isLogin){
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                //signed in
                var user = userCredential.user;
            })
            .catch((error) => {
                errorModal.innerText = error.message; 
            });

    }else{
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                //signed in
                var user = userCredential.user;
                console.log(user);

                db.collection('users').doc(user.uid).set({
                    name,
                    lastname,
                    email,
                });

            })
            .catch((error) => {
                errorModal.innerText = error.message; 
            });
    }
});

//LOGOUT
const logoutBtn = document.querySelectorAll('.logoutBtn');
console.log(logoutBtn);

logoutBtn.forEach(function(elem){
    elem.addEventListener('click', () => {
        firebase.auth().signOut();
    });
});




