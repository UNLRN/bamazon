const supervisor = require('../models/supervisor.js');
const inquirer = require('inquirer');
const validator = require('validator');
const Table = require('easy-table');

function supervisorRequest() {
	inquirer.prompt([{
		type: 'list',
		name: 'todo',
		message: 'What would you like to do today?',
		choices: [
			"View Product Sales by Department",
			"Add New Department",
		]
	}]).then((answers) => {
		switch (answers.todo) {
			case "View Product Sales by Department":
				supervisor.viewProductSalesByDepartment()
					.then((res) => {
						let t = new Table;
						res.forEach((item) => {
							t.cell('Department ID', item.department_id);
							t.cell('Department Name', item.department_name);
							t.cell('Overhead Costs', item.overhead_costs);
							t.cell('Product Sales', item.product_sales);
							t.cell('Total Profit', (item.product_sales - item.overhead_costs));
							t.newRow();
						})
						console.log(t.toString());
						askSupervisor();
					})
					.catch((err) => console.log(err))
				break;
			case "Add New Department":
				inquirer.prompt([
					{
						type: 'input',
						name: 'name',
						message: 'What is the departments name?'
					},
					{
						type: 'input',
						name: 'overhead',
						message: 'What are the overhead costs?',
						validate: function (value) {
							if (validator.isNumeric(value) || validator.isDecimal(value)) {
								return true;
							}
							return 'Please enter a valid number'
						}
					}
				]).then((answers) => {
					supervisor.createNewDepartment(answers.name, answers.overhead)
						.then((res) => {
							let t = new Table;
							res.forEach((item) => {
								t.cell('Department ID', item.department_id);
								t.cell('Department Name', item.department_name);
								t.cell('Overhead Costs', item.overhead_costs);
								t.newRow();
							})
							console.log(t.toString());
							askSupervisor();
						})
						.catch((err) => console.log(err));
				})
				break;
			default:
				console.log("Error!")
				break;
		}
	})
}

function askSupervisor() {
	inquirer.prompt([{
		type: 'confirm',
		name: 'askAgain',
		message: 'Would you like to do supervisor things?',
		default: true,
	}]).then((answers) => {
		if (!answers.askAgain) {
			process.exit();
		} else {
			supervisorRequest()
		}
	})
}

module.exports.supervisorRequest = supervisorRequest;
module.exports.askSupervisor = askSupervisor;
