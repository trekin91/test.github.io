// Ajouter une commande et la sauvegarder dans LocalStorage
document.getElementById('addOrderBtn').addEventListener('click', function() {
  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  let newOrder = {
    description: 'Commande de boisson',
    date: new Date().toLocaleString()
  };
  orders.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(orders));
  displayOrders();
});

// Afficher les commandes stockées dans LocalStorage
function displayOrders() {
  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  let orderList = document.getElementById('orderList');
  orderList.innerHTML = '';
  orders.forEach((order, index) => {
    let listItem = document.createElement('li');
    listItem.textContent = `${order.description} - ${order.date}`;
    
    // Ajout d'un bouton pour supprimer la commande
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.addEventListener('click', function() {
      removeOrder(index);
    });
    
    listItem.appendChild(deleteButton);
    orderList.appendChild(listItem);
  });
}

// Supprimer une commande de LocalStorage
function removeOrder(index) {
  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.splice(index, 1);
  localStorage.setItem('orders', JSON.stringify(orders));
  displayOrders();
}

// Affichage initial des commandes au chargement de la page
window.onload = function() {
  displayOrders();
};
