const chalk = require("chalk");
var inquirer = require("inquirer");
var numeral = require("numeral");
var Table = require("cli-table3");
var colors = require("colors");
var mysql = require("mysql");
var clear = require("clear");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "bootcamp",
  database: "bamazon_DB",
});

connection.connect(function (err) {
  clear();
  greetCustomer();
});

function greetCustomer() {
  inquirer
    .prompt([
      {
        name: "enterStore",
        type: "list",
        message: "Welcome to " + "BAMAZON".rainbow +" Would you like to make a purchase?",
        choices: ["yes", "no"],
      },
    ])
    .then(function (answers) {
      if (answers.enterStore === "yes") {
        displayProducts()
      }
      else {exit()}
    });
}


var displayProducts = function () {
  var query = "Select * FROM products";
  connection.query(query, function (err, res) {
    if (err) throw err;
    var displayTable = new Table({
      head: [
        "Item ID".green,
        "Product Name".green,
        "Catergory".green,
        "Price".green,
        "Quantity".green,
      ],
    });
    for (var i = 0; i < res.length; i++) {
      displayTable.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        res[i].price,
        res[i].stock_quantity,
      ]);
    }
    console.log(displayTable.toString());
  });
};


function exit() {
  connection.end(function(err) {
    //Clear console
    clear();
    //Thank you message
    var thankYouTable = new Table({ wordWrap: true });
    thankYouTable.push([
      {
        hAlign: "center",
        content: ("Thanks for visting!".random),
      },
    ]);
    console.log(thankYouTable.toString());
  });
}
