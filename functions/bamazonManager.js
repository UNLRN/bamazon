const manager = require('../models/manager.js');
const inquirer = require('inquirer');
const Table = require('easy-table');
const validator = require('validator');

function managerRequest() {
	inquirer.prompt([{
		type: 'list',
		name: 'todo',
		message: 'What would you like to do today?',
		choices: [
			"View Products",
			"View Low Inventory",
			"Add Inventory",
			"Add New Product",
		]
	}]).then((answers) => {
		switch (answers.todo) {
			case "View Products":
				manager.viewProducts()
					.then((res) => {
						let t = new Table
						res.forEach((item) => {
							t.cell('Product ID', item.item_id)
							t.cell('Product Name', item.product_name)
							t.cell('Price', item.price)
							t.cell('Stock Quantity', item.stock_quantity)
							t.newRow()
						})
						console.log(t.toString());
						askManager();
					})
					.catch((err) => console.log(err))
				break;
			case "View Low Inventory":
				manager.viewLowInventory()
					.then((res) => {
						let t = new Table
						res.forEach((item) => {
							t.cell('Product ID', item.item_id)
							t.cell('Product Name', item.product_name)
							t.cell('Price', item.price)
							t.cell('Stock Quantity', item.stock_quantity)
							t.newRow()
						})
						console.log(t.toString());
						askManager();
					})
					.catch((err) => console.log(err))
				break;
			case "Add Inventory":
				manager.viewProducts()
					.then((res) => {
						let t = new Table
						res.forEach((item) => {
							t.cell('Product ID', item.item_id)
							t.cell('Product Name', item.product_name)
							t.cell('Price', item.price)
							t.cell('Stock Quantity', item.stock_quantity)
							t.newRow()
						})
						console.log(t.toString());
						const ids = res.map((id) => { return id.item_id.toString() });
						inquirer.prompt([
							{
								type: 'list',
								name: 'id',
								message: 'What is the ID of the product you would like to add stock to?',
								choices: ids
							},
							{
								type: 'input',
								name: 'amount',
								message: 'How many would you like to add?',
								validate: function (value) {
									if (validator.isNumeric(value)) {
										return true;
									}
									return 'Please enter a valid number'
								}
							}
						]).then((answers) => {
							manager.addInventory(answers.id, answers.amount)
								.then((res) => {
									console.log(`Inventory has been updated to ${res[1][0].stock_quantity}`)
									askManager();
								})
								.catch((err) => console.log(err))
						})
					})
				break;
			case "Add New Product":
				manager.getDepartments()
					.then((res) => {
						const departments = res.map((department) => { return department.department_name })
						inquirer.prompt([
							{
								type: 'input',
								name: 'name',
								message: 'What is the name of the product?'
							},
							{
								type: 'list',
								name: 'department',
								message: 'What department is it for?',
								choices: departments
							},
							{
								type: 'input',
								name: 'price',
								message: 'What is the price for the product?',
								validate: function (value) {
									if (validator.isNumeric(value) || validator.isDecimal(value)) {
										return true;
									}
									return 'Please enter a valid number'
								}
							},
							{
								type: 'input',
								name: 'quantity',
								message: 'How many should I add?',
								validate: function (value) {
									if (validator.isNumeric(value)) {
										return true;
									}
									return 'Please enter a valid number'
								}
							},
						]).then((answers) => {
							manager.addNewProduct(answers)
								.then((res) => {
									console.log(`Product Added!`)
									askManager();
								})
								.catch((err) => console.log(err));
						})
					})
				break;
			default:
				console.log("Error!")
				break;
		}
	})
}

function askManager() {
	inquirer.prompt([{
		type: 'confirm',
		name: 'askAgain',
		message: 'Would you like to do manager things?',
		default: true,
	}]).then((answers) => {
		if (!answers.askAgain) {
			process.exit();
		} else {
			managerRequest()
		}
	})
}

module.exports.askManager = askManager;
module.exports.managerRequest = managerRequest;