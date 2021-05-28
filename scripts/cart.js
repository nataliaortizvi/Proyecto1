const list = document.querySelector('.list');
const checkout__total = document.querySelector('.checkout__total span');
const checkout__form = document.querySelector('.checkout__form');
const checkoutBtn = document.querySelector('.checkoutBtn');

let total = 0;

renderCart = () => {
    cart.forEach((data) => {
        const product = document.createElement('div');
        product.innerHTML = `
        <a href="./item.html?id=${data.id}&name=${data.name}">
            <img class="unity__img" src="${data.images[0]?.url}" alt="">
        </a>
        <div class="unity__info">
            <p href="item.html?id=${data.id}"><p class="unity__title">${data.name}</p></a>
            <p class="unity__description">${'Zapato de '+data.gender}</p>
            <p class="unity__price">${'$'+data.price}</p>
        </div> 
        `;
        product.classList.add('list__unity');
        
        list.appendChild(product);
        total += data.price;
    });
    checkout__total.innerText = total;

    checkout__form.addEventListener('submit', function (event) {
        event.preventDefault();
        
    });
}

