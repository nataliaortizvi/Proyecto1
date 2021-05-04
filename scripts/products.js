const list = document.querySelector('.list');

const handleCollectionResult = (querySnapshot) => {
    list.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const product = document.createElement('a');

        product.innerHTML = `
        <a href="#"><img class="item__img" src="${data.images[0]?.url}" alt=""></a>
        <div class="item__info">
            <a href="#"><p class="item__title">${data.name}    (${data.color})</p></a>
            <p class="item__description">${data.gender}</p>
            <p class="item__price">${'$'+data.price}</p>
        </div> 
        `;
        product.classList.add('list__item');
        
        list.appendChild(product);
    });
}

const filters = document.querySelector('.filters');

filters.addEventListener('change', function() {
    
    let productsCollection = db.collection('products')

    const colores = [];
    filters.colors.forEach(function(checkbox, index){
        if(checkbox.checked){
            switch(index) {
                case 0:
                    colores.push('blanco');
                    break;
                case 1:
                    colores.push('negro');
                    break;
                case 2:
                    colores.push('rosa');
                    break;
                case 3:
                    colores.push('azul');
                    break;
                case 4:
                    colores.push('azul');
                    break;
                case 5:
                    colores.push('azul');
                    break;
                case 6:
                    colores.push('azul');
                    break;
                case 7:
                    colores.push('azul');
                    break;
                case 8:
                    colores.push('azul');
                    break;
                case 9:
                    colores.push('azul');
                    break;
            }
        }
    });

    if(colores.length > 0){
        productsCollection = productsCollection.where('color', 'in', colores);
    }

    if(filters.gender.value) {
        productsCollection = productsCollection.where('gender', '==' , filters.gender.value);
    }

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

    productsCollection.get().then(handleCollectionResult);
});


db.collection('products')
.get()
.then(handleCollectionResult);
