/* Aplicación que instancia al controlador del MVC
*/

//importo el modelo, la vista y el controlador
import Manager from './manager.js';
import ManagerController from './managerController.js';
import ManagerView from './managerView.js';

//instancio controlador con MODELO y VISTA
const ManagerApp = new ManagerController(Manager.getInstance(), new ManagerView());

export default ManagerApp;

// debo añadir linea en miRestaurante.js para importarlo