const customer = require('../models/customer.js');
const inquirer = require('inquirer');
const Table = require('easy-table');
const validator = require('validator');

function customerRequest() {
	customer.viewProducts()
		.then((res) => {
			let t = new Table
			res.forEach((item) => {
				t.cell('Product ID', item.item_id)
				t.cell('Product Name', item.product_name)
				t.cell('Price', item.price)
				t.newRow()
			})
			console.log(t.toString());
			
			const ids = res.map((id) => { return id.item_id.toString() });
			
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
			]).then((answers) => {
				customer.purchaseProduct(answers.id, answers.amount)
					.then((res) => {
						console.log(res)
						askCustomer()
					})
					.catch((err) => console.log(err))
			})
		})
}

function askCustomer() {
	inquirer.prompt([{
		type: 'confirm',
		name: 'askAgain',
		message: 'Would you like to do customer things?',
		default: true,
	}]).then((answers) => {
		if (!answers.askAgain) {
			process.exit();
		} else {
			customerRequest()
		}
	})
}

module.exports.askCustomer = askCustomer;
module.exports.customerRequest = customerRequest;

