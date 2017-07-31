const db = require('../db.js');

exports.viewProducts = function () {
	return new Promise((resolve, reject) => {
		db.query(`SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity > 0`, function (err, results, fields) {
			if (err) reject(err);
			resolve(results);
		})
	})
};

exports.viewLowInventory = function () {
	return new Promise((resolve, reject) => {
		db.query(`SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5`, function (err, results, fields) {
			if (err) reject(err);
			resolve(results);
		})
	})
};

exports.addInventory = function (id, qty) {
	return new Promise((resolve, reject) => {
		db.query(`UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?; SELECT stock_quantity FROM products WHERE item_id = ?`, [parseInt(qty), parseInt(id), parseInt(id)], function (err, results, fields) {
			if (err) reject(err);
			resolve(results);
		})
	})
};

exports.addNewProduct = function (product) {
	return new Promise((resolve, reject) => {
		db.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)`, [product.name, product.department, parseFloat(product.price), parseInt(product.quantity)], function (err, results, fields) {
			if (err) reject(err);
			resolve(results);
		})
	})
}

exports.getDepartments = function() {
	return new Promise((resolve, reject) => {
		db.query(`SELECT department_name FROM products GROUP BY department_name`, function(err, results, fields){
			if (err) reject(err);
			resolve(results);
		})
	})
}