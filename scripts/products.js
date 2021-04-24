const products = [
    {
        img: 'src',
        title: 'lorem ipsum',
        description: 'lorem lorem ipsum',
        price: '100'
    },
    {
        img: 'src',
        title: 'lorem ipsum uno ',
        description: 'lorem lorem ipsum',
        price: '200'
    },
    {
        img: 'src',
        title: 'lorem ipsum two',
        description: 'lorem lorem ipsum',
        price: '300'
    },
    {
        img: 'src',
        title: 'lorem ipsum',
        description: 'lorem lorem ipsum',
        price: '100'
    },
    {
        img: 'src',
        title: 'lorem ipsum uno ',
        description: 'lorem lorem ipsum',
        price: '200'
    },
    {
        img: 'src',
        title: 'lorem ipsum two',
        description: 'lorem lorem ipsum',
        price: '300'
    },
    {
        img: 'src',
        title: 'lorem ipsum',
        description: 'lorem lorem ipsum',
        price: '100'
    },
    {
        img: 'src',
        title: 'lorem ipsum uno ',
        description: 'lorem lorem ipsum',
        price: '200'
    },
    {
        img: 'src',
        title: 'lorem ipsum two',
        description: 'lorem lorem ipsum',
        price: '300'
    },
];

const list = document.querySelector('.list');

function handleProductItem (item) {
    const product = document.createElement('article');
    product.innerHTML = `
    <a href="#"><img class="item__img" src="${item.img}" alt=""></a>
    <div class="item__info">
        <p class="item__title">${item.title}</p>
        <p class="item__description">${item.description}</p>
        <p class="item__price">${item.price}</p>
    </div> 
    `;
    product.classList.add('list__item');
    
    list.appendChild(product);
}

/*products.sort(function(a,b) {
    return a.price - b.price
});*/

products.forEach(handleProductItem);