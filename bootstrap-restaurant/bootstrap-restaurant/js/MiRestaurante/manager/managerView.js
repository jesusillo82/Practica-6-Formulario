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

}
export default ManagerView;