/* parte VISTA del patrón MODELO-VISTA-CONTROLADOR */

//constante privada
const EXCECUTE_HANDLER = Symbol('excecuteHandler');

// vista modelo Manager
class ManagerView {

  constructor() {

    // parte del HTML ESTATICO del index.html que usare habitualmente
    
    // elemento main
    this.main = document.getElementsByTagName('main')[0];
    //elemento categories para mostrarlas
    this.categories = document.getElementById('categories');
    //elemento menu categorias
    this.menuCat = document.getElementById('menuCabecera');

    //prueba zona central
    this.zonaCentral = document.getElementById('zonaCentral');

    //prueba zona central titulo
    this.zonaCentralTitulo = document.getElementById('zonaCentralTitulo');

    //parte carrusel para mostrar el contenido de los arrays
    this.mostrarCarrusel = document.getElementById('mostrarCarrusel');

    //mostrar interior arrays
    this.mostrarContenidoArray = document.getElementById('mostrarContenidoArrays');

    //mostrar platos aleatorios al final
    this.aleatorioCarrusel = document.getElementById('myCarousel4');


  }

  [EXCECUTE_HANDLER](handler, handlerArguments, scrollElement, data, url, event) {
    handler(...handlerArguments);
    const scroll = document.querySelector(scrollElement);
    if (scroll) scroll.scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }

  // 4 creamos BIND una vez creados en el CONTROLLER el metodo init onInit y su manejador handleInit
  //una vez creado lo invocamos desde el constructor del CONTROLLER

  bindInit(handler) {
    //click en INICIO
    document.getElementById('init').addEventListener('click', (event) => {
      handler(); //ejecuto handler cuando haga click sobre elemento init,( boton INICIO) this.handleInit llegara desde el CONTROLLER y ejecutara el metodo oonInit()
    });
 
  }

  /* TUTORIA APUNTES CONSIDERACIONES
      // usa atributos personalizados como data-type="Camera", son atributos que crea programador para esta aplicacion
      // todo lo que empiece por data - es atributo personalizado segun HTML
      //usa data-type="Camera" para que cuando clickee se carguen los productos asociados a la Camera
      //lo usan todos los frameworks como Bootstrap
      this.categories.insertAdjacentHTML('beforeend', `<div class="row" id="type-list">
        <div class="col-lg-3 col-md-6"><a href="#product-list" data-type="Camera">
            <div class="cat-list-image"><img alt="Categoría cámaras" src="themes/assets/images/nepali-momo.png" />
            </div>
            <div class="cat-list-text">
              <h3>Cámaras</h3>
              <div>Digitales y reflex</div>
            </div>
          </a>
        </div>
        <div class="col-lg-3 col-md-6"><a href="#product-list" data-type="Smartphone">
            <div class="cat-list-image"><img alt="Categoría móviles" src="themes/assets/images/nepali-momo.png" />
            </div>
            <div class="cat-list-text">
              <h3>Móviles</h3>
              <div>Modelos exclusivos</div>
            </div>
          </a>
        </div>
        <div class="col-lg-3 col-md-6"><a href="#product-list" data-type="Laptop">
            <div class="cat-list-image"><img alt="Categoría portátiles" src="themes/assets/images/nepali-momo.png" />
            </div>
            <div class="cat-list-text">
              <h3>Portátiles</h3>
              <div>Intel y AMD</div>
            </div>
          </a>
        </div>
        <div class="col-lg-3 col-md-6"><a href="#product-list" data-type="Tablet">
            <div class="cat-list-image"><img alt="Categoría Tablets" src="img/cattablet.jpg" />
            </div>
            <div class="cat-list-text">
              <h3>Tablets</h3>
              <div>Android y iPad</div>
            </div>
          </a>
        </div>
      </div>`);
    }
  
    */

 
  //+++++++++++++++++++++métodos que muestran menus en la cabecera++++++++++++++++

  /*creamos menu con las distintas categorias generando una lista a partir del iterador categories
  usamos atributo personalizado con el nombre de la categoria que hara referencia al enlace #product-list
  <a data-category="${category.name}" class="dropdown-item" href="#product-list">${category.name}</a> */
  showCategoriesInMenu(categories) {

    const li = document.createElement('li');
    li.classList.add('dropdown');
    li.insertAdjacentHTML('beforeend', `<a class="dropdown-toggle" href="#" id="menuCate"
			data-toggle="dropdown">Categorías <b class="caret"></b></a>`);
    const container = document.createElement('ul');
    container.classList.add('dropdown-menu');


    for (const category of categories) {
      container.insertAdjacentHTML('beforeend', `<li><a data-category="${category.name}" class="dropdown-item" href="#product-list">${category.name}</a></li>`);
    }
    li.append(container);
    this.menuCat.append(li);
  }


  //creamos menu con las distintas categorias generando una lista a partir del iterador categories
  showRestaurantInMenu(restaurantes) {

    const li = document.createElement('li');
    li.classList.add('dropdown');
    li.insertAdjacentHTML('beforeend', `<a class="dropdown-toggle" href="#" id="menuRestaurante"
			data-toggle="dropdown">Restaurantes <b class="caret"></b></a>`);
    const container = document.createElement('ul');
    container.classList.add('dropdown-menu');

    //************************************** */

    for (const restaurante of restaurantes) {
      container.insertAdjacentHTML('beforeend', `<li><a data-restaurant="${restaurante.name}" class="dropdown-item" href="#restaurant-list">${restaurante.name}</a></li>`);
    }
    li.append(container);
    this.menuCat.append(li);
  }

  //creamos menu con alergenos
  showAlergenostInMenu(alergenos) {

    const li = document.createElement('li');
    li.classList.add('dropdown');
    li.insertAdjacentHTML('beforeend', `<a class="dropdown-toggle" href="#" id="menuAlergeno"
			data-toggle="dropdown">Alérgenos <b class="caret"></b></a>`);
    const container = document.createElement('ul');
    container.classList.add('dropdown-menu');

    //************************************** */

    for (const alergeno of alergenos) {
      container.insertAdjacentHTML('beforeend', `<li><a data-category="${alergeno.name}" class="dropdown-item" href="#product-list">${alergeno.name}</a></li>`);
    }
    li.append(container);
    this.menuCat.append(li);
  }


