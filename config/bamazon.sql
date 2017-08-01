CREATE DATABASE `bamazon`;

USE `bamazon`;

CREATE TABLE `bamazon`.`products` (
  `item_id` INT(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `product_name` VARCHAR(150) UNIQUE NOT NULL,
  `department_name` VARCHAR(150) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `stock_quantity` INT(11) NOT NULL,
  `product_sales` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`item_id`)
);

INSERT INTO `products`
	(`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES
	('furbie', 'toys', '20.00', '5', '500'),
	('burbie', 'toys', '2.00', '1', '100'),
	('surbie', 'toys', '15.00', '9', '480'),
	('kurbie', 'clothes', '19.00', '16', '380'),
	('turbie', 'clothes', '17.50', '20', '875'),
	('durbie', 'clothes', '20.00', '1', '100'),
	('lurbie', 'toys', '20.55', '22', '0'),
	('hurbie', 'electronics', '20.00', '42', '120'),
	('murbie', 'toys', '200.00', '3', '8000'),
	('purpie', 'toys', '20.00', '5', '20');

CREATE TABLE `bamazon`.`departments` (
	`department_id` INT(11) NOT NULL UNIQUE AUTO_INCREMENT,
	`department_name` VARCHAR(150) UNIQUE NOT NULL,
	`overhead_costs` DECIMAL(10,2) NOT NULL,
	PRIMARY KEY (`department_id`)
);

INSERT INTO `departments`
	(`department_name`, `overhead_costs`)
VALUES
	('toys', '100'),
	('electronics', '200'),
	('clothes', '50');
