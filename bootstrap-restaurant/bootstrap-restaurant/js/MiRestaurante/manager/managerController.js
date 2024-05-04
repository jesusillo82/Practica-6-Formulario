/* Controlador del patrón VISTA-MODELO-CONTROLADOR*/

/* los numeros que aparecen junto a los comentarios hacen referencia a los pasos para ir elaborando la tarea según tutoria*/

  //1 variables privadas, lo que viene entre '' es solo a titulo descriptivo
  const MODEL = Symbol('RestaurantModel');
  const VIEW = Symbol('RestaurantView');
  //2 carga de objetos
  const LOAD_MANAGER_OBJECTS = Symbol('Load Manager Objects'); 

  //1 clase
  class ManagerController {
    constructor(model, view) {
      this[MODEL] = model;
      this[VIEW] = view;

      // lo que haya dentro de onLoad() solo se ejecutara una vez al cargar la pagina
      this.onLoad(); // 3 ejecuto metodo de carga dentro del constructor, luego pintaremos en VISTA
      this.onInit(); // 4 ejecuto metodo inicio
      this[VIEW].bindInit(this.handleInit); // 5 metodo bindInit lo creo en VISTA y ejecuto desde aqui, pasandole el manejador para conseguir modelo vista controlador
      
    }

    //2 metodo privado[] de carga, esto normalmente se hace desde el servidor
    [LOAD_MANAGER_OBJECTS]() {

      /*
      a 3 categorías, con 4 platos en cada categoría.
      b. 4 alergenos.
      c. 3 menús. Al menos 3 platos en cada menú.
      d. 3 restaurantes.

      */

      // a) creo 3 categorias
      /*p1 = Manager.getInstance().createCategory('entrante', 'Categoria que hace referencia a pequeños platos previos al primerPlato');
       asi lo hacia en la practica 4, ahora this[MODEL] contiene Manager.getInstance()*/
      const categoriaPrimer = this[MODEL].createCategory('primerPlato', 'siempre tendra ensalada, pasta o arroz','bootstrap-restaurant/bootstrap-restaurant/themes/assets/images/primerPlato.png');
      const categoriaSegundo = this[MODEL].createCategory('segundoPlato', 'siempre tendra un pescado y una carne','bootstrap-restaurant/bootstrap-restaurant/themes/assets/images/segundoPlato.png');
      const categoriaPostre = this[MODEL].createCategory('postre', 'siempre habra un postre casero','bootstrap-restaurant/bootstrap-restaurant/themes/assets/images/postre.png');
      // a) creo platos 
      const plato1 = this[MODEL].createDish('macarrones', 'macarrones con tomates gratinados al horno', ['tomate', 'carne picada', 'queso gratinado'], 'bootstrap-restaurant/bootstrap-restaurant/themes/assets/images/macarrones.png');
      const plato2 = this[MODEL].createDish('sopa pescado', 'con trocitos de pescado de temporada', ['pescaado temporada', 'fideos', 'repollo', 'cebolla', 'apio'], 'bootstrap-restaurant/bootstrap-restaurant/themes/assets/images/sopaPescado.png');
      const plato3 = this[MODEL].createDish('solomillo', 'con nuestro toque a la pimienta', ['solomillo', 'nata', 'cebolla'], 'bootstrap-restaurant/bootstrap-restaurant/themes/assets/images/solomillo.png');
      const plato4 = this[MODEL].createDish('helado a la albahaca', 'con 2 bolas de limon y otra de nata y su insuperable aroma a albahaca natural', ['helado limon', 'albahaca','nata', 'azucar'], 'bootstrap-restaurant/bootstrap-restaurant/themes/assets/images/heladoAlbahaca.png');
      const plato5 = this[MODEL].createDish('frutaVariada', 'distintas frutas variadas de temporada', ['naranja', 'platano'], 'bootstrap-restaurant/bootstrap-restaurant/themes/assets/images/frutaVariada.png');
      const plato6 = this[MODEL].createDish('ensalada de pollo', 'ensalada al estilo castellano, de la huerta y de la granja a nuestra mesa', ['lechuga', 'tomate', 'pollo'], 'bootstrap-restaurant/bootstrap-restaurant/themes/assets/images/ensaladaPollo.png');
      const plato7 = this[MODEL].createDish('bizcocho de la casa', 'casero con los mejores ingredientes naturales', ['bizcocho', 'sirope naranja'], 'bootstrap-restaurant/bootstrap-restaurant/themes/assets/images/bizcocho.png');
      const plato8 = this[MODEL].createDish('lubina', 'a la espalda con salsa de naranja valenciana', ['lubina', 'sal', 'naranja'], 'bootstrap-restaurant/bootstrap-restaurant/themes/assets/images/lubina.png');
      const plato9 = this[MODEL].createDish('entrecot', 'al gusto, carne 100% gallega', ['entrecot', 'sal'], 'bootstrap-restaurant/bootstrap-restaurant/themes/assets/images/entrecot.png');
      
      // a) añado 4 platos a cada categoria

      //CATEGORIA primer plato
      this[MODEL].assignCategoryToDish(categoriaPrimer,plato1,plato2,plato6);
      //CATEGORIA segundo plato
      this[MODEL].assignCategoryToDish(categoriaSegundo,plato3,plato8,plato9);
      //CATEGORIA postre
      this[MODEL].assignCategoryToDish(categoriaPostre,plato4,plato5,plato7);


      // b) creo 4 alérgenos
      const alergeno1 = this[MODEL].createAllergen('gluten', ' es una proteína que se encuentra en el trigo, la cebada, el centeno y a veces la avena, ');
      const alergeno2 = this[MODEL].createAllergen('crustaceo', ' Cangrejos, langostas, gambas, langostinos, carabineros, cigalas, etc');
      const alergeno3 = this[MODEL].createAllergen('pescado', ' ademas del pescado la Gelatina de pescado utilizada como soporte de vitaminas o preparados de carotenoides.');
      const alergeno4 = this[MODEL].createAllergen('cacahuete', ' se encuentra además en semillas, pasta y aceites, se puede encontrar en galletas, chocolates, postres, salsas, etc. ');
      //añado alergenos al array
      this[MODEL].addAllerge(alergeno1,alergeno2,alergeno3,alergeno4);
      
      //asigno platos a los alergenos para mostrarlos desde el menu
      this[MODEL].assignAllergenToDish(alergeno1, plato1,plato2,plato6,plato7); //gluten
      this[MODEL].assignAllergenToDish(alergeno2, plato2); //crustaceo
      this[MODEL].assignAllergenToDish(alergeno3, plato2,plato8); //pescado
      //cacahuete --> no le asigno ningun plato

      // c) creo 3 menús. 
      const menu1 = this[MODEL].createMenu('Semana Santa', ' constara de primer plato, segundo plato, postre, pan y una bebida,con opción de vigilia, precio 35 euros,');
      const menu2 = this[MODEL].createMenu('diario', ' constara de primer plato, segundo plato, postre, pan y una bebida, precio 15 euros');
      const menu3 = this[MODEL].createMenu('navidad', ' constara de dos entrantes, primer plato, segundo plato, postre, pan y dos consumiciones y una copa, precio 50 euros');
      
      //añado menus al array
      this[MODEL].addMenu(menu1,menu2,menu3);

      // c) añado 3 platos a cada menu
      this[MODEL].assignDishToMenu(menu1,plato1,plato3,plato5);
      this[MODEL].assignDishToMenu(menu2,plato6,plato2,plato4);
      this[MODEL].assignDishToMenu(menu3,plato1,plato2,plato7);

      // d) creo 3 restaurantes
      const restaurante1 = this[MODEL].createRestaurant('El Vergel', ' con capacidad para 100 comensales', this[MODEL].createCoordinate(20, 30));
      const restaurante2 = this[MODEL].createRestaurant('Casa Lucia', ' con capacidad para 70 comensales', this[MODEL].createCoordinate(20, 60));
      const restaurante3 = this[MODEL].createRestaurant('El Patio', ' con capacidad para 80 comensales', this[MODEL].createCoordinate(30, 30));
      
      //añado los restaurantes al array para generar el menu
      this[MODEL].addRestaurant(restaurante1,restaurante2,restaurante3) ;
    }

    // 3 añado evento de carga

    /*Al cargarse la página, debemos mostrar en la zona central todas las categorías que
    tengamos disponibles. Además, debe haber un menú con los enlaces a dichas categorías.
    El enlace de inicio de la página deberá mostrar esta distribución nuevamente. */
    onLoad = () => {
      //carga objetos
      this[LOAD_MANAGER_OBJECTS](); // cargo todos los objetos creados
      
      //carga menu categorias y bind asociado
      this.onAddCategory();
      //carga menu alergenos y bind asociado
      this.onAddAlergenos();
      // carga menu restaurantes y bind asociado
      this.onAddRestaurantes();
      //carga menu de menus y bind asociado
      this.onAddMenus();

      //muestra 3 platos aleatorios tras menu de cabecera
      this[VIEW].mostrarPlatosAleatorio(this[MODEL].platosAleatorios(3));
      //muestra las categorias disponibles en la parte central
      this[VIEW].showCategoriesEnParteCentral(this[MODEL].categories);
    };

    //4 +++++++++++++++++++++++++++++ INIT Y MANEJADOR PARA EL INIT
    
    //carga de inicio debera ser invocado desde constructor
    onInit = () => {

     
      //muestro las categorias en la parte central
      this[VIEW].showCategoriesEnParteCentral(this[MODEL].categories);

      //asignamos funcionalidad para que al clickear nos muestren los platos asociados a las mismas por lo
      //que necesito invocar a los bind pasandole el manejador de evento
      this[VIEW].bindProductsCategoryList(this.handleProductsCategoryList,);
      
    };

    handleInit = () => { //manejador de inicio, en la VISTA definimos su metodo bind para darle funcionalidad
      this.onInit();
    };

    // una vez creado estos los metodos init y handlervamos a la VISTA para crear su correspondiente BIND
    //+++++++++++++++++++++++++++ */

    //este metodo es un evento,se hace para mostrar el menu con las distntas categorias que tenemos
    //cuando añadamos una neva categoria en practicas posteiores actualizaremos el menu. Lo invocamos desde onLoad
    onAddCategory = () => {
      this[VIEW].showCategoriesInMenu(this[MODEL].categories); //pasamos iterador desde el modelo
      //this[VIEW].bindProductsCategoryList(this.handleProductsCategoryList,);
      this[VIEW].bindProductsCategoryListInMenu(
        this.handleProductsCategoryList,
      );
    
    };

   
    // alergenos 
    onAddAlergenos = () => {
      this[VIEW].showAlergenostInMenu(this[MODEL].alergenos); // mostramos en menu de cabecera
      this[VIEW].bindProductsAlergenosListInMenu(
        this.handleProductsAlergenosList
      );
    
    };

    //restaurantes
    onAddRestaurantes = () => {
      //añade restaurantes al menu
      this[VIEW].showRestaurantInMenu(this[MODEL].restaurantes);

      this[VIEW].bindProductsRestauranteListInMenu(
        this.handleProductsRestaurantList
      );
    
    };

    //menus
    onAddMenus = () => {
      this[VIEW].showMenusInMenu(this[MODEL].menus);
      this[VIEW].bindProductsMenuListInMenu(
        this.handleProductsMenuList
      );
    
    };


    // este manejador lo ejecutare cada vez que haga click en cada una de las categorias para mostrar los platos asociados y sea desde 
    //la parte central o desde el menu De momento no ttiene funcionalidad
    //por lo que necesito crear un BIND
    handleProductsCategoryList = (name) => {
     // alert(" ejecuto MANEJADOR EVENTO");
      const categoria = this[MODEL].createCategory(name,"",""); //recupero objeto caategoria
     
      //pintar lista de platos por categoria
      this[VIEW].mostrarInteriorArrays(this[MODEL].getDishesInCategory(categoria), categoria);
      // pinta la ficha de cada plato tras clickear en los platos mostrados con el metodo anterior
      this[VIEW].bindMostrarFichaPlato(this.handleMostrarFichaPlato);

    };


    //manejador alergenos
    handleProductsAlergenosList = (name) => {
      //alert(" ejecuto MANEJADOR EVENTO ALERGENOS");
      const alergeno = this[MODEL].createAllergen(name,"",""); //recupero objeto alergeno o lo creo y recupero
    
      //pintar lista productos por alergeno 
      this[VIEW].mostrarInteriorArrays(this[MODEL].getDishesWithAllergen(alergeno), alergeno);
      // pinta la ficha de cada plato tras clickear en los platos mostrados con el metodo anterior
      this[VIEW].bindMostrarFichaPlato(this.handleMostrarFichaPlato);

    };


    //manejador restaurante
    handleProductsRestaurantList = (title) => {
      const restaurante = this[MODEL].createRestaurant(title,"",""); //recupero objeto restaurante o lo creo y recupero
      
      //pintar restaurante en parte Central
      this[VIEW].showRestaurante(restaurante);

    };


    //manejador menu
    handleProductsMenuList = (title) => {
      //alert(" ejecuto MANEJADOR EVENTO MENUS");
      const menu = this[MODEL].createMenu(title,""); //recupero objeto menu o lo creo y recupero
      
      //pintar los platos de cada menu en parte Central
      this[VIEW].mostrarInteriorArrays(this[MODEL].getDishesInMenu(menu), menu);
      // pinta la ficha de cada plato tras clickear en los platos mostrados con el metodo anterior de cada menu
      this[VIEW].bindMostrarFichaPlato(this.handleMostrarFichaPlato);

    };

    // manejador para mostrar la ficha de cada plato a partir del atributo name
    handleMostrarFichaPlato = (name) => {
      
        const plato = this[MODEL].createDish(name); //recupero el objeto plato, si no existe lo crea y lo devuelve (practica 4 flyweigh)
        this[VIEW].mostrarFichaPlato(plato); //pinta en la vista
        
    };

  } //fin class

  export default ManagerController;



  