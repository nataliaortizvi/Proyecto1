
const params = new URLSearchParams(location.search);
const id = params.get('id');


if(!id) {
    location.href = './404.html';
}

const item__img = document.querySelector('.item__img');
const item__name = document.querySelector('.item__name');
const item__price = document.querySelector('.item__price');
const item__gender = document.querySelector('.item__gender' );
const title__item = document.querySelector('.title__item' );

const item__sizes = document.querySelector('.item__sizes' );

db.collection('products')
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

        //item__sizes.innerHTML = '';
        const product = document.createElement('div');


        product.innerHTML = `
        <input type="radio" name="size" id=${data.sizes[0]}>
        <label for=${data.sizes[0]}>${data.sizes[0]}</label>

        <input type="radio" name="size" id=${data.sizes[1]}>
        <label for=${data.sizes[1]}>${data.sizes[1]}</label>

        <input type="radio" name="size" id=${data.sizes[2]}>
        <label for=${data.sizes[2]}>${data.sizes[2]}</label>

        <input type="radio" name="size" id=${data.sizes[3]}>
        <label for=${data.sizes[3]}>${data.sizes[3]}</label>

        <input type="radio" name="size" id=${data.sizes[4]}>
        <label for=${data.sizes[4]}>${data.sizes[4]}</label>

        <input type="radio" name="size" id=${data.sizes[5]}>
        <label for=${data.sizes[5]}>${data.sizes[5]}</label>

        <input type="radio" name="size" id=${data.sizes[6]}>
        <label for=${data.sizes[6]}>${data.sizes[6]}</label>

        <input type="radio" name="size" id=${data.sizes[7]}>
        <label for=${data.sizes[7]}>${data.sizes[7]}</label>
        `;

        product.classList.add('radio');
        item__sizes.appendChild(product);
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