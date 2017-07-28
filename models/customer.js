const db = require('../db.js');

exports.viewProducts = function () {
	db.query(`SELECT item_id, product_name, price FROM products`, function (err, results, fields) {
		if (err) throw err;
		let ids = [];
		for (let index = 0; index < results.length; index++) {
			let element = results[index];
			console.log(`ID: ${element.item_id}`);
			console.log(`Product Name: ${element.product_name}`);
			console.log(`Price: ${element.price}`);
			ids.push(element.item_id.toString())
		};
		return ids;
	})
};

exports.purchaseProduct = function(id, qty) {
	db.query(`SELECT stock_quantity, price FROM products WHERE item_id = ?`, [id], function(err, results, fields){
		if (results[0].stock_quantity < answers.amount) {
			console.log(`Insufficient quantity!`);
		} else {
			db.query(`UPDATE products SET stock_quantity = ? - ?WHERE item_id = ?`, [])
		}
	})
}