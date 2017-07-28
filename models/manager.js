const db = require('../db.js');

exports.viewProducts = function () {
	db.query(`SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity > 0`, function (err, results, fields) {
		if (err) throw err;
		console.log(JSON.stringify(results, null, 2));
	})
};

exports.viewLowInventory = function () {
	db.query(`SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5`, function (err, results, fields) {
		if (err) throw err;
		console.log(JSON.stringify(results, null, 2));
	})
};

exports.addInventory = function (id, qty) {
	db.query(`UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?; SELECT stock_quantity FROM products WHERE item_id = ?`, [qty, id, id], function(err, results, fields){
		if (err) throw err;
		console.log(`Inventory has been updated to ${results[1][0].stock_quantity}`);
	})
};

exports.addNewProduct = function(product, department, price, quantity){
	db.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)`, [product, department, price, quantity], function(err, results, fields){
		if (err) throw err;
		console.log(results);
	})
}