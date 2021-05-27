function userLoggedIn () {
    const showLoggedIn = document.querySelectorAll('.showLoggedIn');
    showLoggedIn.forEach(function(elem){
        elem.classList.remove('hidden');
    });

    const hideLoggedIn = document.querySelectorAll('.hideLoggedIn');
    hideLoggedIn.forEach(function(elem){
        elem.classList.add('hidden');
    });

    if(loggedUser.admin){
        const showLoggedAdmin = document.querySelectorAll('.showLoggedAdmin');
        showLoggedAdmin.forEach(function(elem){
            elem.classList.remove('hidden');
        });
    }
}

function userLoggedOut () {
    const showLoggedIn = document.querySelectorAll('.showLoggedIn');
    showLoggedIn.forEach(function(elem){
        elem.classList.add('hidden');
    });

    const hideLoggedIn = document.querySelectorAll('.hideLoggedIn');
    hideLoggedIn.forEach(function(elem){
        elem.classList.remove('hidden');
    });

    const showLoggedAdmin = document.querySelectorAll('.showLoggedAdmin');
    showLoggedAdmin.forEach(function(elem){
        elem.classList.add('hidden');
    });
        
    
}


