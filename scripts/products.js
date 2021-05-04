const list = document.querySelector('.list');

const handleCollectionResult = (querySnapshot) => {
    list.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const product = document.createElement('a');

        product.innerHTML = `
        <a href="#"><img class="item__img" src="${data.images[0]?.url}" alt=""></a>
        <div class="item__info">
            <a href="#"><p class="item__title">${data.name}</p></a>
            <p class="item__description">${data.gender}</p>
            <p class="item__price">${'$'+data.price}</p>
        </div> 
        `;
        product.classList.add('list__item');
        
        list.appendChild(product);
    });
}

const filters = document.querySelector('.filters');

filters.gender.addEventListener('change', function() {
    console.log(filters.gender.value);

    let productsCollection = db.collection('products')

    if(filters.gender.value) {
        productsCollection = productsCollection.where('gender', '==' , filters.gender.value);
    }

    productsCollection.get().then(handleCollectionResult);
});


db.collection('products')
.get()
.then(handleCollectionResult);


/*products.sort(function(a,b) {
    return a.price - b.price
});*/