  //adjuntamos menus al menu
  showMenusInMenu(menus) {

    const li = document.createElement('li');
    li.classList.add('dropdown');
    li.insertAdjacentHTML('beforeend', `<a class="dropdown-toggle" href="#" id="menuDeMenus"
			data-toggle="dropdown">Menús <b class="caret"></b></a>`);
    const container = document.createElement('ul');
    container.classList.add('dropdown-menu');

    //************************************** */

    for (const menu of menus) {
      container.insertAdjacentHTML('beforeend', `<li><a data-category="${menu.name}" class="dropdown-item" href="#product-list">${menu.name}</a></li>`);
    }
    li.append(container);
    this.menuCat.append(li);
  }

  /*muestra las categorias en la parte Central*/
  showCategoriesEnParteCentral(categories) {

    // borro hijos
    this.zonaCentralTitulo.replaceChildren();
    this.zonaCentral.replaceChildren();


    // parte del titulo
    this.zonaCentralTitulo.insertAdjacentHTML('beforeend',
      `
         <div class="container">
           <h1>CATEGORIAS</h1>
           <p>
             Estan son las categorias disponibles actualmente.
         </p>
         </div>
         `);
    

    //parte div general
    const container = document.createElement('div');
    container.id = 'category-list';
    container.classList.add('container');
    const hijo = document.createElement('div');
    container.appendChild(hijo);
    hijo.classList.add('row');

    //recorro cada una de las categorias
    for (const category of categories) {
      hijo.insertAdjacentHTML('beforeend',
        `<div class="col-lg-4">
           <div class="media">
             <a data-category="${category.name}" href="#product-list">
               <img src="${category.url}" alt="${category.name}" />
             </a>
             <h3 class="media-heading text-danger-theme">${category.name}</h3>
             <p>${category.description}</p>
           </div>
         </div>
   
         `);
    }
    this.zonaCentral.append(container);
  }


  //metodo que muestra el interior de los arrays
  mostrarInteriorArrays(products, objeto) {
    
    //borro hijos zonaCentral y central titulo
    
    this.zonaCentralTitulo.replaceChildren();
    this.zonaCentral.replaceChildren();


    // parte del titulo
    this.zonaCentralTitulo.insertAdjacentHTML('beforeend',
      `
       <div class="container">
         <h1>${objeto.name}</h1>
         <p>
          
           descripción: ${objeto.description}.

          </p>
          <h3>Platos disponibles actualmente</h3>
          <p>
          </p>
       </div>
       `);

    //parte div general
    const container = document.createElement('div');
    container.id = 'product-list';
    container.classList.add('container');
    const hijo = document.createElement('div');
    container.appendChild(hijo);
    hijo.classList.add('row');

    //crea enlace para cada uno de los productos
    for (const product of products) {
      hijo.insertAdjacentHTML('beforeend',
        `<div class="col-lg-4">
         <div class="media">
           <a data-serial="${product.name}" href="#product-list">
             <img src="${product.image}" alt="${product.name}" />
           </a>
           <h3 class="media-heading text-danger-theme">${product.name}</h3>
        
         </div>
       </div>
 
       `);
    }
    this.zonaCentral.append(container);
  }


  //metodo que muestra 3 platos de forma aleatoria, se cargara con la página.
  // para que genere otros 3 platos distintos hay que recargar el navegador puesto que el enunciado no especifica que vuelva a cargar se con Inicio
  mostrarPlatosAleatorio(platos) {

    //parte tras menu de navegacion

    //insertar elementos en el carrusel

    //generar 3 platos de forma aleatoria

  

    if (this.aleatorioCarrusel.children.length > 1) this.aleatorioCarrusel.children[1].remove();

    this.aleatorioCarrusel.insertAdjacentHTML('beforeend', `
    <div class="carousel-inner">
    <div class="item active" data-bs-interval="2500">
      <div class="row featurette">

        <div class="col-md-7">
          <h2 class="featurette-heading">${platos[0].name} <span class="text-muted">Espectacular.</span></h2>
          <p class="lead">${platos[0].description}.</p>
        </div>
        <div class="col-md-5">
          <img src=${platos[0].image} alt=${platos[0].name}>
        </div>

      </div>
    </div>


    <div class="item" data-bs-interval="2500">
      <div class="row featurette">
        <div class="col-md-5">
          <img src=${platos[1].image} alt=${platos[1].name}>
        </div>
        <div class="col-md-7">
          <h2 class="featurette-heading">${platos[1].name}<span class="text-muted">Delicioso.</span></h2>
          <p class="lead">${platos[1].description}</p>
        </div>
      </div>
    </div>


    <div class="item" data-bs-interval="2500">
      <div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading">${platos[2].name}<span class="text-muted">Increible.</span></h2>
          <p class="lead">${platos[2].description}</p>
        </div>
        <div class="col-md-5">
          <img class="img-circle" src=${platos[2].image} alt=>
        </div>
      </div>
    </div>
  </div>`);

    /*IMPORTANTE si se crea sólo un elemento con createElement y 
    se inserta en varias posiciones, no se copia, sino que se mueve de posición, esto implica que
    al ejecutar appendChild(div) no apareceran 9 inserciones sino solo 3 las demas se copian
    solucion: https://developer.mozilla.org/es/docs/Web/API/Node/appendChild
    */

  
  }

  //+++++++++++++++++++++++ metodos bind para generar los productos (platos) asociados a cada categoria 

  //una vez pintado el HTML con showCategoriesEnParteCentral(categories) recojo cada uno de los enlaces y les asigno un
  //manejador de evento al hacer click para cada una de las categorias ( conseguidas mediante atributo personalizado en dataset.category)
  //productos de  categoria en zona central.
  //el manejador de eventos lo recibira por parámetro siendo este handleProductsCategoryList del CONTROLADOR el cual tras recibir 
  //la categoria desde dataset conseguira todos los platos de dicha categoria mostrandolos en la VISTA medinate el método
  //this[VIEW].mostrarInteriorArrays(this[MODEL].getDishesInCategory(categoria), categoria.title);

