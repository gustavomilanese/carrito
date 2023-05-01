   //voy a crear el carrito de compras
   let carrito = [];

   function agregarAlCarrito(nombre, precio) {
   // Verificar si el carrito ya contiene un item con el mismo nombre
   const carritoItem = carrito.find(item => item.nombre === nombre);
 
   if (carritoItem) {
     // Si ya existe un item con el mismo nombre, actualizar la cantidad y el precio total
     carritoItem.cantidad++;
     carritoItem.precioTotal = carritoItem.cantidad * precio;
   } else {
     // Si no existe un item con el mismo nombre, crear un nuevo objeto y agregarlo al carrito
     const nuevoItem = {
       nombre: nombre,
       precio: precio,
       cantidad: 1,
       precioTotal: precio
     };
     carrito.push(nuevoItem);
   }
   actualizarCarrito();
 }


 //actualizar carrito
 function actualizarCarrito() {
  // con el queryselector tomo el div donde se mostrará el carrito
  const carritoEl = document.querySelector('#carrito');
  // Aca guardo en la constante la lista de productos del carrito
  const carritoItemsEl = carritoEl.querySelector('.cart-items');
  // Busca el elemento que muestra el total del carrito
  const cartTotalEl = carritoEl.querySelector('#cart-total');

  
  // Crea una variable para almacenar el HTML generado para los nuevos productos del carrito
  let nuevosProductosHTML = '';
  carrito.slice(-1).forEach(producto => {
    nuevosProductosHTML += `
      <div>
        <span>${producto.nombre}</span>
        <span>$${producto.precio}</span>
      </div>
    `;
  });
  
  // Agrega el HTML generado al elemento que contiene la lista de productos del carrito
  carritoItemsEl.insertAdjacentHTML('beforeend', nuevosProductosHTML);
  
  // Actualiza el total del carrito
  const cartTotal = carrito.reduce((total, producto) => total + producto.precioTotal, 0);
  cartTotalEl.textContent = cartTotal.toFixed(2);

  //vaciar el carrito
  const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
  vaciarCarritoBtn.addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
    carritoItemsEl.innerHTML = '';
  });
  }

  // Cargar el archivo JSON, convertirlo y guardarlo en data.
  fetch('../data/productos.json')
  .then(response => response.json())
  .then(data => {
    
    //tomo el div con el id "products-container"
    const productsContainer = document.getElementById('products-container');

    //recorro data, y para cada (producto) voy creando un div.
    data.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('producto-card');

      //a este nuevo div, que luego sera hijo, le genero el html:
      productDiv.innerHTML = `
        <h2 class="product-card__title">${product.nombre}</h2>
        <img src="${product.imagen}" alt="${product.nombre}" class="product-card__image">
        <p class="product-card__price">Price: $${product.precio}</p>
        <button id="btn-${product.id}" class="product-card__button">Add to Cart</button>
      `;
      
      // hago un query, buscando el boton (btn-1, por ejemplo).
      const btnAgregarAlCarrito = productDiv.querySelector(`#btn-${product.id}`);
      
      //al boton le agrego un listener
      btnAgregarAlCarrito.addEventListener('click', () => {
        agregarAlCarrito(product.nombre, product.precio);
      });

      //le agrego el hijo al div padre usando el metodo appendchild.
      productsContainer.appendChild(productDiv);
    });
  })

  .catch(error => console.error(error));
  
  
 

  


