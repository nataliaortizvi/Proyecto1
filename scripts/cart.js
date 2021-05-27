const list = document.querySelector('.cartList');

let total = 0;

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

