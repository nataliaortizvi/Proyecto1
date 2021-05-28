//////////////INITIALIZE VARIABLES//////////////
const productForm = document.querySelector('.productForm');
const productForm__success = document.querySelector('.productForm__success');
const productForm__loading = document.querySelector('.productForm__loading');
const productForm__error = document.querySelector('.productForm__error');
const productForm__spaces = document.querySelector('.productForm__spaces');
const productForm__images = document.querySelector('.productForm__images');


const imageFiles = [];


productForm.image.addEventListener('change', function () {
    const file = productForm.image.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = function(event) {
        const productForm__img = document.createElement('img');
        productForm__img.classList.add('productForm__img');
        productForm__img.setAttribute('src', event.target.result);
        productForm__images.appendChild(productForm__img);
    }
    reader.readAsDataURL(productForm.image.files[0]); 
    imageFiles.push(file);
});

productForm.addEventListener('submit', function(event){
    event.preventDefault();

   const product = {
       name: productForm.name.value,
       price: parseInt(productForm.price.value),
       color: [],
       gender: productForm.gender.value,
       createdAt: Date.now(),
   };

   if(productForm.color_blanco.checked) product.color.push('blanco');
   if(productForm.color_negro.checked) product.color.push('negro');
   if(productForm.color_rosa.checked) product.color.push('rosa');
   if(productForm.color_azul.checked) product.color.push('azul');
   if(productForm.color_rojo.checked) product.color.push('rojo');
   if(productForm.color_verde.checked) product.color.push('verde');
   if(productForm.color_amarillo.checked) product.color.push('amarillo');
   if(productForm.color_morado.checked) product.color.push('morado');
   if(productForm.color_naranja.checked) product.color.push('naranja');
   if(productForm.color_gris.checked) product.color.push('gris');

   console.log(product);

    if(productForm.name.value == '' || productForm.price.value == '' || productForm.gender.value == '' || product.color == 0){

        productForm__loading.classList.add('hidden');
        productForm__spaces.classList.remove('hidden');

    }else{

        productForm__loading.classList.remove('hidden');
        productForm__error.classList.add('hidden');

        const genericCatch = function (error) {
            productForm__loading.classList.add('hidden');
            productForm__error.classList.remove('hidden');
        }
    

        // Add information to firestore
        db.collection('products').add(product).then(function(docRef) {
            productForm__spaces.classList.add('hidden');
            productForm__loading.classList.add('hidden');
            productForm__error.classList.add('hidden');
            productForm__success.classList.remove('hidden');

            const uploadPromises = [];
            const downloadUrlPromises = [];

            imageFiles.forEach(function (file){
                var storageRef = firebase.storage().ref();
                var fileRef = storageRef.child(`products/${docRef.id}/${file.name}`);

                //waits image to upload
                uploadPromises.push(fileRef.put(file));
            });

            Promise.all(uploadPromises).then(function (snapchots){

                snapchots.forEach(function(snapshot) {

                    //waits for the image dowonload url
                    downloadUrlPromises.push(snapshot.ref.getDownloadURL());
                });

                Promise.all(downloadUrlPromises).then(function (downloadURLs){

                    const images = [];
                    downloadURLs.forEach(function (url, index) {
                        images.push({
                            url: url,
                            ref: snapchots[index].ref.fullPath
                        });
                    });

                    console.log(downloadURLs);

                    db.collection('products').doc(docRef.id).update({
                        images: images
                    }).then(function (){
                        productForm__loading.classList.add('hidden');
                        productForm__success.classList.remove('hidden');
                    })
                    .catch(genericCatch); 
                })
                .catch(genericCatch); 
            })
            .catch(genericCatch);
        })
        .catch(genericCatch); 
    }

    location.href = './products.html'
});