  bindProductsCategoryList(handler) {
    const categoryList = document.getElementById('category-list'); //lo recojo de las categorias pintadas
    const links = categoryList.querySelectorAll('a'); //selecciono todos los enlaces

    //para cada enlace a asigno escucha pasando al handler el atributo data-category para saber que tiene que mostrar
    for (const link of links) {
      link.addEventListener('click', (event) => {
        handler(event.currentTarget.dataset.category);
      });
    }
  }


  // metodo bin para asignar manejador de evento a cada uno de los platos de manera que sean clickeables. Usamos atributo product-list
  bindMostrarFichaPlato(handler) {
    const platos = document.getElementById('product-list');
    
    //para mi ejericio
    const links = platos.querySelectorAll('a h3');

    // asigno manejador a los enlaces del nombre
    for (const link of links) {
      link.addEventListener('click', (event) => {
        const { serial } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [serial],
          '#single-product',
          { action: 'mostrarFichaPlato', serial },
          '#single-product',
          event,
        );
      });
    }

    //para mi ejercicio
    const images = platos.querySelectorAll('a');

    // asigno manejador a los enlaces desde la imagen pasandole el atributo serial desde currentTarget
    for (const image of images) {
      image.addEventListener('click', (event) => {
        const { serial } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [serial],
          '#single-product',
          { action: 'mostrarFichaPlato', serial },
          '#single-product',
          event,
        );
      });
    }
  }

  

  //bind para categorias
  bindProductsCategoryListInMenu(handler) {
    const menuCat = document.getElementById('menuCate');
    const links = menuCat.nextSibling.querySelectorAll('a');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        handler(event.currentTarget.dataset.category);
      });
    }
  }


  //bind para alergenos
  bindProductsAlergenosListInMenu(handler) {
    const menuAler = document.getElementById('menuAlergeno');
    const links = menuAler.nextSibling.querySelectorAll('a');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        handler(event.currentTarget.dataset.category);
      });
    }
  }

  //bind para restaurante
  bindProductsRestauranteListInMenu(handler) {
    const menuRes = document.getElementById('menuRestaurante');
    const links = menuRes.nextSibling.querySelectorAll('a');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        handler(event.currentTarget.dataset.restaurant);
      });
    }
  }

  //bind para menu
  bindProductsMenuListInMenu(handler) {
    const menu = document.getElementById('menuDeMenus');
    const links = menu.nextSibling.querySelectorAll('a');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        handler(event.currentTarget.dataset.category);
      });
    }
  }


  //metodo muestra la VISTA con los datos de cada plato o un mensaje en caso de que no se pueda cargar
  mostrarFichaPlato(plato, message) {

    this.zonaCentralTitulo.replaceChildren();
    this.zonaCentral.replaceChildren();


    // parte del titulo
    this.zonaCentralTitulo.insertAdjacentHTML('beforeend',
      `
     <div class="container" id="central">
       <h1>Características</h1>
       <p>
         Estas son las características del plato <b> ${plato.name}</b>.
     </p>
     </div>
     `);
     
    const container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('mt-5');
    container.classList.add('mb-5');

    //si existe genero el HTML
    if (plato) {
      container.id = 'single-product';
      container.classList.add(`${plato.constructor.name}-style`);
      container.insertAdjacentHTML('beforeend', `<div class="row d-flex justify-content-center">
        <div class="col-md-10">
          <div class="card">
            <div class="row">
              <div class="col-md-6">
                <div class="images p-3">
                  <div class="text-center p-4"> <img id="main-image" src="${plato.image}"/> </div>
                </div>
              </div>
              <div class="col-md-6" id ="divFichaPlato">
                <div class="product p-4" >

                  <div class="mt-4 mb-3"> 
                    <p> descripción</p>
                    <span class="text-uppercase">${plato.description}</span>
                    <p></p>
                    </div>
                  
                  <div class="sizes mt-5">
                    <p> ingredientes</p>
                    <span class="text-uppercase">${plato.ingredients}</span>
                    <p></p>
                    </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`);


    } else {
      container.insertAdjacentHTML(
        'beforeend',
        `<div class="row d-flex justify-content-center">
        ${message}
      </div>`,
      );
    }
    this.zonaCentral.append(container);
  }


  //metodo muestra las caracteristicas del restaurante
  showRestaurante(restaurant, message) {

    //elimino contenido anterior
    this.zonaCentralTitulo.replaceChildren();
    this.zonaCentral.replaceChildren();


    // parte del titulo
    this.zonaCentralTitulo.insertAdjacentHTML('beforeend',
      `
     <div class="container" id="central">
       <h1>Características</h1>
       <p>
         Estas son las características del restaurante <b> ${restaurant.name}</b>.
     </p>
     </div>
     `);
    
    const container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('mt-5');
    container.classList.add('mb-5');

    //si existe genero el HTML
    if (restaurant) {
      container.id = 'restaurant-list';
      container.classList.add(`${restaurant.constructor.name}-style`);
      container.insertAdjacentHTML('beforeend', `<div class="row d-flex justify-content-center">
        <div class="col-md-10">
          <div class="card">
            <div class="row">
              <div class="col-md-6">
                
              </div>
              <div class="col-md-6" id ="divFichaPlato">
                <div class="product p-4" >

                  <div class="mt-4 mb-3"> 
                    <p> descripción</p>
                    <span class="text-uppercase">${restaurant.description}</span>
                    <p></p>
                    </div>
                  
              
                  <div class="sizes mt-5">
                    <p> localizacion</p>
                    <span class="text-uppercase">${restaurant.location}</span>
                    <p></p>
                    </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`);

    } else {
      container.insertAdjacentHTML(
        'beforeend',
        `<div class="row d-flex justify-content-center">
        ${message}
      </div>`,
      );
    }
    this.zonaCentral.append(container);
  }


  //+++++++++++++++++++++++++++++++ añado para esta práctica metodos para formulario ++++++++++++++++++++++++++++++++

  //mostrar en MODALES o se puede mostrar en la PARTE CENTRAL segun enunciado


  //mostrar platos en MODAL
  showNewPlatoModal(done, cat, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Nueva Categoría';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', `<div class="p-3">La categoría <strong>${cat.title}</strong> ha sido creada correctamente.</div>`);
    } else {
      body.insertAdjacentHTML(
        'afterbegin',
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La categoría <strong>${cat.title}</strong> ya está creada.</div>`,
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewPlato.reset();
      }
      document.fNewPlato.ncTitle.focus();
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

  //mostrar categorias en MODAL
  showNewCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Nueva Categoría';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', `<div class="p-3">La categoría <strong>${cat.title}</strong> ha sido creada correctamente.</div>`);
    } else {
      body.insertAdjacentHTML(
        'afterbegin',
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La categoría <strong>${cat.title}</strong> ya está creada.</div>`,
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewCategory.reset();
      }
      document.fNewCategory.ncTitle.focus();
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

  //mostrar borrar categorias en MODAL
  showRemoveCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Borrado de categoría';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', `<div class="p-3">La categoría <strong>${cat.title}</strong> ha sido eliminada correctamente.</div>`);
    } else {
      body.insertAdjacentHTML(
        'afterbegin',
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La categoría <strong>${cat.title}</strong> no se ha podido borrar.</div>`,
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        const removeCategory = document.getElementById('remove-category');
        const button = removeCategory.querySelector(`button.btn[data-category="${cat.title}"]`);
        button.parentElement.parentElement.remove();
      }
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

  // muestra borrar lista productos (interior array)
  showRemoveProductList(products) {
    const listContainer = document.getElementById('product-list').querySelector('div.row');
    listContainer.replaceChildren();

    let exist = false;
    for (const product of products) {
      exist = true;
      listContainer.insertAdjacentHTML('beforeend', `<div class="col-md-4 rProduct">
				<figure class="card card-product-grid card-lg"> <a data-serial="${product.serial}" href="#single-product" class="img-wrap"><img class="${product.constructor.name}-style" src="${product.url}"></a>
					<figcaption class="info-wrap">
						<div class="row">
							<div class="col-md-8"> <a data-serial="${product.serial}" href="#single-product" class="title">${product.brand} - ${product.model}</a> </div>
							<div class="col-md-4">
								<div class="rating text-right"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
							</div>
						</div>
					</figcaption>
					<div class="bottom-wrap"> <a href="#" data-serial="${product.serial}" class="btn btn-primary float-right"> Eliminar </a>
						<div class="price-wrap"> <span class="price h5">${product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span> <br> <small class="text-success">Free shipping</small> </div>
					</div>
				</figure>
			</div>`);
    }
    if (!exist) {
      listContainer.insertAdjacentHTML('beforeend', '<p class="text-danger"><i class="bi bi-exclamation-triangle"></i> No existen productos para esta categoría o tipo.</p>');
    }
  }

  // error al borrar lista de productos
  showRemoveProductListError(category) {
    const listContainer = document.getElementById('product-list').querySelector('div.row');
    listContainer.replaceChildren();
    listContainer.insertAdjacentHTML('beforeend', `<p class="text-danger"><i class="bi bi-exclamation-triangle"></i> La categoría <strong>${category.title}</strong> no existe en el Manager.</p>`);
  }

  // muestra borrar productos en MODAL
  showRemoveProductModal(done, product, error) {
    const productList = document.getElementById('product-list');
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Producto eliminado';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', `<div class="p-3">El producto <strong>${product.brand} - ${product.model}</strong> con nº de serie <strong>${product.serial}</strong> ha sido eliminado correctamente.</div>`);
    } else {
      body.insertAdjacentHTML(
        'afterbegin',
        '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El producto no existe en el manager.</div>',
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        const button = productList.querySelector(`a.btn[data-serial="${product.serial}"]`);
        button.parentElement.parentElement.parentElement.remove();
      }
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }











  // método que muestra menu con las operaciones del formulario
  showAdminMenu() {

    

    //************************************** */

    /*
    for (const alergeno of alergenos) {
      container.insertAdjacentHTML('beforeend', `<li><a data-category="${alergeno.name}" class="dropdown-item" href="#product-list">${alergeno.name}</a></li>`);
    }
    */

   
    
    const menuOption = document.createElement('li');
    menuOption.classList.add('dropdown');
    menuOption.insertAdjacentHTML('beforeend', `<a class="dropdown-toggle" href="#" id="menuOperativa"
    data-toggle="dropdown">Operativa <b class="caret"></b></a>`
    );

    const suboptions = document.createElement('ul');
    suboptions.classList.add('dropdown-menu');
    
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="lcrearPlato" class="dropdown-item" href="#new-plato">Crear plato</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="leliminarPlato" class="dropdown-item" href="#del-plato">Eliminar plato</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="lasignarPlatoMenu" class="dropdown-item" href="#asignar-plato">Asignar plato a menu</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="ldeasignarPlatoMenu" class="dropdown-item" href="#deasignar-plato">Deasignar plato a menu</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="lcrearCategoria" class="dropdown-item" href="#new-categoria">Crear categoria</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="leliminarCategoria" class="dropdown-item" href="#del-categoria">Eliminar categoria</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="lmodificarCategoria" class="dropdown-item" href="#change-categoria">Modificar categoria</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="lcrearRestaurante" class="dropdown-item" href="#new-restaurant">Crear restaurante</a></li>');

    /*
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="lnewCategory" class="dropdown-item" href="#new-category">Crear categoría</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="ldelCategory" class="dropdown-item" href="#del-category">Eliminar categoría</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="lnewProduct" class="dropdown-item" href="#new-product">Crear producto</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="ldelProduct" class="dropdown-item" href="#del-product">Eliminar producto</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="ldelProduct2" class="dropdown-item" href="#del-product">Eliminar producto 2</a></li>');
    */
    menuOption.append(suboptions);
    this.menuCat.append(menuOption);
  }



  // añado para la practica CORRECTO
  //método formulario añadir platos
showNewPlatoForm() {
  this.zonaCentralTitulo.replaceChildren();
  if (this.zonaCentral.children.length > 1) this.zonaCentral.children[1].remove();

  const container = document.createElement('div');
  container.classList.add('container');
  container.classList.add('my-3');
  container.id = 'new-plato';

  container.insertAdjacentHTML(
    'afterbegin',
    '<h1 class="display-5">Crear plato</h1>',
  );
  container.insertAdjacentHTML(
    'beforeend',
    `<form name="fNewPlato" role="form" class="row g-3" novalidate>
    <div class="col-md-6 mb-3">
      <label class="form-label" for="ncTitle">Nombre *</label>
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-type"></i></span>
        <input type="text" class="form-control" id="ncTitle" name="ncTitle"
          placeholder="Nombre del plato" value="" required>
        <div class="invalid-feedback">El nombre es obligatorio.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <label class="form-label" for="ncUrl">URL de la imagen *</label>
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-file-image"></i></span>
        <input type="url" class="form-control" id="ncUrl" name="ncUrl" placeholder="URL de la imagen"
          value="" required>
        <div class="invalid-feedback">La URL no es válida.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>
    <div class="col-md-12 mb-3">
      <label class="form-label" for="ncDescription">Descripción</label>
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-body-text"></i></span>
        <input type="text" class="form-control" id="ncDescription" name="ncDescription" value="">
        <div class="invalid-feedback"></div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>

    <div class="col-md-12 mb-3">
      <label class="form-label" for="ncIngredientes">Ingredientes</label>
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-body-text"></i></span>
        <input type="text" class="form-control" id="ncDescription" name="ncIngredientes" value="">
        <div class="invalid-feedback"></div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>





    <div class="mb-12">
      <button class="btn btn-primary" type="submit">Enviar</button>
      <button class="btn btn-primary" type="reset">Cancelar</button>
    </div>
  </form>`,
  );
  this.zonaCentral.append(container);
}

  // método muestra en modal categoria
  showNewCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Nueva Categoría';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', `<div class="p-3">La categoría <strong>${cat.title}</strong> ha sido creada correctamente.</div>`);
    } else {
      body.insertAdjacentHTML(
        'afterbegin',
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La categoría <strong>${cat.title}</strong> ya está creada.</div>`,
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewCategory.reset();
      }
      document.fNewCategory.ncTitle.focus();
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

  //método que muestra borrar categoria en MODAL
  showRemoveCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Borrado de categoría';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', `<div class="p-3">La categoría <strong>${cat.title}</strong> ha sido eliminada correctamente.</div>`);
    } else {
      body.insertAdjacentHTML(
        'afterbegin',
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La categoría <strong>${cat.title}</strong> no se ha podido borrar.</div>`,
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        const removeCategory = document.getElementById('remove-category');
        const button = removeCategory.querySelector(`button.btn[data-category="${cat.title}"]`);
        button.parentElement.parentElement.remove();
      }
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }


/* DE PABLO ME DA ERROR
  //método formulario añadir categorias


  showNewCategoryForm() {
    this.main.replaceChildren();
    if (this.categories.children.length > 1) this.categories.children[1].remove();

    const container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('my-3');
    container.id = 'new-category';

    container.insertAdjacentHTML(
      'afterbegin',
      '<h1 class="display-5">Nueva categoría</h1>',
    );
    container.insertAdjacentHTML(
      'beforeend',
      `<form name="fNewCategory" role="form" class="row g-3" novalidate>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ncTitle">Título *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-type"></i></span>
					<input type="text" class="form-control" id="ncTitle" name="ncTitle"
						placeholder="Título de categoría" value="" required>
					<div class="invalid-feedback">El título es obligatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ncUrl">URL de la imagen *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-file-image"></i></span>
					<input type="url" class="form-control" id="ncUrl" name="ncUrl" placeholder="URL de la imagen"
						value="" required>
					<div class="invalid-feedback">La URL no es válida.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-12 mb-3">
				<label class="form-label" for="ncDescription">Descripción</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<input type="text" class="form-control" id="ncDescription" name="ncDescription" value="">
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="mb-12">
				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-primary" type="reset">Cancelar</button>
			</div>
		</form>`,
    );
    this.main.append(container);
  }
*/

  //método formulario para borrar categorias
  showRemoveCategoryForm(categories) {
    this.main.replaceChildren();
    if (this.categories.children.length > 1) this.categories.children[1].remove();

    const container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('my-3');
    container.id = 'remove-category';
    container.insertAdjacentHTML(
      'afterbegin',
      '<h1 class="display-5">Eliminar una categoría</h1>',
    );

    const row = document.createElement('div');
    row.classList.add('row');

    for (const category of categories) {
      row.insertAdjacentHTML('beforeend', `<div class="col-lg-3 col-md-6">
        <div class="cat-list-image"><img alt="${category.title}" src="${category.url}" />
        </div>
        <div class="cat-list-text">
          <a data-category="${category.title}" href="#category-list"><h3>${category.title}</h3></a>
					<div>${category.description}</div>
        </div>
				<div><button class="btn btn-primary" data-category="${category.title}" type='button'>Eliminar</button></div>
    </div>`);
    }
    container.append(row);
    this.main.append(container);
  }

//------------------------------PRODUCTOS FORMULARIO ----------

//mostrar nuevo producto en formulario
showNewProductForm(categories) {
  this.main.replaceChildren();
  if (this.categories.children.length > 1) this.categories.children[1].remove();

  const container = document.createElement('div');
  container.classList.add('container');
  container.classList.add('my-3');
  container.id = 'new-product';

  container.insertAdjacentHTML(
    'afterbegin',
    '<h1 class="display-5">Nuevo producto</h1>',
  );

  const form = document.createElement('form');
  form.name = 'fNewProduct';
  form.setAttribute('role', 'form');
  form.setAttribute('novalidate', '');
  form.classList.add('row');
  form.classList.add('g-3');

  form.insertAdjacentHTML(
    'beforeend',
    `<div class="col-md-4 mb-3">
      <label class="form-label" for="npSerial">Número de serie *</label>
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-key"></i></span>
        <input type="text" class="form-control" id="npSerial" name="npSerial" value="" required>
        <div class="invalid-feedback">El número de serie es obligatorio. Debe ser un entero.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`,
  );
  form.insertAdjacentHTML(
    'beforeend',
    `<div class="col-md-4 mb-3">
      <label class="form-label" for="npBrand">Marca *</label>
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-pen"></i></span>
        <input type="text" class="form-control" id="npBrand" name="npBrand"
          placeholder="Marca" value="" required>
        <div class="invalid-feedback">La marca es obligatoria.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`,
  );
  form.insertAdjacentHTML(
    'beforeend',
    `<div class="col-md-4 mb-3">
      <label class="form-label" for="npModel">Modelo *</label>
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-hash"></i></span>
        <input type="text" class="form-control" id="npModel" name="npModel"
          placeholder="Modelo" value="" required>
        <div class="invalid-feedback">El modelo es obligatorio.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`,
  );
  form.insertAdjacentHTML(
    'beforeend',
    `<div class="col-md-12 mb-3 input-group">
      <label class="input-group-text" for="npType" style="color: #faa541">* Tipo de producto</label>
      <select class="form-select" name="npType" id="npType" requiered>
        <option selected>Selecciona...</option>
        <option value="Camera">Cámara</option>
        <option value="Laptop">Portátil</option>
        <option value="Tablet">Tablet</option>
        <option value="Smartphone">Teléfono</option>
      </select>
      <div class="invalid-feedback">El tipo es obligatorio.</div>
      <div class="valid-feedback">Correcto.</div>
    </div>`,
  );
  form.insertAdjacentHTML(
    'beforeend',
    `<div class="col-md-3 mb-3">
      <label class="form-label" for="npPrice">Precio *</label>
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-currency-euro"></i></span>
        <input type="number" class="form-control" id="npPrice" name="npPrice"
          placeholder="Precio" value="" min="0" step="10" required>
        <div class="invalid-feedback">El precio es obligatorio.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`,
  );
  form.insertAdjacentHTML(
    'beforeend',
    `<div class="col-md-3 mb-3">
      <label class="form-label" for="npTax">Porcentaje de impuestos *</label>
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-percent"></i></span>
        <input type="number" class="form-control" id="npTax" name="npTax"
          placeholder="21%" value="21" min="0" step="1" required>
        <div class="invalid-feedback">Los impuestos son obligatorios.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`,
  );
  form.insertAdjacentHTML(
    'beforeend',
    `<div class="col-md-6 mb-3">
      <label class="form-label" for="npUrl">URL *</label>
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-card-image"></i></span>
        <input type="url" class="form-control" id="npUrl" name="npUrl"
          placeholder="http://www.test.es" value="" min="0" step="1" required>
        <div class="invalid-feedback">La URL no es válida.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`,
  );
  form.insertAdjacentHTML(
    'beforeend',
    `<div class="col-md-3 mb-3">
      <label class="form-label" for="npCategories">Categorías *</label>
      <div class="input-group">
        <label class="input-group-text" for="npCategories"><i class="bi bi-card-checklist"></i></label>
        <select class="form-select" name="npCategories" id="npCategories" multiple required>
        </select>
        <div class="invalid-feedback">El producto debe pertenecer al menos a una categoría.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`,
  );
  const npCategories = form.querySelector('#npCategories');
  for (const category of categories) {
    npCategories.insertAdjacentHTML('beforeend', `<option value="${category.title}">${category.title}</option>`);
  }
  form.insertAdjacentHTML(
    'beforeend',
    `<div class="col-md-9 mb-3">
      <label class="form-label" for="npModel">Descripción</label>
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-text-paragraph"></i></span>
        <textarea class="form-control" id="npDescription" name="npDescription" rows="4">
        </textarea>
        <div class="invalid-feedback"></div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`,
  );
  form.insertAdjacentHTML(
    'beforeend',
    `<div class="mb-12">
      <button class="btn btn-primary" type="submit">Enviar</button>
      <button class="btn btn-primary" type="reset">Cancelar</button>
    </div>`,
  );

  container.append(form);
  this.main.append(container);
}

//mostrar nuevo producto en MODAL
showNewProductModal(done, product, error) {
  const messageModalContainer = document.getElementById('messageModal');
  const messageModal = new bootstrap.Modal('#messageModal');

  const title = document.getElementById('messageModalTitle');
  title.innerHTML = 'Producto creado';
  const body = messageModalContainer.querySelector('.modal-body');
  body.replaceChildren();
  if (done) {
    body.insertAdjacentHTML('afterbegin', `<div class="p-3">El producto <strong>${product.brand} - ${product.model}</strong> con nº de serie <strong>${product.serial}</strong> ha sido creada correctamente.</div>`);
  } else {
    body.insertAdjacentHTML(
      'afterbegin',
      `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El producto <strong>${product.brand} - ${product.model}</strong> no ha podido crearse correctamente.</div>`,
    );
  }
  messageModal.show();
  const listener = (event) => {
    if (done) {
      document.fNewProduct.reset();
    }
    document.fNewProduct.npSerial.focus();
  };
  messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
}

//muestra borrar productos del formulario
showRemoveProductForm(categories) {
  this.main.replaceChildren();
  if (this.categories.children.length > 1) this.categories.children[1].remove();

  const container = document.createElement('div');
  container.classList.add('container');
  container.classList.add('my-3');
  container.id = 'remove-product';

  container.insertAdjacentHTML(
    'afterbegin',
    '<h1 class="display-5">Eliminar un producto</h1>',
  );

  const form = document.createElement('form');
  form.name = 'fRemoveProduct';
  form.setAttribute('role', 'form');
  form.setAttribute('novalidate', '');
  form.classList.add('row');
  form.classList.add('g-3');

  form.insertAdjacentHTML(
    'beforeend',
    `<div class="col-md-6 mb-3">
      <label class="form-label" for="rpType">Tipos de producto</label>
      <div class="input-group">
        <label class="input-group-text" for="rpType"><i class="bi bi-card-checklist"></i></label>
        <select class="form-select" name="rpType" id="rpType">
          <option disabled selected>Selecciona un tipo...</option>
          <option value="Camera">Cámara</option>
          <option value="Laptop">Portátil</option>
          <option value="Tablet">Tablet</option>
          <option value="Smartphone">Teléfono</option>
        </select>
      </div>
    </div>`,
  );

  form.insertAdjacentHTML(
    'beforeend',
    `<div class="col-md-6 mb-3">
      <label class="form-label" for="rpCategories">Categorías del producto</label>
      <div class="input-group">
        <label class="input-group-text" for="rpCategories"><i class="bi bi-card-checklist"></i></label>
        <select class="form-select" name="rpCategories" id="rpCategories">
          <option disabled selected value=''>Selecciona una categoría</option>
        </select>
      </div>
    </div>`,
  );
  const rpCategories = form.querySelector('#rpCategories');
  for (const category of categories) {
    rpCategories.insertAdjacentHTML('beforeend', `<option value="${category.title}">${category.title}</option>`);
  }

  container.append(form);
  container.insertAdjacentHTML(
    'beforeend',
    '<div id="product-list" class="container my-3"><div class="row"></div></div>',
  );

  this.main.append(container);
}

//borrar productos FORM
showRemoveProductForm2(categories) {
  this.main.replaceChildren();
  if (this.categories.children.length > 1) this.categories.children[1].remove();

  const container = document.createElement('div');
  container.classList.add('container');
  container.classList.add('my-3');
  container.id = 'remove-product';

  container.insertAdjacentHTML(
    'afterbegin',
    `<h1 class="display-5">Eliminar un producto 2</h1>
     <p>Filtra tanto por tipo como por categoría.</p>
    `,
  );

  const form = document.createElement('form');
  form.name = 'fRemoveProduct';
  form.setAttribute('role', 'form');
  form.setAttribute('novalidate', '');
  form.classList.add('row');
  form.classList.add('g-3');

  form.insertAdjacentHTML(
    'beforeend',
    `<div class="col-md-6 mb-3">
      <label class="form-label" for="rpType">Tipos de producto</label>
      <div class="input-group">
        <label class="input-group-text" for="rpType"><i class="bi bi-card-checklist"></i></label>
        <select class="form-select" name="rpType" id="rpType">
          <option selected>Selecciona un tipo...</option>
          <option value="Camera">Cámara</option>
          <option value="Laptop">Portátil</option>
          <option value="Tablet">Tablet</option>
          <option value="Smartphone">Teléfono</option>
        </select>
      </div>
    </div>`,
  );

  form.insertAdjacentHTML(
    'beforeend',
    `<div class="col-md-6 mb-3">
      <label class="form-label" for="rpCategories">Categorías del producto</label>
      <div class="input-group">
        <label class="input-group-text" for="rpCategories"><i class="bi bi-card-checklist"></i></label>
        <select class="form-select" name="rpCategories" id="rpCategories">
          <option selected value=''>Selecciona una categoría</option>
        </select>
      </div>
    </div>`,
  );

  form.insertAdjacentHTML(
    'beforeend',
    `<div class="col-md-12 mb-3">
      <button class="btn btn-primary">Filtrar</button>
    </div>`,
  );
  const rpCategories = form.querySelector('#rpCategories');
  for (const category of categories) {
    rpCategories.insertAdjacentHTML('beforeend', `<option value="${category.title}">${category.title}</option>`);
  }

  container.append(form);
  container.insertAdjacentHTML(
    'beforeend',
    '<div id="product-list" class="container my-3"><div class="row"></div></div>',
  );

  this.main.append(container);
}

//muestra borrar lista productos
showRemoveProductList(products) {
  const listContainer = document.getElementById('product-list').querySelector('div.row');
  listContainer.replaceChildren();

  let exist = false;
  for (const product of products) {
    exist = true;
    listContainer.insertAdjacentHTML('beforeend', `<div class="col-md-4 rProduct">
      <figure class="card card-product-grid card-lg"> <a data-serial="${product.serial}" href="#single-product" class="img-wrap"><img class="${product.constructor.name}-style" src="${product.url}"></a>
        <figcaption class="info-wrap">
          <div class="row">
            <div class="col-md-8"> <a data-serial="${product.serial}" href="#single-product" class="title">${product.brand} - ${product.model}</a> </div>
            <div class="col-md-4">
              <div class="rating text-right"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
            </div>
          </div>
        </figcaption>
        <div class="bottom-wrap"> <a href="#" data-serial="${product.serial}" class="btn btn-primary float-right"> Eliminar </a>
          <div class="price-wrap"> <span class="price h5">${product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span> <br> <small class="text-success">Free shipping</small> </div>
        </div>
      </figure>
    </div>`);
  }
  if (!exist) {
    listContainer.insertAdjacentHTML('beforeend', '<p class="text-danger"><i class="bi bi-exclamation-triangle"></i> No existen productos para esta categoría o tipo.</p>');
  }
}

//método error al borrar lista productos
showRemoveProductListError(category) {
  const listContainer = document.getElementById('product-list').querySelector('div.row');
  listContainer.replaceChildren();
  listContainer.insertAdjacentHTML('beforeend', `<p class="text-danger"><i class="bi bi-exclamation-triangle"></i> La categoría <strong>${category.title}</strong> no existe en el Manager.</p>`);
}

//muestra borrar producto en MODAL
showRemoveProductModal(done, product, error) {
  const productList = document.getElementById('product-list');
  const messageModalContainer = document.getElementById('messageModal');
  const messageModal = new bootstrap.Modal('#messageModal');

  const title = document.getElementById('messageModalTitle');
  title.innerHTML = 'Producto eliminado';
  const body = messageModalContainer.querySelector('.modal-body');
  body.replaceChildren();
  if (done) {
    body.insertAdjacentHTML('afterbegin', `<div class="p-3">El producto <strong>${product.brand} - ${product.model}</strong> con nº de serie <strong>${product.serial}</strong> ha sido eliminado correctamente.</div>`);
  } else {
    body.insertAdjacentHTML(
      'afterbegin',
      '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El producto no existe en el manager.</div>',
    );
  }
  messageModal.show();
  const listener = (event) => {
    if (done) {
      const button = productList.querySelector(`a.btn[data-serial="${product.serial}"]`);
      button.parentElement.parentElement.parentElement.remove();
    }
  };
  messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
}

//-------------------------------- METODOS BIND ASOCIADOS -------------------------------


// bind admin menu recibe manaejadores para cada una de las operaciones
//bindAdminMenu(handleCrearPlato, hRemoveCategory, hNewProductForm, hRemoveProduct, hRemoveProduct2) {


  bindAdminMenu(handleCrearPlato) {


  /*
  suboptions.insertAdjacentHTML('beforeend', '<li><a id="lcrearPlato" class="dropdown-item" href="#new-plato">Crear plato</a></li>');
  suboptions.insertAdjacentHTML('beforeend', '<li><a id="leliminarPlato" class="dropdown-item" href="#del-plato">Eliminar plato</a></li>');
  suboptions.insertAdjacentHTML('beforeend', '<li><a id="lasignarPlatoMenu" class="dropdown-item" href="#asignar-plato">Asignar plato a menu</a></li>');
  suboptions.insertAdjacentHTML('beforeend', '<li><a id="ldeasignarPlatoMenu" class="dropdown-item" href="#deasignar-plato">Deasignar plato a menu</a></li>');
  suboptions.insertAdjacentHTML('beforeend', '<li><a id="lcrearCategoria" class="dropdown-item" href="#new-categoria">Crear categoria</a></li>');
  suboptions.insertAdjacentHTML('beforeend', '<li><a id="leliminarCategoria" class="dropdown-item" href="#del-categoria">Eliminar categoria</a></li>');
  suboptions.insertAdjacentHTML('beforeend', '<li><a id="lmodificarCategoria" class="dropdown-item" href="#change-categoria">Modificar categoria</a></li>');
  suboptions.insertAdjacentHTML('beforeend', '<li><a id="lcrearRestaurante" class="dropdown-item" href="#new-restaurant">Crear restaurante</a></li>');
*/



  //PRUEBO SOLO CON PLATO
  const newPlatoLink = document.getElementById('lcrearPlato');
  newPlatoLink.addEventListener('click', (event) => {
    this[EXCECUTE_HANDLER](handleCrearPlato, [], '#new-plato', { action: 'newPlato' }, '#', event);
  });



/*
  const delCategoryLink = document.getElementById('ldelCategory');
  delCategoryLink.addEventListener('click', (event) => {
    this[EXCECUTE_HANDLER](hRemoveCategory, [], '#remove-category', { action: 'removeCategory' }, '#', event);
  });
  const newProductLink = document.getElementById('lnewProduct');
  newProductLink.addEventListener('click', (event) => {
    this[EXCECUTE_HANDLER](hNewProductForm, [], '#new-product', { action: 'newProduct' }, '#', event);
  });
  const delProductLink = document.getElementById('ldelProduct');
  delProductLink.addEventListener('click', (event) => {
    this[EXCECUTE_HANDLER](hRemoveProduct, [], '#remove-product', { action: 'removeProduct' }, '#', event);
  });
  const delProductLink2 = document.getElementById('ldelProduct2');
  delProductLink2.addEventListener('click', (event) => {
    this[EXCECUTE_HANDLER](hRemoveProduct2, [], '#remove-product', { action: 'removeProduct2' }, '#', event);
  });


*/


}




//bind para nuevO PLATOn formulario
bindNewPlatoForm(handler) {
  newPlatoValidation(handler);
}

// bind para borrar categoria del formulario
bindRemoveCategoryForm(delHandler, getCategoryHandler) {
  const removeContainer = document.getElementById('remove-category');
  const buttons = removeContainer.getElementsByTagName('button');
  for (const button of buttons) {
    button.addEventListener('click', function (event) {
      delHandler(this.dataset.category);
    });
  }
  const categoryLinks = removeContainer.querySelectorAll('a[data-category]');
  for (const link of categoryLinks) {
    link.addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](
        getCategoryHandler,
        [link.dataset.category],
        '#product-list',
        { action: 'productsCategoryList', category: link.dataset.category },
        '#category-list',
        event,
      );
    });
  }
}

// bind validacion nuevo producto
bindNewProductForm(handler) {
  newProductValidation(handler);
}

// bind seleccion borrar producto
bindRemoveProductSelects(hTypes, hCategories) {
  const rpType = document.getElementById('rpType');
  rpType.addEventListener('change', (event) => {
    this[EXCECUTE_HANDLER](
      hTypes,
      [event.currentTarget.value],
      '#remove-product',
      { action: 'removeProductByType', type: event.currentTarget.value },
      '#remove-product',
      event,
    );
  });
  const rpCategories = document.getElementById('rpCategories');
  rpCategories.addEventListener('change', (event) => {
    this[EXCECUTE_HANDLER](
      hCategories,
      [event.currentTarget.value],
      '#remove-product',
      { action: 'removeProductByCategory', category: event.currentTarget.value },
      '#remove-product',
      event,
    );
  });
}

// bind borrar producto
bindRemoveProduct(handler) {
  const productList = document.getElementById('product-list');
  const buttons = productList.querySelectorAll('a.btn');
  for (const button of buttons) {
    button.addEventListener('click', function (event) {
      handler(this.dataset.serial);
      event.preventDefault();
    });
  }
}

bindBuyProduct(handler) {
  const bBuy = document.getElementById('b-buy');
  bBuy.addEventListener('click', (event) => {
    handler(event.currentTarget.dataset.serial);
    event.preventDefault();
  });
}

bindBuyProductInList(handler) {
  const productList = document.getElementById('product-list');
  const buttons = productList.querySelectorAll('a.btn');
  for (const button of buttons) {
    button.addEventListener('click', (event) => {
      handler(event.currentTarget.dataset.serial);
      event.preventDefault();
    });
  }
}

bindBuyProductInNewWindow(handler) {
  const button = this.productWindow.document.querySelector('#single-product button');
  button.addEventListener('click', (event) => {
    this.productWindow.close();
    handler(event.currentTarget.dataset.serial);
    event.preventDefault();
  });
}

// bind asociado a borrar producto SUBMIT
bindRemoveProductSubmit(handler) {
  document.forms.fRemoveProduct.addEventListener('submit', (event) => {
    this[EXCECUTE_HANDLER](
      handler,
      [document.forms.fRemoveProduct.rpType.value, document.forms.fRemoveProduct.rpCategories.value],
      '#remove-product',
      {
        action: 'removeProductByTypeCategory',
        category: document.forms.fRemoveProduct.rpCategories.value,
        type: document.forms.fRemoveProduct.rpType.value,
      },
      '#remove-product',
      event,
    );
    event.preventDefault();
    event.stopPropagation();
  });
}


// TODO LO QUE AÑADO YO¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡




//bind para nuevo plato en forumlario
bindNewPlatoForm(handler) {
  newPlatoValidation(handler);
}







}
export default ManagerView;