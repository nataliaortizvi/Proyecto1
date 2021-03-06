const list = document.querySelector('.list');

const handleCollectionResult = (querySnapshot) => {
    list.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const product = document.createElement('div');
        
        product.innerHTML = `
        <button class="deleteBtn hidden showLoggedAdmin">Borrar</button>
        <a href="./item.html?id=${doc.id}&name=${data.name}">
            <img class="unity__img" src="${data.images[0]?.url}" alt="">
        </a>
        <div class="unity__info">
            <a href="item.html?id=${doc.id}"><p class="unity__title">${data.name}</p></a>
            <p class="unity__description">${'Zapato de '+data.gender}</p>
            <p class="unity__price">${'$'+data.price}</p>
        </div> 
        `;
        product.classList.add('list__unity');
        
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

    //gender filter (3)
    if(filters.gender.value) {
        productsCollection = productsCollection.where('gender', '==' , filters.gender.value);
    }
  
    //price filter (4)
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

let productsCollection = db.collection('products')
productsCollection.get().then(handleCollectionResult);

const filterBtn = document.querySelector('.products__filterBtn');
const popup = document.querySelector('.products__filters-wrapper');
const popupClose = document.querySelector('.filters__closeBtn');
const container = document.querySelector('.container');

filterBtn.addEventListener('click', () => {
    popup.style.display = 'flex';
});

popupClose.addEventListener('click', () => {
    popup.style.display = 'none';
});

/*popup.addEventListener('click', e => {
    if(e.target.className === 'products__filters-wrapper') {
        popup.style.display = 'none';
    }
});*/
