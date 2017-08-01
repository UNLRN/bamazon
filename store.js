const inquirer = require('inquirer');
const customer = require('./functions/bamazonCustomer');
const manager = require('./functions/bamazonManager');
const supervisor = require('./functions/bamazonSupervisor');

function enterStore() {
	inquirer.prompt([
		{
			type: 'list',
			name: 'role',
			message: 'Name your role',
			choices: [
				"Customer",
				"Manager",
				"Supervisor",
			]
		}
	]).then((answers) => {
		switch (answers.role) {
			case "Customer":
				customer.askCustomer();
				break;
			case "Manager":
				inquirer.prompt([
					{
						type: 'password',
						name: 'password',
						message: 'Password'
					}
				]).then((answers) => {
					if (answers.password === "password") {
						manager.askManager();
					} else {
						console.log('Wrong Password!')
						process.exit();
					}
				})
				break;
			case "Supervisor":
				inquirer.prompt([
					{
						type: 'password',
						name: 'password',
						message: 'Password'
					}
				]).then((answers) => {
					if (answers.password === "password") {
						supervisor.askSupervisor();
					} else {
						console.log('Wrong Password!')
						process.exit();
					}
				})
				break;
			default:
				break;
		}
	})
}

enterStore();