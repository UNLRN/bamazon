CREATE DATABASE `bamazon`;

USE `bamazon`;

CREATE TABLE `bamazon`.`products` (
  `item_id` INT(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `product_name` VARCHAR(150) NOT NULL,
  `department_name` VARCHAR(150) NOT NULL,
  `price` INT(11) NOT NULL,
  `stock_quantity` INT(11) NOT NULL,
  PRIMARY KEY (`item_id`));

INSERT INTO `products`
	(`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES
	('furbie', 'toys', '20.00', '5'),
	('burbie', 'toys', '2.00', '1'),
	('surbie', 'toys', '15.00', '9'),
	('kurbie', 'clothes', '19.00', '16'),
	('turbie', 'clothes', '17.50', '20'),
	('durbie', 'clothes', '20.00', '1'),
	('lurbie', 'toys', '20.55', '22'),
	('hurbie', 'electronics', '20.00', '42'),
	('murbie', 'toys', '200.00', '3'),
	('purpie', 'toys', '20.00', '5');