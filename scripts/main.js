//GALLERY
const current = document.querySelector('.gallery__current');
const smalls = document.querySelectorAll('.gallery__small');

//GALLERY FUNCTION
for(let i = 0; i < smalls.length; i++){
    const small = smalls[i];

    function handleSmallClick () {
        const smallSrc = small.getAttribute('src');
        current.setAttribute('src', smallSrc);
    }
    
    small.addEventListener('click', handleSmallClick);

    if(i == 0) handleSmallClick(); 
}

//INTERACTION
const radioButton = document.querySelectorAll('.views__button');
const mainImage = document.querySelector('.interaction__img');

//INTERACTION FUNCTION

function handleForEach (elem, i) {

    function handleCheck () {
        console.log(elem,i)
        switch (i) {
            case 0:
                //front
                mainImage.classList.remove('interaction__img--side')
                mainImage.classList.remove('interaction__img--back')
                mainImage.classList.remove('interaction__img--down')
                mainImage.classList.add('interaction__img--front')
                break;
            case 1:
                //side
                mainImage.classList.remove('interaction__img--front')
                mainImage.classList.remove('interaction__img--back')
                mainImage.classList.remove('interaction__img--down')
                mainImage.classList.add('interaction__img--side')
                break;
            case 2:
                //down
                mainImage.classList.remove('interaction__img--front')
                mainImage.classList.remove('interaction__img--back')
                mainImage.classList.remove('interaction__img--side')
                mainImage.classList.add('interaction__img--down')
                break;
            case 3:
                //back
                mainImage.classList.remove('interaction__img--front')
                mainImage.classList.remove('interaction__img--side')
                mainImage.classList.remove('interaction__img--down')
                mainImage.classList.add('interaction__img--back')
                break;
        }
    }

    elem.addEventListener('click', handleCheck);
}

radioButton.forEach(handleForEach);

