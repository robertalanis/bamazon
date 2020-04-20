# Bamazon

This CLI app is an Amazon-like storefront that uses MySQL. The app will take in orders from customers and deplete stock from the store's inventory.

### Demo



### Overview

##### Database

* I created a MySQL Database called `bamazon`.

* Insdide that database is a table called `products` with the following columns:

  * `item_id` (unique id for each product)

  * `product_name` (Name of product)

  * `department_name`

  * `price` (cost to customer)

  * `stock_quantity` (how much of the product is available in stores)

* I then populated this database with a few mock items.

##### Node Application

Running this application will first display all of the items available for sale (including the ids, names, and prices of products for sale).

The app should then prompt users with two messages.

  * The first asks the ID of the product they would like to buy.
  * The second asks how many units of the product they would like to buy.
  
Once the customer has placed the order, the application should check if the store has enough of the product to meet the customer's request. If not, the app will log `Insufficient quantity!` and then prevent the order from going through.

However, if the store does have enough of the product, it will fulfill the customer's order and two things will happen:
  * The SQL database will be updated to reflect the remaining quantity.
  *The customer will be alerted to the total cost of their purchase.
  
 ### Technologies Utilized

* NodeJS
* MySQL

### NPM Packages

* [Inquirer](https://www.npmjs.com/package/inquirer)
* [CLI-Table3](https://www.npmjs.com/package/cli-table3)
* [Colors](https://www.npmjs.com/package/colors)
* [Clear](https://www.npmjs.com/package/clear)
* [mysql](https://www.npmjs.com/package/mysql)

### Deployment
1. Clone repo
1. Open your terminal and navigate to the folder that contains the file `bamazonCustomer.js`
1. Run `npm install` to install the required dependencies
1. Run `node bamazonCustomer.js` and follow the inquirer prompts
