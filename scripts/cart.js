const list = document.querySelector('.list');
const checkout__total = document.querySelector('.checkout__total span');
const checkout__form = document.querySelector('.checkout__form');
const checkoutBtn = document.querySelector('.checkoutBtn');

let total = 0;

const renderCart = () => {
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

        const productIds = [];
        cart.forEach(function(data){
            productIds.push(data.id);
        });

        const order = {
            identification: checkout__form.identification.value,
            creditCard: checkout__form.creditCard.value,
            city: checkout__form.city.value,
            adress: checkout__form.adress.value,
            date: Date.now(),
            productIds: productIds,
            total: total,
            uid: loggedUser.uid,
        };

        ORDERS_COLLECTION.add(order)
            .then(function (docRef) {
                CART_COLLECTION.doc(loggedUser.uid).set({
                    cart: [],
                });

                location.href = './products.html'

                  
            });
    });
}

