const manager = require('./models/manager.js');


manager.viewProducts();
manager.viewLowInventory();
manager.addInventory(1, 20);
manager.addNewProduct('zurbie', 'toys', 20.00, 1);
db.destroy();
process.exit();