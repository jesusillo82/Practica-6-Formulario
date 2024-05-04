
/*importo excepciones genereicas
*/
import {
    BaseException,
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException,
    AbstractClassException,
} from '../exceptions.js';

/*importo clases de entidad */
import {
    Dish, Category, Allergen, Menu, Restaurant, Coordinate,
} from '../entities/entities.js';


/* en manager de pablo
import { SortedMap } from './sortedmap.js';
*/








/* El manager será la parte correspondiente al MODELO de nuestro patrón MVC 
puesto que aqui que se encuentran las estructuras de datos ( distintis arrrays) que necesitamos
a las cuales accederemos desde el CONTROLADOR
*/

/* El manager implementará un objeto que mantendrá las relaciones entre las distintas entidades del restaurante 
- de esta forma nos permite simplificar al máximo las entidades creando por tanto objetos mas sencillos
    y eficientes para una aplicacion mas rapida
- para implementar las relaciones usaré arrays
- usará patron SINGLENTON para crear una sola instancia del Manager
- usará factoria FLYWEIGHT  para no crear instancias desde fuera del Manager de las distintas entidades, 
    de esta forma sólo se creará la instancia cuando nos aseguremos que los distintos componentes del 
    restaruante no existen. Si existen los devolverá sin necesidad del un new
-Las relaciones las creamos en las colecciones de categorías, menús y alérgenos. 
*/

// este manager usa iteradores que sirven para no tener que hacer publicos
// los arrays #categories y #platos poruqe sino se podrian modificar
//desde fuera



//definimos excepciones del Manager

// creo excepcion base
class ManagerException extends BaseException {
    constructor(message = 'Error: Manager Exception.', fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = 'ManagerException';
    }
}

// a partir de la excepcion base creo el resto de excepciones para diferenciar las que pertenecen al
//manager de las que no

// valores nulos o no del objeto correcto
class ObjecManagerException extends ManagerException {
    constructor(param, className, fileName, lineNumber) {
        super(`Error: Valor nulo o no es objeto del tipo requerido. The ${param} is NULL or not a ${className}`, fileName, lineNumber);
        this.param = param;
        this.param = className;
        this.name = 'ObjecManagerException';
    }
}

// la Categoria ya esta en el Manager
class CategoryExistsException extends ManagerException {
    constructor(category, fileName, lineNumber) {
        super(`Error: The ${category.name} already exists in the manager.`, fileName, lineNumber);
        this.category = category;
        this.name = 'CategoryExistsException';
    }
}

// el plato ya existe
class DishExistsException extends ManagerException {
    constructor(plato, fileName, lineNumber) {
        super(`Error: The ${plato.name} already exists in the manager.`, fileName, lineNumber);
        this.plato = plato;
        this.name = 'DishExistsException';
    }
}

// el menu ya existe
class MenuExistsException extends ManagerException {
    constructor(menu, fileName, lineNumber) {
        super(`Error: The ${menu.name} already exists in the manager.`, fileName, lineNumber);
        this.menu = menu;
        this.name = 'MenuExistsException';
    }
}

// el alérgeno ya existe
class AllergeExistsException extends ManagerException {
    constructor(allerge, fileName, lineNumber) {
        super(`Error: The ${allerge.name} already exists in the manager.`, fileName, lineNumber);
        this.allerge = allerge;
        this.name = 'AllergeExistsException';
    }
}

// el restaurante ya existe
class RestaurantExistsException extends ManagerException {
    constructor(restaurante, fileName, lineNumber) {
        super(`Error: The ${restaurante.name} already exists in the manager.`, fileName, lineNumber);
        this.restaurante = restaurante;
        this.name = 'RestaurantExistsException';
    }
}

// El menu no existe en el Manager
class MenuNotExistException extends ManagerException {
    constructor(menu, fileName, lineNumber) {
        super(`Error: The menu ${menu.name} doesn't exist in the manager.`, fileName, lineNumber);
        this.menu = menu;
        this.name = 'MenuNotExistException';
    }
}


// El restaurante no existe en el Manager
class RestaurantNotExistException extends ManagerException {
    constructor(restaurante, fileName, lineNumber) {
        super(`Error: The restaurant ${restaurante.name} doesn't exist in the manager.`, fileName, lineNumber);
        this.restaurante = restaurante;
        this.name = 'RestaurantNotExistException';
    }
}

// El alergeno no existe en el Manager
class AllergenNotExistException extends ManagerException {
    constructor(allerge, fileName, lineNumber) {
        super(`Error: The allergen ${allerge.name} doesn't exist in the manager.`, fileName, lineNumber);
        this.allerge = allerge;
        this.name = 'AllergeNotExistException';
    }
}


// la Categoria no existe en el Manager
class CategoryNotExistException extends ManagerException {
    constructor(category, fileName, lineNumber) {
        super(`Error: The category ${category.name} doesn't exist in the manager.`, fileName, lineNumber);
        this.category = category;
        this.name = 'CategoryNotExistException';
    }
}

// El PLATO no existe en el Manager
class DishNotExistInManagerException extends ManagerException {
    constructor(plato, fileName, lineNumber) {
        super(`Error: The dish ${plato.name} doesn't exist in the manager.`, fileName, lineNumber);
        this.plato = plato;
        this.name = 'DishNotExistInManagerException';
    }
}

