const list = document.querySelector('.list');

const handleCollectionResult = (querySnapshot) => {
    list.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const product = document.createElement('a');
        
        product.innerHTML = `
        <a href="./item.html?id=${doc.id}"><img class="item__img" src="${data.images[0]?.url}" alt=""></a>
        <div class="item__info">
        <a href="item.html?id=${doc.id}"><p class="item__title">${data.name}</p></a>
        <p class="item__description">${data.gender}</p>
        <p class="item__price">${'$'+data.price}</p>
        </div> 
        `;
        //<p>${new Date(data.createdAt)}</p>
        product.classList.add('list__item');
        
        list.appendChild(product);
    });
}

const filters = document.querySelector('.filters');

//function products changing
filters.addEventListener('change', function() {
    
    let productsCollection = db.collection('products')

    //color filter (1)
    const colores = [];
    filters.colors.forEach(function(checkbox){
        if(checkbox.checked){
            colores.push(checkbox.getAttribute('data-type'));
        }   
    });

    if(colores.length > 0){
        productsCollection = productsCollection.where('color', 'array-contains-any', colores);
    }

    //gender filter (2)
    if(filters.gender.value) {
        productsCollection = productsCollection.where('gender', '==' , filters.gender.value);
    }
  
    //price filter (3)
    if(filters.price.value) {
        switch(filters.price.value){
            case '0':
                productsCollection = productsCollection.where('price', '<' , 50);
                break;
            case '1':
                productsCollection = productsCollection.where('price', '>=' , 50).where('price', '<' , 100);
                break;
            case '2':
                productsCollection = productsCollection.where('price', '>=' , 100).where('price', '<' , 150);           
                break;
            case '3':
                productsCollection = productsCollection.where('price', '>=' , 150).where('price', '<' , 200);                
                break;
            case '4':
                productsCollection = productsCollection.where('price', '>' , 200);
                break;
        }
    }

    //(3) types of order
    if(filters.orden.value) {
        switch(filters.orden.value){
            case 'price_desc':
                //descendent price order
                productsCollection = productsCollection.orderBy('price', 'desc');
                break;
            case 'price_asc':
                //ascendent price order
                productsCollection = productsCollection.orderBy('price', 'asc');
                break;
            case 'alpha':
                //alfabetic order
                if(filters.price.value) {
                    productsCollection = productsCollection.orderBy('price', 'asc');
                }
                productsCollection = productsCollection.orderBy('name', 'asc');          
                break;
            case 'createdAt':
                //most recent order
                if(filters.price.value) {
                    productsCollection = productsCollection.orderBy('price', 'asc');
                }
                productsCollection = productsCollection.orderBy('createdAt', 'desc');               
                break;
        }
    }
    

    productsCollection.get().then(handleCollectionResult);
});


db.collection('products').get().then(handleCollectionResult);
