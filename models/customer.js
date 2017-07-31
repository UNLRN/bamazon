const db = require('../db.js');

exports.viewProducts = function () {
	return new Promise((resolve, reject) => {
		db.query(`SELECT item_id, product_name, price FROM products`, function (err, results, fields) {
			if (err) reject(err);
			resolve(results)
		})
	})
};

exports.purchaseProduct = function (id, qty) {
	return new Promise((resolve, reject) => {
		db.query(`SELECT stock_quantity, price FROM products WHERE item_id = ?`, [parseInt(id)], function (err, results, fields) {
			if (err) return reject(err);
			if (results[0].stock_quantity < qty) {
				resolve(`Insufficient quantity!`);
			} else {
				db.query(`UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?; UPDATE products SET product_sales = ((price * ?) + product_sales WHERE item_id = ?)`, [parseInt(qty), parseInt(id), parseInt(qty), parseInt(id)], function (err, results, fields) {
					if (err) return reject(err);
					resolve('Transaction Successful');
				})
			}
		})
	})
}