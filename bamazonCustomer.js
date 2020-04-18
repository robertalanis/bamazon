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
  clear()
  console.log("Welcome to BAMAZON".random);
  mainPrompt()
});

var cart = []

//Greet Customer
function mainPrompt() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "Select an action:",
        choices: ["Add Item to Cart", "Check Out", "Exit"],
      },
    ])
    .then(function (answers) {
      clear()
      display()
      switch(answers.action) {
        case "Add Item to Cart":
          enterQuantity()
          break;
        case "Check Out":
          console.log("Would you like to view your cart first?")
          break;
        case "Exit":
          exit()
          break;
        default:
          // code block
      }
    });
}

//Display Products
var display = function () {
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
    requestID()
  });
};

function requestID() {
  inquirer
    .prompt([
      {
        name: "IDrequest",
        type: "input",
        message: "Enter Item ID:",
      },
    ])
    .then(function (answers) {
      var query = "Select * FROM products";
      connection.query(query, function (err, res) {
        if (err) throw err;
        var productArr = []
        for (let i = 0; i < res.length - 1; i++) {
          productArr.push(res[i].item_id);
        }
        if (productArr.includes(parseInt(answers.IDrequest))) {
          clear()
          display()
          console.log("Item #" + answers.IDrequest + " is in stock")
        } else {
          clear()
          display()
          console.log("Error: Item #" + answers.IDrequest + " not found");
        }
      });
    });
}

function enterQuantity() {

}

//Exit Store
function exit() {
  connection.end(function (err) {
    // The connection is terminated nowclear();
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