// El plato no existe en la categoria
class DishNotExistInCategoryException extends ManagerException {
    constructor(plato, category, fileName, lineNumber) {
        super(`Error: The dish ${plato.name} doesn't exist in the category ${category.name}.`, fileName, lineNumber);
        this.category = category;
        this.plato = plato;
        this.name = 'DishNotExistInCategoryException';
    }
}

// El plato no existe en el menu
class DishNotExistInMenuException extends ManagerException {
    constructor(plato, menu, fileName, lineNumber) {
        super(`Error: The dish ${plato.name} doesn't exist in the menu${menu.name}.`, fileName, lineNumber);
        this.menu = menu;
        this.plato = plato;
        this.name = 'DishNotExistInMenuException';
    }
}

// El plato no existe como alérgico
class DishNotExistInAllergenException extends ManagerException {
    constructor(plato, allerge, fileName, lineNumber) {
        super(`Error: The dish ${plato.name} doesn't exist in allergen ${allerge.name}.`, fileName, lineNumber);
        this.allerge = allerge;
        this.plato = plato;
        this.name = 'DishNotExistInAllergenException';
    }
}

// Manager

const Manager = (function () {

    let instantiated; //aqui guardaremos la instancia que queremos devolver. La llamamos con el nombre que queramos

    class Manager {

        #nombre; // nombre del Sistema

        /*Colecciones como arrays mantendran las relaciones para que no sean publicas
        usaremos iteradores devueltos por generadores*/

        //coleccion de categorias de platos. Los platos pueden pertecener a mas de una categoria
        #categories = []; //almacenara las categorias mediante objeto literal{
        //category ---> propiedad : la propia categoria a introducir
        //  y dishes: [] ----> un array con todos los platos de esa categoria}
        /*  {
            category,
            dishes: []
        }
        */
        #alergenos = []; //almacenara tipos de alergenos. Los platos pueden tener mas de un alergeno
        /*  {
            allerge,
            dishes: []
        }
        */

        #platos = []; //almacenara los platos
        #menus = []; // es una agregacion de platos
        /*  {
                menu,
                dishes: []
             }
        */
        #restaurantes = []; //coleccion de restaurantes

        constructor() {
            if (!new.target) throw new InvalidAccessConstructorException();

            // definirimos las propiedades haciendolos iterables
            // defino los metodos get de las colecciones como iterables para crear los metodos getter sin argumentos

            //categorias
            Object.defineProperty(this, 'categories', {
                enumerable: true,
                get() {

                    //añado .values
                    const array = this.#categories.values();

                    //const array = this.#categories;


                    return {
                        *[Symbol.iterator]() {
                            for (const arrayCat of array) {
                                yield arrayCat.category; //propiedad categoria del objeto
                            }
                        },
                    };
                },
            });

            //alergenos
            Object.defineProperty(this, 'alergenos', {
                enumerable: true,
                get() {
                    const array = this.#alergenos;
                    return {
                        *[Symbol.iterator]() {
                            for (const arrayAler of array) {
                                yield arrayAler.allerge; //propiedad alergeno
                            }
                        },
                    };
                },
            });

            //platos
            Object.defineProperty(this, 'platos', {
                enumerable: true,
                get() {
                    const array = this.#platos;
                    return {
                        *[Symbol.iterator]() {
                            for (const plato of array) {
                                yield plato;
                            }
                        },
                    };
                },
            });

            //menus
            Object.defineProperty(this, 'menus', {
                enumerable: true,
                get() {
                    const array = this.#menus;
                    return {
                        *[Symbol.iterator]() {
                            for (const arrayMenu of array) {
                                yield arrayMenu.menu; //propiedad menu
                            }
                        },
                    };
                },
            });

            //restaurantes
            Object.defineProperty(this, 'restaurantes', {
                enumerable: true,
                get() {
                    const array = this.#restaurantes;
                    return {
                        *[Symbol.iterator]() {
                            for (const restaurante of array) {
                                yield restaurante;
                            }
                        },
                    };
                },
            });

        }


        //------------------------------ METODOS GETTER--------------------------------------------


        *getterCategories() {

            for (let arrayCat of this.#categories) {
                yield arrayCat.category;
            }
        }

        *getterMenus() {
            for (let arrayMenu of this.#menus) {
                yield arrayMenu.menu;
            }
        }

        *getterAllergen() {
            for (let arrayallerge of this.#alergenos) {
                yield arrayallerge.allerge;
            }
        }

        *getterRestaurant() {
            for (let restaurante of this.#restaurantes) {
                yield restaurante;
            }
        }






        //----------------------------------- CATEGORIA -------------------------------------------

        // este metodo creara una categoria y la guardara en el array #categories
        addCategory(...categories) { //...categories ----> permite recoger varios argumentos, una o 1000 categorias almacenandolos en el array


            // validacion si existen argumentos de entrada l
            if (arguments.length === 0) {
                throw new ObjecManagerException('argument', 'Category');
            }

            // validacion argumentos son Category y no son nul
            for (const category of categories) { //recorro array categories, contendra todos los argumentos que se le han pasado a la funcion
                if (!(category instanceof Category) || (category === null)) {
                    throw new ObjecManagerException('argument', 'Category');
                }

                // validacion categoria existe
                const position = this.#getCategoryPosition(category);
                //posicion de la categoria dentro del array
                if (position === -1) { //-1 no existe

                    // al array de categorias le meto un objeto literal con propiedades
                    this.#categories.push({

                        // mantiene la relacion de los productos que pertenecen a una determinada categoria
                        category, // propiedad : la propia categoria a introducir
                        dishes: [], //relacion de platos que pertenece a esa categoria, en principio vacio
                    });


                } else {
                    throw new CategoryExistsException(category); //excepcion de categoria ya existe
                }
            }
            return this; //hace referencia al objeto manager es decir el que esta instanciado ( variable instanciated). Se usa para poder encadenar el mismo metodo

        }

        // borrar categoria
        removeCategory(...categories) { //... se llama spread sintaxis extendida
            for (const category of categories) {
                if (!(category instanceof Category)) {
                    throw new ObjecManagerException('category', 'Category');
                }
                const position = this.#getCategoryPosition(category);
                //validacion si categoria esta registrada
                if (position !== -1) { // si no es -1 
                    this.#categories.splice(position, 1); // borramos
                } else {
                    throw new CategoryNotExistException(category);
                }

            }
            return this;
        }



        // dado el array de categoria busca indice. 
        #getCategoryPosition(category) {
            //recorre elemento x de la parte correspondiente a category
            //hay que usar este tipo de funciones en vez de bucles for


            return this.#categories.findIndex((x) => x.category.name === category.name); //funcion callback tipo arrow



        }



        //------------------------------------------ MENU ---------------------------------------------

        // este metodo creara un menuy la guardara en el array #menus
        addMenu(...menus) {

            // validacion si existen argumentos de entrada 
            if (arguments.length === 0) {
                throw new ObjecManagerException('argument', 'Menu');
            }

            // argumentos son de tipo Menu y no son null
            for (const menu of menus) { //recorro array 
                if (!(menu instanceof Menu) || (menu === null)) {
                    throw new ObjecManagerException('argument', 'Menu');
                }

                // validacion menu existe
                const position = this.#getMenuPosition(menu);
                //posicion de la menu dentro del array
                if (position === -1) { //-1 no existe

                    // al array de menu le meto un objeto literal con propiedades
                    this.#menus.push({

                        menu, // propiedad : objeto menu
                        dishes: [], //relacion de platos que pertenece a esa menu, en principio vacio
                    });


                } else {
                    throw new MenuExistsException(menu); //existe
                }
            }
            return this;
        }

        // dado el array de menu busca indice. 
        #getMenuPosition(menu) {
            return this.#menus.findIndex((x) => x.menu.name === menu.name);

        }

        //borrar menu
        removeMenu(...menus) { //... se llama spread sintaxis extendida
            for (const menu of menus) {
                if (!(menu instanceof Menu)) {
                    throw new ObjecManagerException('menu', 'Menu');
                }
                const position = this.#getMenuPosition(menu);
                //validacion si categoria esta registrada
                if (position !== -1) { // si no es -1 
                    this.#menus.splice(position, 1); // borramos
                } else {
                    throw new MenuNotExistException(menu);
                }
            }
            return this;
        }


        //----------------------------------- ALERGENOS --------------------------------------------

        addAllerge(...alergenos) { //...alergenos ----> permite recoger varios argumentos, una o 1000 alergenos almacenandolos en el array

            // validacion si existen argumentos de entrada 
            if (arguments.length === 0) {
                throw new ObjecManagerException('argument', 'Allergen');
            }

            // argumentos son del tipo Allergen y no son nulos
            for (const allerge of alergenos) {
                if (!(allerge instanceof Allergen) || (allerge === null)) {
                    throw new ObjecManagerException('argument', 'Allergen');
                }

                // validacion alergeno existe
                const position = this.#getAllergePosition(allerge);
                //posicion dentro del array
                if (position === -1) { //-1 no existe

                    // añadimos
                    this.#alergenos.push({

                        // mantiene la relacion 
                        allerge, // propiedad : la propia alergeno a introducir
                        dishes: [], //relacion de platos 
                    });


                } else {
                    throw new AllergeExistsException(allerge);
                }
            }
            return this;
        }

        // borrar alergeno
        removeAllergen(...alergenos) {
            for (const allerge of alergenos) {
                if (!(allerge instanceof Allergen)) {
                    throw new ObjecManagerException('allerge', 'Allergen');
                }
                const position = this.#getAllergePosition(allerge);
                //validacion si existe
                if (position !== -1) { // si no es -1 
                    this.#alergenos.splice(position, 1); // borramos
                } else {
                    throw new AllergenNotExistException(allerge);
                }

            }
            return this;
        }



        // devuelve posicion de un objeto allerge dentro de la coleccion de alergenos
        #getAllergePosition(allerge) {

            return this.#alergenos.findIndex((x) => x.allerge.name === allerge.name);

        }



        //-------------------------- PLATO ------------------------

        // añadir un plato. Como las relaciones estan implementadas mediante los metodos addCategory,
        // addAllerge y addMenu directamente metemos el plato al array de platos 
        addDish(...platos) {

            // validacion si existen argumentos de entrada 
            if (arguments.length === 0) {
                throw new ObjecManagerException('argument', 'Dish');
            }

            for (const plato of platos) {

                //argumento no es Dish o argumento no es null
                if (!(plato instanceof Dish) || (plato === null)) {
                    throw new ObjecManagerException('argument', 'Dish');
                }


                // valido si plato existe, sino existe lo añado
                const position = this.#getDishPosition(plato);
                if (position === -1) {
                    this.#platos.push(plato);


                } else {
                    throw new DishExistsException(plato);
                }
            }
            return this; // permite encadenar
        }

        /* borrar plato
            puesto que las relaciones estan establecidas mediante los platos, debere:
        
            - eliminar el plato del array de categorias
            - eliminar el plato del array de alergenos
            - eliminar le plato del array de menus

            - una vez eliminado de todas las entidades lo eliminare del array de platos
        */
        removeDish(...platos) {
            for (const plato of platos) {

                // validamos instancia
                if (!(plato instanceof Dish)) {
                    throw new ObjecManagerException('plato', 'Dish');
                }
                //recupero posicion del plato en array platos, asi cuando me vuelva a hacer falta lo tengo ya guardado
                // y no tengo que volver a buscarlo
                const position = this.#getDishPosition(plato);

                // validamos si el plato existe sino excepción
                if (position !== -1) {

                    // almaceno el plato correspondiente a la posicion que ocupa en el array de platos
                    const storedDish = this.#platos[position];

                    // compruebo si el plato esta en el array de categorias
                    for (const category of this.#categories) {
                        // en cada category que tendra varios platos asociados buscare el plato que guarde
                        const pPlato = this.#getDishPositionInCategory(storedDish, category);
                        if (pPlato !== -1) {
                            // se ira borrando el plato de cada una de las categorias del array categories
                            category.dishes.splice(pPlato, 1);
                        }
                    }

                    // compruebo si el plato esta en el array de alergenos
                    for (const alergeno of this.#alergenos) {
                        // en cada category que tendra varios productos asociados buscare el producto concreto
                        const pPlato = this.#getDishPositionInAlergenos(storedProduct, alergeno);
                        if (pPlato !== -1) {
                            // se ira borrando el producto de cada una de las categorias del array categories
                            alergeno.dishes.splice(pPlato, 1);
                        }
                    }

                    // compruebo si el plato esta en el array de menus
                    for (const menu of this.#menus) {
                        // en cada category que tendra varios productos asociados buscare el producto concreto
                        const pPlato = this.#getDishPositionInMenu(storedProduct, menu);
                        if (pPlato !== -1) {
                            // elimina del objeto menu, en su propiedad dishes[] la posicion del plato
                            menu.dishes.splice(pPlato, 1);
                        }
                    }

                    // una vez eliminado de las categorias, los alergenos y los menus lo eliminare del array de platos
                    this.#platos.splice(position, 1);

                } else {
                    throw new DishNotExistInManagerException(plato);
                }
            }
            return this;
        }

        // devuelve posicion del plato en array platos
        #getDishPosition(plato) {
            return this.#platos.findIndex((x) => x.name === plato.name);
        }

        /* busca si un plato por su nombre se encuentra en una categoria concreta
            - recordamos que cada categoria tiene asociado un array con los platos para esa categoria
        {
            category,
            dishes: []
            }
        */
        #getDishPositionInCategory(plato, category) {
            return category.dishes.findIndex((x) => x.name === plato.name); //lo busca por nombre y lo devuelve
        }

        /* busca si un plato por su nombre tiene asociado un alergeno
            - recordamos que cada alegeno tiene asociado un array con los platos
        /*  {
            allerge,
            dishes: []
        }
        */
        #getDishPositionInAlergenos(plato, allerge) {
            return allerge.dishes.findIndex((x) => x.name === plato.name); //lo busca por nombre y lo devuelve
        }

        /* 
        busca si un plato por su nombre pertene a un menu
            - recordamos que cada alegeno tiene asociado un array con los platos
             {
                menu,
                dishes: []
             }
        */
        #getDishPositionInMenu(plato, menu) {
            return menu.dishes.findIndex((x) => x.name === plato.name); //lo busca por nombre y lo devuelve
        }


        //---------------------------- RESTAURANTE ----------------------------------------------

        //añade restaurante a array restaurantes
        addRestaurant(...restaurantes) {

            // validacion si existen argumentos de entrada 
            if (arguments.length === 0) {
                throw new ObjecManagerException('argument', 'Restaurant');
            }

            for (const restaurante of restaurantes) {
                //valido objeto Restaurant y no sea null
                if (!(restaurante instanceof Restaurant) || (restaurante === null)) {
                    throw new ObjecManagerException('argument', 'Restaurant');
                }


                //valido si el restaurante existe
                const position = this.#getRestaurantPosition(restaurante);
                if (position === -1) {
                    this.#restaurantes.push(restaurante);

                } else {
                    throw new RestaurantExistsException(restaurante);
                }
            }
            return this;
        }

        //devuelve posicion del restaurante en el array
        #getRestaurantPosition(restaurante) {
            return this.#restaurantes.findIndex((x) => x.name === restaurante.name);
        }


        //borrar restaurante
        removeRestaurant(...restaurantes) { //... se llama spread sintaxis extendida

            // recorro array de argumentos
            for (const restaurante of restaurantes) {

                //valido objeto Restaurant se comprueba al añadir por tanto no haria falta
                if (!(restaurante instanceof Restaurant)) {
                    throw new ObjecManagerException('restaurante', 'Restaurant');
                }
                const position = this.#getRestaurantPosition(restaurante);
                //validacion si restaurante esta registrado
                if (position !== -1) { // si no es -1 
                    this.#restaurantes.splice(position, 1); // borramos
                } else {
                    throw new RestaurantNotExistException(restaurante);
                }

            }
            return this;
        }




        //--------------------------------- METODOS DE ASIGNACION A ENTIDADES ------------------


        // asigna platos a una categoria, permite multiargumento por tanto varios platos
        assignCategoryToDish(category, ...platos) {

            // validacion si existen argumentos de entrada 
            if (arguments.length === 0) {
                throw new ObjecManagerException('argument', 'category,dish');
            }

            //verificamos categoria instancia y null
            if (!(category instanceof Category) || (category === null)) {
                throw new ObjecManagerException('category', 'Category');
            }


            //obtenemos posicion de la categoria dentro del array categorieas
            let pCategory = this.#getCategoryPosition(category);
            if (pCategory === -1) { // si la categoria no se encuentra
                this.addCategory(category); // crearemos la categoria
                pCategory = this.#getCategoryPosition(category);
            }

            // recorro los platos que seran los incluidos en ...platos
            for (const plato of platos) {
                //verifico que sea plato
                if (!(plato instanceof Dish) || (plato === null)) {
                    throw new ObjecManagerException('plato', 'Dish');
                }
                //obtengo posicion del plato
                let pPlato = this.#getDishPosition(plato);
                if (pPlato === -1) { //sino existe
                    this.addDish(plato); // añado el plato a la coleccion
                    pPlato = this.#getDishPosition(plato);
                }

                //compruebo que el plato este dentro de la categoria que le hemos pasado y guardamos su posicion
                const position = this.#getDishPositionInCategory(plato, this.#categories[pCategory]);

                if (position === -1) { // si no existe dentro de la categoria lo añado 
                    this.#categories[pCategory].dishes.push(this.#platos[pPlato]);
                }

            }
            return this;
        }


        // deasigna un plato de una categoria
        deassignCategoryToDish(category, ...platos) {

            // validacion si existen argumentos de entrada 
            if (arguments.length === 0) {
                throw new ObjecManagerException('argument', 'category,dish');
            }

            //valido categoria es Category
            if (!(category instanceof Category) || (category === null)) {
                throw new ObjecManagerException('category', 'Category');
            }
            //recupero posicion de la categoria en array #categories
            const pCategory = this.#getCategoryPosition(category);

            //valido si existe la categoria
            if (pCategory !== -1) {
                // recorro array de argumentos
                for (const plato of platos) {

                    //valido que sea plato
                    if (!(plato instanceof Dish) || (plato === null)) {
                        throw new ObjecManagerException('plato', 'Dish');
                    }

                    // recupero posicion del plato dentro del array dishes asociado a la categoria
                    const pPlato = this.#getDishPositionInCategory(plato, this.#categories[pCategory]);
                    //valido si el plato existe en la categoria para poder borrarlo
                    if (pPlato !== -1) {
                        this.#categories[pCategory].dishes.splice(pPlato, 1);
                    } else {
                        throw new DishNotExistInCategoryException(plato, this.#categories[pCategory].category);
                    }
                }
            } else {
                throw new CategoryNotExistException(category);
            }
            return this;
        }


        // asigna platos a un alergeno, permite multiargumento por tanto varios platos
        assignAllergenToDish(allerge, ...platos) {

            // validacion si existen argumentos de entrada 
            if (arguments.length === 0) {
                throw new ObjecManagerException('argument', 'allerge,dish');
            }

            //verificamos alergeno
            if (!(allerge instanceof Allergen) || (allerge === null)) {
                throw new ObjecManagerException('allerge', 'Allergen');
            }


            //obtenemos posicion del alergeno dentro del array #alergenos
            let pAlergeno = this.#getAllergePosition(allerge);
            //validamos que el alérgeno exista
            if (pAlergeno === -1) {
                this.addAllerge(allerge); // crearemos el alergeno
                pAlergeno = this.#getAllergePosition(allerge);
            }

            // recorro los platos que seran los incluidos en ...platos
            for (const plato of platos) {
                //verifico que sea producto
                if (!(plato instanceof Dish) || (plato === null)) {
                    throw new ObjecManagerException('plato', 'Dish');
                }
                //obtengo posicion del plato
                let pPlato = this.#getDishPosition(plato);
                if (pPlato === -1) { //sino existe
                    this.addDish(plato); // añado el plato a la coleccion
                    pPlato = this.#getDishPosition(plato);
                }

                //compruebo que el plato este dentro del alergeno que le hemos pasado y guardamos su posicion
                const position = this.#getDishPositionInAlergenos(plato, this.#alergenos[pAlergeno]);

                if (position === -1) { // si no existe dentro del array asociado a su alergeno
                    this.#alergenos[pAlergeno].dishes.push(this.#platos[pPlato]);

                }

            }
            return this;
        }


        // deasigna un alérgeno
        deassignAllergenToDish(allerge, ...platos) {

            // validacion si existen argumentos de entrada 
            if (arguments.length === 0) {
                throw new ObjecManagerException('argument', 'allerge,dish');
            }

            //valido alergeno sea Allergen y no sea null
            if (!(allerge instanceof Allergen) || (allerge === null)) {
                throw new ObjecManagerException('allerge', 'Allergen');
            }
            //recupero posicion del alergeno en array #alergenos
            const pAlergeno = this.#getAllergePosition(allerge);

            //valido si existe el alérgeno
            if (pAlergeno !== -1) {
                // recorro array de argumentos
                for (const plato of platos) {

                    //valido que sea plato y no null
                    if (!(plato instanceof Dish) || (plato === null)) {
                        throw new ObjecManagerException('plato', 'Dish');
                    }

                    // recupero posicion del plato dentro del array dishes asociado al alérgeno
                    const pPlato = this.#getDishPositionInAlergenos(plato, this.#alergenos[pAlergeno]);
                    //valido si el plato existe en el array de alérgenos para poder borrarlo
                    if (pPlato !== -1) {
                        this.#alergenos[pAlergeno].dishes.splice(pPlato, 1);
                    } else {
                        throw new DishNotExistInAllergenException(plato, this.#alergenos[pAlergeno].allerge);
                    }
                }
            } else {
                throw new AllergenNotExistException(allerge);
            }
            return this;
        }

        // asigna platos a un menu, permite multiargumento por tanto varios platos
        assignDishToMenu(menu, ...platos) {

            // validacion si existen argumentos de entrada 
            if (arguments.length === 0) {
                throw new ObjecManagerException('argument', 'menu,dish');
            }

            //verificamos menu instancia y que no esa null
            if (!(menu instanceof Menu) || (menu === null)) {
                throw new ObjecManagerException('menu', 'Menu');
            }

            //obtenemos posicion del menu dentro del array #menus
            let pMenu = this.#getMenuPosition(menu);
            //validamos que menu existe
            if (pMenu === -1) {
                this.addMenu(menu); // crearemos el menu
                pMenu = this.#getMenuPosition(menu);
            }

            // recorro los platos que seran los incluidos en ...platos
            for (const plato of platos) {
                //verifico que sea plato y no sea null
                if (!(plato instanceof Dish) || (plato === null)) {
                    throw new ObjecManagerException('plato', 'Dish');
                }
                //obtengo posicion del plato
                let pPlato = this.#getDishPosition(plato);
                if (pPlato === -1) { //sino existe
                    this.addDish(plato); // añado el plato a la coleccion
                    pPlato = this.#getDishPosition(plato);
                }

                //compruebo que el plato este dentro del menu que le hemos pasado y guardamos su posicion
                const position = this.#getDishPositionInMenu(plato, this.#menus[pMenu]);

                if (position === -1) { // si no existe dentro del array asociado a su menu lo añado
                    this.#menus[pMenu].dishes.push(this.#platos[pPlato]);

                }


            }
            return this;
        }

        // deasigna platos del menu
        deassignDishToMenu(menu, ...platos) {

            // validacion si existen argumentos de entrada 
            if (arguments.length === 0) {
                throw new ObjecManagerException('argument', 'menu,dish');
            }

            //valido menu
            if (!(menu instanceof Menu) || (menu === null)) {
                throw new ObjecManagerException('menu', 'Menu');
            }
            //recupero posicion del menu en array #menus
            const pMenu = this.#getMenuPosition(menu);

            //valido si existe menu
            if (pMenu !== -1) {
                // recorro array de argumentos
                for (const plato of platos) {

                    //valido que sea plato y no null
                    if (!(plato instanceof Dish) || (plato === null)) {
                        throw new ObjecManagerException('plato', 'Dish');
                    }

                    // recupero posicion del plato dentro del array dishes asociado al menu
                    const pPlato = this.#getDishPositionInMenu(plato, this.#menus[pMenu]);
                    //valido si el plato existe en el array de menus para poder borrarlo
                    if (pPlato !== -1) {
                        this.#menus[pMenu].dishes.splice(pPlato, 1); // obtengo objeto Menu con notación corchete, accedo a su propiedad dishes y borro
                    } else {
                        throw new DishNotExistInMenuException(plato, this.#platos[pPlato].menu);
                    }
                }
            } else {
                throw new MenuNotExistException(menu);
            }
            return this;
        }



        // intercambia la posición de dos platos dentro de un menu
        changeDishesPositionInMenu(menu, plato1, plato2) {

            // validacion si existen argumentos de entrada 
            if (arguments.length === 0) {
                throw new ObjecManagerException('argument', 'menu,dish');
            }

            //validaciones arguemntos no sean null
            if (menu === null || plato1 === null | plato2 === null) {
                throw new ObjecManagerException('menu', 'Menu');
            }

            //valido menu
            if (!(menu instanceof Menu)) {
                throw new ObjecManagerException('menu', 'Menu');
            }

            //valido plato1
            if (!(plato1 instanceof Dish)) {
                throw new ObjecManagerException('plato1', 'Dish');
            }

            //valido plato2 
            if (!(plato2 instanceof Dish)) {
                throw new ObjecManagerException('plato2', 'Dish');
            }


            //recupero posicion del menu en array #menus
            const pMenu = this.#getMenuPosition(menu);

            //valido si existe menu
            if (pMenu !== -1) {


                // recupero posicion del plato1 dentro del array dishes asociado al menu
                const pPlato1 = this.#getDishPositionInMenu(plato1, this.#menus[pMenu]);
                // recupero posicion del plato2 dentro del array dishes asociado al menu
                const pPlato2 = this.#getDishPositionInMenu(plato2, this.#menus[pMenu]);

                // valido si ambos platos existen los intercambio
                if (pPlato1 !== -1 && pPlato2 !== -1) {

                    //intercambbio los platos

                    [this.#menus[pMenu].dishes[pPlato1], this.#menus[pMenu].dishes[pPlato2]] = [this.#menus[pMenu].dishes[pPlato2], this.#menus[pMenu].dishes[pPlato1]];


                } else {
                    //plato no existe
                    throw new DishNotExistInMenuException(pPlato1, this.menu.name);
                }


            } else { //menu no existe
                throw new MenuNotExistException(menu);
            }

            return this;
        }




        //----------------------MÉTODOS QUE DEVUELVEN ITERADORES---------------

        // devuelve iterador con la relación de los platos con una categoria

        // he modificado funcion por field para asignar varias funciones de ordenacion en funcion de propiedades
        * getDishesInCategory(category, funcionOrdenacion) {

            // validacion si existen argumentos de entrada 
            if (arguments.length === 0) {
                console.log(arguments); // no argumentos
                throw new ObjecManagerException('argument', 'category');
            }

            /*
            if (!(category instanceof Category) || (category === null)) {
                throw new ObjecManagerException('category', 'Category');
            }


            */
            //obtenemos posicion de la categoria
            const position = this.#getCategoryPosition(category);

            //validamos si la categoria existe
            if (position !== -1) {
                //almacenamos array con los platos asociados a una categoria
                const array = this.#categories[position].dishes; //almaceno array de todos los platos de esa categoria

                // si no hay función en los argumentos
                if (funcionOrdenacion) {
                    array.sort(funcionOrdenacion);
                }

                //recorremos los platos del array
                for (const plato of array) {
                    yield plato; // yield --> pausa la funcion en ese punto
                }

            } else {
                throw new CategoryNotExistException(category);
            }

        }





        //devuelve iterador con los platos que tiene un determinado alérgeno
        * getDishesWithAllergen(allerge, funcionOrdenacion) {

            // validacion si existen argumentos de entrada 
            if (arguments.length === 0) {
                console.log(arguments); // no argumentos
                throw new ObjecManagerException('argument', 'allerge');
            }
            //validamos instancia y null
            if (!(allerge instanceof Allergen) || (allerge === null)) {
                throw new ObjecManagerException('allerge', 'allergen');
            }
            //obtenemos posicion del alergeno
            const position = this.#getAllergePosition(allerge);

            //validamos si alergeno existe
            if (position !== -1) {
                //almacenamos array con los platos asociados a un alergeno
                const array = this.#alergenos[position].dishes;
                // si hay funcion ordenamos
                if (funcionOrdenacion) {
                    array.sort(funcionOrdenacion);
                }

                //recorremos los platos del array
                for (const plato of array) {
                    yield plato; // yield --> pausa la funcion en ese punto
                }

            } else {
                throw new DishNotExistInCategoryException(allerge);
            }
        }



        //NUEVO iterador para esta práctica que me devuelva los platos asociados a un menu
        * getDishesInMenu(menu, funcionOrdenacion) {

        // validacion si existen argumentos de entrada 
        if (arguments.length === 0) {
            console.log(arguments); // no argumentos
            throw new ObjecManagerException('argument', 'menu');
        }
        //validamos instancia y null
        if (!(menu instanceof Menu) || (menu === null)) {
            throw new ObjecManagerException('menu', 'menu');
        }
        //obtenemos posicion del menu
        const position = this.#getMenuPosition(menu);

        //validamos si menu existe
        if (position !== -1) {
            //almacenamos array con los platos asociados a un menu
            const array = this.#menus[position].dishes;
            // si hay funcion ordenamos
            if (funcionOrdenacion) {
                array.sort(funcionOrdenacion);
            }

            //recorremos los platos del array
            for (const plato of array) {
                yield plato; // yield --> pausa la funcion en ese punto
            }

        } else {
            throw new DishNotExistInMenuException (menu);
        }
    }




        // devuelve iterador con los platos que cumplan un criterio, puede estar ordenado
        * findDishes(plato, funcionFiltrado, funcionOrdenacion) {

            // validacion si existen argumentos de entrada 
            if (arguments.length === 0) {
                throw new ObjecManagerException('argument', 'plato');
            }

            //valido plato sea instancia Dish y no null
            if (!(plato instanceof Dish) || (plato === null)) {
                throw new ObjecManagerException('plato', 'Dish');
            }

            //obtenemos posicion del plato
            const position = this.#getDishPosition(plato);

            if (position !== -1) {
                //creamos array con los platos filtrados
                const array = this.#platos.filter(funcionFiltrado);

                // lo ordeno si existe función
                if (funcionOrdenacion) {
                    array.sort(funcionOrdenacion);

                }
                //una vez ordenado lo recorro
                for (const plato of array) {
                    yield plato; // de cada producto conseguido
                }

            } else {
                throw new DishNotExistInManagerException(plato);
            }

        }


        //---------------------METODOS DE CREACION OBJETOS DE USANDO FLYWEIGHT-----------------


        /* factoria FLYWEIGHT Estructura codigo para recuperar datos del objeto central

    lo que hace es que en vez de instanciar categorias y productos desde fuera del manager
    como tenemos las colecciones mapas de categorias y productos, uso los constructores desde dentro
    
    -- esta factoria a partir de la coleccion que tengo se si la categoria que quiero crear
      existe o no existe. Sino la instancio con constructor, si existe devuelvo directamente el objeto

    uso: nos permite no crear mucha basura de objetos
    ejemplo en test: se aprecia como se crea la instancia del Manager y se solicita getProduct() o getCategory
    
    const p1 = Manager.getInstance().getProduct('111-111-111'); Solo se instanciara si el producto no existe
    sino usaramos FlyWeight tendriamos que crear la instancia new para crear el producto desde fuera del Manager
    y comprobar si existe o no
    */

        // crea plato o devuelve si esta creado
        createDish(name, description, ingredientes, image) {
            //busca plato en array 
            let plato = this.#platos.find(plato => plato.name === name);

            // si no existe lo crea
            if (!plato) {
                plato = new Dish(name, description, ingredientes, image);
            }
            return plato;
        }



        //crea menu o devuelve
        createMenu(name, description) {
            //busca menu en array 
            let men = this.#menus.find((item) => item.menu.name === name);

            // si no existe lo crea
            if (!men) {
                men = new Menu(name, description);
                return men;

            }
            //extraigo el objeto menu puesto que #menus almacena { menu:Menu, dishes:Array}
            const { menu } = men;

            return menu;
        }



        //crea alergeno o devuelve
        createAllergen(name, description) {
            //busca allerge en array 
            let allergen = this.#alergenos.find((item) => item.allerge.name === name);

            // si no existe lo crea
            if (!allergen) {
                allergen = new Allergen(name, description);
                return allergen;
            }
            //extraigo el objeto allerge puesto que #alergenos almacena { allerge:Allerge, dishes:Array}
            const { allerge } = allergen;

            return allerge;
        }


        //crea categoria o devuelve, añado url para mostrar imagen
        createCategory(name, description, url) {
            //busca categoria en array. Hay que recordar que categories guarda el objeto literal junto con los platos
            let categori = this.#categories.find((item) => item.category.name === name);

            console.log(categori);


            // si no existe lo crea
            if (!categori) {
                categori = new Category(name, description, url);
                //this.#categories.push(categori); // lo añade al array categorias
                return categori;

            }
            //extraigo el objeto Category puesto que #categories almacena { category:Category, dishes:Array}
            const { category } = categori;

            return category;


        }






        //crea restaurante o devuelve
        createRestaurant(name, description, location) {
            //busca restaurante en array 
            let restaurant = this.#restaurantes.find((item) => item.name === name);

            // si no existe lo crea
            if (!restaurant) {
                restaurant = new Restaurant(name, description, location);

            }
            return restaurant;
        }

        //añado nuevo metodo createCoordinate para no tener que importar los constructores desde el managerController
        createCoordinate(latitude, longitude) {

            let coordinate = new Coordinate(latitude, longitude);

            return coordinate;
        }

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //metodos añadidos para práctica 5

        //metodo que devuelve un array con numeros aleatorios sin repetir comprendidos entre un minimo y un maximo incluidos ambos
        numeroEnteroAleatorio(min, max, cantidadNumeros) {
            min = Math.ceil(min);
            max = Math.floor(max);

            let arrayNumeros = [];
            while (arrayNumeros.length < cantidadNumeros) {
                let numeroAleatorio = Math.floor(Math.random() * (max - min * 1) + min);
                let existe = false;
                for (let i = 0; i < arrayNumeros.length; i++) {
                    if (arrayNumeros[i] == numeroAleatorio) {
                        existe = true;
                        break;
                    }
                }
                if (!existe) {
                    arrayNumeros[arrayNumeros.length] = numeroAleatorio;
                }
            }
            return arrayNumeros;
        }

        //recibe como argumento el numero de platos a mostrar de forma aleatoria y devuelve array con los objetos dish
        platosAleatorios(cantidad) {
            let arrayAleatorio = [];

            //compruebo que tenga disponibidad de platos
            if (cantidad <= this.#platos.length) {
                //recibo array con las posiciones de los platos
                let aleatorio = this.numeroEnteroAleatorio(0, this.#platos.length,cantidad);

                //recorro el array con las posiciones de los platos a mostrar
                for (let i = 0; i < aleatorio.length; i++) {
                    //añado al array de objetos los platos del array #platos
                    //de aquellas posiones definidas en array aleatorio 
                    arrayAleatorio.push(this.#platos[aleatorio[i]]);
                }
            } else {
                alert(" no hay tantos platos disponibles, compruebe cantidad");
            }
            return arrayAleatorio; //devuelvo array con los platos aleatorios
        }

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



    }



    // esta funcion inicializara la instancia almacenada en let instantiated; 
    //devuelve el objeto manager
    function init() {
        const manager = new Manager();
        Object.freeze(manager);
        return manager;
    }

    // esto es lo que decuelve la funcion anonima por tanto lo que sera
    //guaradado en el objeto manager
    return {


        //importante: La pimera vez que se invoca getInstance() se ejecutara init()
        // despues como ya tendra un valor devolvera su valor ( es decir la instacia que ya he creado)
        getInstance() {
            //preguntamos si la variable esta inicializada
            if (!instantiated) { // si no lo esta sera undefined, la cual se traduce como false
                instantiated = init();
            }
            return instantiated;
        },
    };


}());

//exporto modulo
export default Manager;
export {
    Dish, Category, Allergen, Menu, Restaurant, Coordinate,
} from '../entities/entities.js';




