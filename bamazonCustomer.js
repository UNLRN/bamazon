const db = require('./db.js');
const customer = require('./models/customer.js');
const inquirer = require('inquirer');
const validator = require('validator');



inquirer.prompt([{
		type: 'list',
		name: 'id',
		message: 'What is the ID of the product you would like to buy?',
		choices: ids
	},
	{
		type: 'input',
		name: 'amount',
		message: 'How many would you like?',
		validate: function (value) {
			if (validator.isNumeric(value)) {
				return true;
			}
			return 'Please enter a valid number'
		}
	}
]).then(function (answers) {
	db.query(`SELECT stock_quantity, price FROM products WHERE item_id = ${answers.id}`, function (err, results, fields) {
		if (results[0].stock_quantity < answers.amount) {
			console.log(`Insufficient quantity!`);
		} else {
			db.query(`UPDATE products SET stock_quantity = ${answers.id - results[0].stock_quantity} WHERE item_id = ${answers.id}`)
			console.log(`Your total is ${results[0].price * answers.amount}`)
		}

	})
})

		db.end();
		process.exit();