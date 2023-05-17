   //voy a crear el carrito de compras
   let carrito = [];

   function agregarAlCarrito(nombre, precio) {
   const carritoItem = carrito.find(item => item.nombre === nombre); // Verificar si el carrito ya contiene un item con el mismo nombre
 
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
        <span class="precio-carrito">$${producto.precio}</span>
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

//cargo el json y genero el html//
let data = [];

async function cargarDatos() {
  try {
    const response = await fetch('../data/productos.json');
    const dataJson = await response.json();
    data = dataJson;

    const productsContainer = document.getElementById('products-container');
    
    // Recorrer los datos y crear un div para cada producto
    data.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('producto-card');
  
      // Generar el HTML para el div del producto
      productDiv.innerHTML = `
        <h2 class="product-card__title">${product.nombre}</h2>
        <img src="${product.imagen}" alt="${product.nombre}" class="product-card__image">
        <p class="product-card__price">Price: $${product.precio}</p>
        <button id="btn-${product.id}" class="product-card__button">Add to Cart</button>
      `;
  
      const btnAgregarAlCarrito = productDiv.querySelector(`#btn-${product.id}`);
  
      // Agregar un listener al botón para agregar al carrito
      btnAgregarAlCarrito.addEventListener('click', () => {
        agregarAlCarrito(product.nombre, product.precio);
      });
  
      // Agregar el div del producto como hijo del contenedor de productos
      productsContainer.appendChild(productDiv);
    });
  } catch (error) {
    console.error(error);
  } finally {
    // Código a ejecutar independientemente de si ocurre un error o no. Se que este bloque es opcional, pero lo dejo.
  }
}

// Llamar a la función para cargar los datos
cargarDatos();
  
//busqueda
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // para evitar que se envíe el formulario
        const searchInput = document.getElementById('search-input');
        const searchTerm = searchInput.value.trim(); // obtener el término de búsqueda
        if (searchTerm) {
          search(searchTerm); // llamar a la función de búsqueda con el término de búsqueda
        }
    });
    
    function search(searchTerm) {
        const resultados = data.filter(item => item.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const container = document.querySelector('#products-container');
        container.innerHTML = ''; // Limpiar el contenido anterior del contenedor
  
        resultados.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('producto-card');
  
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
      
        container.appendChild(productDiv);
    });
    }
 

  


