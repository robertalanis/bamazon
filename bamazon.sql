DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products
(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR (45) NOT NULL,
  department_name VARCHAR (45) NOT NULL,
  price DECIMAL (10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

  ALTER TABLE products AUTO_INCREMENT=1000;

  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("toilet paper", "health & personal care", 20.85, 10),
    ("hand sanitizer", "health & personal care", 14.52, 150),
    ("clorox bleach", "health & personal care", 11.82, 453),
    ("face mask", "fashion", 12.56, 347),
    ("running shoes", "fashion", 121.56, 487),
    ("nintendo switch", "electronics", 349.99, 148),
    ("web camera", "electronics", 49.99, 548);

  SELECT *
  FROM products;