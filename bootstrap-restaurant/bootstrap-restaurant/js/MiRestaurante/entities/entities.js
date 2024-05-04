/*Entidades de la práctica tarea 4
- añado nuevo atributo url a la entidad Category para que muestre una imagen
*/

import {
    BaseException,
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException,
    AbstractClassException,
  } from '../exceptions.js';

// clase plato DISH ------------------------------
class Dish {
    // Campos privados
    #name; //obligatorio

    #description;

    #ingredients; // [] array string con los ingredientes que componen el plato

    #image; // ruta donde se ubica imagen del plato

    constructor(name, description, ingredients, image) {
        // La función se invoca con el operador new
        if (!new.target) throw new InvalidAccessConstructorException(); // Verificación operador new

        // Validación de parámetros obligatorios
        if (!name) throw new EmptyValueException('name');

        // Definición de atributos privados del objeto
        this.#name = name;
        this.#description = description;
        this.#ingredients = ingredients;
        this.#image = image;

        // Propiedades de acceso a los atributos privados enumerables.
        Object.defineProperty(this, 'name', {
            enumerable: true,
            get() {
                return this.#name;
            },
            set(value) {
                //nombre debe ser obligatorio  
                if (!value) throw new EmptyValueException('name');
                this.#name = value;
            },
        });

        Object.defineProperty(this, 'description', {
            enumerable: true,
            get() {
                return this.#description;
            },
            set(value) {
                this.#description = value;
            },
        });

        Object.defineProperty(this, 'ingredients', {
            enumerable: true,
            get() {
                return this.#ingredients;
            },
            set(value) {
                this.#ingredients = value;
            },
        });

        Object.defineProperty(this, 'image', {
            enumerable: true,
            get() {
                return this.#image;
            },
            set(value) {
                this.#image = value;
            },
        });

    }


    // Métodos públicos
    toString() {
        return `name: ${this.#name}, description: ${this.#description}, ingredients: ${this.#ingredients}, image: ${this.#image}`;
    }
}



// Clase categorias Category ------------------------------
//añado nuevo atributo imagen para practica 5
class Category {
    // Campos privados
    #name; //obligatorio

    #description;

    #url; // ruta donde se ubica imagen del plato

    constructor(name, description, url) {
        // La función se invoca con el operador new
        if (!new.target) throw new InvalidAccessConstructorException(); 

        // Validación de parámetros obligatorios
        if (!name) throw new EmptyValueException('name');

        // Definición de atributos privados del objeto
        this.#name = name;
        this.#description = description;
        this.#url = url; //nuevo atributo
        

        // Propiedades de acceso a los atributos privados enumerables.
        Object.defineProperty(this, 'name', {
            enumerable: true,
            get() {
                return this.#name;
            },
            set(value) {
                //nombre debe ser obligatorio  
                if (!value) throw new EmptyValueException('name');
                this.#name = value;
            },
        });

        Object.defineProperty(this, 'description', {
            enumerable: true,
            get() {
                return this.#description;
            },
            set(value) {
                this.#description = value;
            },
        });

        // añado para práctica 5
        Object.defineProperty(this, 'url', {
            enumerable: true,
            get() {
                return this.#url;
            },
            set(value) {
                this.#url = value;
            },
        });
    }


    // Métodos públicos, modifico para practica 5
    toString() {
        return `name: ${this.#name} description: ${this.#description} image: ${this.#url}`;
    }
}

// Clase alergenos Allergen ------------------------------
class Allergen {
    // Campos privados
    #name; //obligatorio

    #description;

    constructor(name, description) {
        // La función se invoca con el operador new
        if (!new.target) throw new InvalidAccessConstructorException(); // Verificación operador new

        // Validación de parámetros obligatorios
        if (!name) throw new EmptyValueException('name');

        // Definición de atributos privados del objeto
        this.#name = name;
        this.#description = description;
        

        // Propiedades de acceso a los atributos privados enumerables.
        Object.defineProperty(this, 'name', {
            enumerable: true,
            get() {
                return this.#name;
            },
            set(value) {
                //nombre debe ser obligatorio  
                if (!value) throw new EmptyValueException('name');
                this.#name = value;
            },
        });

        Object.defineProperty(this, 'description', {
            enumerable: true,
            get() {
                return this.#description;
            },
            set(value) {
                this.#description = value;
            },
        });
    }


    // Métodos públicos
    toString() {
        return `name: ${this.#name} description: ${this.#description}`;
    }
}

