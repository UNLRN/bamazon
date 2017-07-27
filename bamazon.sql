CREATE DATABASE `bamazon`;

USE DATABASE `bamazon`;

CREATE TABLE `bamazon`.`products` (
  `item_id` INT(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `product_name` VARCHAR NOT NULL,
  `department_name` VARCHAR NOT NULL,
  `price` INT(11) NOT NULL,
  `stock_quantity` INT(11) NOT NULL,
  PRIMARY KEY (`item_id`));

  INSERT INTO `products`
  (`product_name`, `department_name`, `price`, `stock_quantity`)
  VALUES
  (),
  (),
  (),
  (),
  (),
  (),
  (),
  (),
  (),
  (),