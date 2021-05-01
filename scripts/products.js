const list = document.querySelector('.list');

db.collection('products')
.get()
.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(doc.id, data);
        const product = document.createElement('article');

        product.innerHTML = `
        <a href="#"><img class="item__img" src="${data.images[0].url}" alt=""></a>
        <div class="item__info">
            <p class="item__title">${data.name}</p>
            <p class="item__description">${data.gender}</p>
            <p class="item__price">${'$'+data.price}</p>
        </div> 
        `;
        product.classList.add('list__item');
        
        list.appendChild(product);
    });
});


/*products.sort(function(a,b) {
    return a.price - b.price
});*/
