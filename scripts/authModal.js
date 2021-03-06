const authModal = document.createElement('section');
authModal.classList.add('modal');
authModal.classList.add('hidden');
authModal.innerHTML = `
<div class="modal__backdrop"></div>
<article class="modal__content">
     <button class="modal__close">X</button>
     <form class="authform">

        <h1 class="authform__regfield"> Registro </h1>
        <h1 class="authform__logfield"> Iniciar sesión </h1>

        <label class="authform__regfield labelForm">
        Nombre
        <input type="text" name="name">
        </label>

        <label class="authform__regfield labelForm">
            Apellido
            <input type="text" name="lastname">
        </label>


        <label class="labelForm">
            Email
            <input type="email" name="email">
        </label>

        <label class="labelForm">
            Contraseña
            <input type="password" name="password">
        </label>

        <p class="errorModal"></p>

        <div class="buttonsModal">
            <button type="submit" class="authform__go">Ingresar</button>
            <button type="button" class="authform__register notengoBtn">No tengo cuenta</button>
            <button type="button" class="authform__login notengoBtn">Ya tengo una cuenta</button>
        </div>

     </form>
 </article>
`;


document.body.appendChild(authModal);

const authForm = authModal.querySelector('.authform');
const regFields = authModal.querySelectorAll('.authform__regfield');
const logFields = authModal.querySelector('.authform__logfield');
const registerBtn = authModal.querySelector('.authform__register');
const loginBtn = authModal.querySelector('.authform__login');
const errorModal = authModal.querySelector('.errorModal');
const authformGo = authModal.querySelector('.authform__go');


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


//LOGIN
function handleGoToLogin() {
    regFields.forEach(function(elem){
        elem.classList.add('hidden');
    });
    loginBtn.classList.add('hidden');
    registerBtn.classList.remove('hidden');
    logFields.classList.remove('hidden');
    isLogin = true;
}

loginBtn.addEventListener('click', handleGoToLogin);

//REGISTER
registerBtn.addEventListener('click', function (){
    regFields.forEach(function(elem){
        elem.classList.remove('hidden');
    });
    loginBtn.classList.remove('hidden');
    registerBtn.classList.add('hidden');
    logFields.classList.add('hidden');
    
    isLogin = false;
});

handleGoToLogin();

authForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = authForm.name.value;
    const lastname = authForm.lastname.value;
    const email = authForm.email.value;
    const password = authForm.password.value;

    //LOG USER
    if(isLogin){
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                //signed in
                var user = userCredential.user;
                modal.classList.add('hidden');
            })
            .catch((error) => {
                errorModal.innerText = error.message; 
            });

    }else{
        //REGISTER USER
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                //signed in
                var user = userCredential.user;
                console.log(user);

                const userDoc = {
                    name,
                    lastname,
                    email,
                };
                db.collection('users').doc(user.uid).set(userDoc);
                setLoggedUser(userDoc, user.uid);
                modal.classList.add('hidden');

            })
            .catch((error) => {
                errorModal.innerText = error.message; 
            });
    }
});

//LOGOUT
const logoutBtn = document.querySelectorAll('.logoutBtn');

logoutBtn.forEach(function(elem){
    elem.addEventListener('click', () => {
        firebase.auth().signOut();
    });
});


//RESPONSIVE MENU
// selector
const menu = document.querySelector('.hamburger');


// method
function toggleMenu (event) {
    menu.classList.toggle('is-active');
    document.querySelector( ".menuppal" ).classList.toggle("is_active");
    event.preventDefault();
}

// event
menu.addEventListener('click', toggleMenu, false);

modalBtn.forEach(function(elem){
    elem.addEventListener('click', toggleMenu, false);
});




