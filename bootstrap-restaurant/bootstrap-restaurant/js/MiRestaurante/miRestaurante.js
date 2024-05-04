//import ShoppingCartApp from './shoppingcart/shoppingCartApp.js';

//añado para poder trabajar
import ManagerApp from './manager/managerApp.js';

const historyActions = {
  init: () => {
    ManagerApp.handleInit();
  },
  
  productsCategoryList: (event) => ManagerApp.handleProductsCategoryList(event.state.category),
  productsAlergenosList: (event) => ManagerApp.handleProductsAlergenosList(event.state.category),
  productsRestaurantList: (event) => ManagerApp.handleProductsRestaurantList(event.state.category),
  productsMenuList: (event) => ManagerApp.handleProductsMenuList(event.state.category),
  
  mostrarFichaPlato: (event) => ManagerApp.handleMostrarFichaPlato(event.state.name),
};

window.addEventListener('popstate', (event) => {
  if (event.state) {
    historyActions[event.state.action](event);
  }
});

history.replaceState({ action: 'init' }, null);