// Clase Menu ------------------------------
class Menu {
    // Campos privados
    #name; //obligatorio

    #description;

    constructor(name, description) {
        // La función se invoca con el operador new
        if (!new.target) throw new InvalidAccessConstructorException(); // Verificación operador new

        // Validación de parámetros obligatorios
        if (!name) throw new EmptyValueException('name');

        // Definición de atributos privados del objeto
        this.#name = name;
        this.#description = description;
        

        // Propiedades de acceso a los atributos privados enumerables.
        Object.defineProperty(this, 'name', {
            enumerable: true,
            get() {
                return this.#name;
            },
            set(value) {
                //nombre debe ser obligatorio  
                if (!value) throw new EmptyValueException('name');
                this.#name = value;
            },
        });

        Object.defineProperty(this, 'description', {
            enumerable: true,
            get() {
                return this.#description;
            },
            set(value) {
                this.#description = value;
            },
        });
    }


    // Métodos públicos
    toString() {
        return `name: ${this.#name} description: ${this.#description}`;
    }
}

// Clase restaurante ------------------------------
class Restaurant {
    // Campos privados
    #name; //obligatorio

    #description;
    #location; // coordenadas ubucacion del restaurante


    constructor(name, description, location) {
        // La función se invoca con el operador new
        if (!new.target) throw new InvalidAccessConstructorException(); // Verificación operador new

        // Validación de parámetros obligatorios
        if (!name) throw new EmptyValueException('name');
        //compruebo que location sea un objeto Coordenate
        if (!location instanceof Coordinate) throw new InvalidValueException("location", location); 


        // Definición de atributos privados del objeto
        this.#name = name;
        this.#description = description;
        this.#location = location;

        

        // Propiedades de acceso a los atributos privados enumerables.
        Object.defineProperty(this, 'name', {
            enumerable: true,
            get() {
                return this.#name;
            },
            set(value) {
                //nombre debe ser obligatorio  
                if (!value) throw new EmptyValueException('name');
                this.#name = value;
            },
        });

        Object.defineProperty(this, 'description', {
            enumerable: true,
            get() {
                return this.#description;
            },
            set(value) {
                this.#description = value;
            },
        });

        //¿ HAY QUE COMPROBAR QUE SEA DEL TIPO COORDENADAS? ¿ O STRING LOS DEMAS?
        Object.defineProperty(this, 'location', {
            enumerable: true,
            get() {
                return this.#location;
            },
            set(value) {
                this.#location = value;
            },
        });


    }


    // Métodos públicos
    toString() {
        return `name: ${this.#name} description: ${this.#description} location: ${this.#location}`;
    }
}

// Clase coordinate ------------------------------
class Coordinate {
    // Campos privados
    #latitude; //obligatorio
    #longitude; //obligatorio


    constructor(latitude, longitude) {
        // La función se invoca con el operador new
        if (!new.target) throw new InvalidAccessConstructorException(); // Verificación operador new

        // Validación de parámetros obligatorios
        if (!latitude) throw new EmptyValueException('latitude');
        if (!longitude) throw new EmptyValueException('longitude');

        // convertimos a Number y validamos coordenadas válidas
        latitude = Number.parseFloat(latitude); // convertimos String a Float
        if (latitude < -90 || latitude > 90) throw new InvalidValueException("latitude", latitude); // validamos entre [-90, 90]
        longitude = Number.parseFloat(longitude); // convertimos String a Float
        if (longitude < -180 || longitude > 180) throw new InvalidValueException("longitude", longitude); // validamos entre [-180, 180]
        
        // Definición de atributos privados del objeto
        this.#latitude = latitude;
        this.#longitude = longitude;


        // Propiedades de acceso a los atributos privados enumerables.
        Object.defineProperty(this, 'latitude', {
            enumerable: true,
            get() {
                return this.#latitude;
            },
            set(value) {
                //nombre debe ser obligatorio  
                if (!value) throw new EmptyValueException('latitude');
                this.#latitude = value;
            },
        });

        Object.defineProperty(this, 'longitude', {
            enumerable: true,
            get() {
                return this.#longitude;
            },
            set(value) {
                this.#longitude = value;
            },
        });

    }


    // Métodos públicos
    toString() {
        return `latitude: ${this.#latitude} longitude: ${this.#longitude}`;
    }
}


//exporto clases
export {
    Dish, Category, Allergen, Menu, Restaurant, Coordinate,
};
  

