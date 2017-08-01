const db = require('../config/db.js');

exports.viewProductSalesByDepartment = function() {
	return new Promise((resolve, reject) => {
		db.query(`
		SELECT departments.department_id, departments.department_name, departments.overhead_costs, SUM(products.product_sales) AS product_sales
		FROM departments, products
		WHERE departments.department_name = products.department_name
		GROUP BY departments.department_name
		ORDER BY departments.department_id ASC
		`, function(err, results, fields) {
			if (err) reject(err);
			resolve(results)
		})
	})
}

exports.createNewDepartment = function(department, overhead) {
	return new Promise((resolve, reject) => {
		db.query(`
		INSERT INTO departments
			(department_name, overhead_costs)
		VALUES
			(?, ?);
		SELECT * FROM departments;
		`, [department, parseFloat(overhead)], function(err, results, fields) {
			if (err) reject(err);
			resolve(results[1]);
		})
	})
}
