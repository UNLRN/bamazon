const customer = require('./models/customer.js');
const inquirer = require('inquirer');
const prettyjson = require('prettyjson');
const validator = require('validator');

function customerRequest() {
	customer.viewProducts()
		.then((res) => {
			console.log(prettyjson.render(res));
			return res
		})
		.then((res) => {
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
					.catch((err) => {
						console.log("Error: " + err)
					})

			})
		})
}

function askCustomer() {
	inquirer.prompt([{
		type: 'confirm',
		name: 'askAgain',
		message: 'Would you like to make a purchase?',
		default: true,
	}]).then((answers) => {
		if (!answers.askAgain) {
			process.exit();
		} else {
			customerRequest()
		}
	})
}

askCustomer();

