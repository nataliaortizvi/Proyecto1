const current = document.querySelector('.gallery__current');
const smalls = document.querySelectorAll('.gallery__small');


for(let i = 0; i < smalls.length; i++){
    const small = smalls[i];

    function handleSmallClick () {
        const smallSrc = small.getAttribute('src');
        current.setAttribute('src', smallSrc);
    }
    
    small.addEventListener('click', handleSmallClick);

    if(i == 0) handleSmallClick(); 
}