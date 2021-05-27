
const params = new URLSearchParams(location.search);
const id = params.get('id');


if(!id) {
    location.href = './404.html';
}

const item__img = document.querySelector('.item__img');
const item__name = document.querySelector('.item__name');
const item__price = document.querySelector('.item__price');
const item__gender = document.querySelector('.item__gender' );
const title__item = document.querySelector('.title__item');
const item__description = document.querySelector('.item__description');


let productsCollection = db.collection('products')
    .doc(id)
    .get()
    .then(function (doc) {
        const data = doc.data();

        if(!data) {
            location.href = './404.html';
        }
        item__img.setAttribute('src', data.images[0].url);
        item__name.innerText = data.name;
        item__price.innerText = `$ ${data.price}`;
        item__gender.innerText = `Zapato de ${data.gender}`;
        title__item.innerText = `Productos /  ${data.name}`;
        item__description.innerText = `${data.description}`;
    });


//RESPONSIVE MENU
// selector
var menu = document.querySelector('.hamburger');

// method
function toggleMenu (event) {
  this.classList.toggle('is-active');
  document.querySelector( ".menuppal" ).classList.toggle("is_active");
  event.preventDefault();
}

// event
menu.addEventListener('click', toggleMenu, false);