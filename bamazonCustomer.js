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
  welcome()
  //console.log("Welcome to BAMAZON".random);
  mainPrompt()
});

var cart = []

function welcome () {
  var thankYouTable = new Table({ wordWrap: true });
        thankYouTable.push([
          {
            hAlign: "center",
            content: "Welcome to BAMAZON".random
          },
        ]);
        console.log("\n\n\n\n\n");
        console.log(thankYouTable.toString());
        console.log("\n\n\n\n\n");
}

//Display Products
function display() {
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
    console.log("\n\n\n\n\n");
    console.log(displayTable.toString());
    console.log("\n\n\n\n\n");
  });
};

//Main Prompt
function mainPrompt() {
  display()
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "Select an action:",
        choices: ["Purchase Item", "Exit"],
      },
    ])
    .then(function (answers) {
      switch(answers.action) {
        case "Purchase Item":
          requestID()
          break;
        case "Exit":
          exit()
          break;
      }
    });
}

//Product ID Prompt
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
          welcome()
          display()
          enterQuantity(answers.IDrequest)
        } else {
          clear()
          welcome()
          mainPrompt()
          console.log("Error: Item #" + answers.IDrequest + " not found");
        }
      });
    });
}
//Quantity Prompt
function enterQuantity(productID) {
  console.log(productID);
  var query = 'SELECT * FROM products WHERE item_id=' + productID
  connection.query(query, function(err,res){
    console.log(res[0].product_name + " is in stock!");
    console.log("There are " + res[0].stock_quantity + " unit/s available");
    console.log("How many would you like to purchase?")
    inquirer
    .prompt([
      {
        name: "quantity",
        type: "input",
        message: "Enter quantity:",
        filter: Number
      },
    ])
    .then(function (input) {
      var quantityRequested = parseInt(input.quantity)
      if (quantityRequested <= res[0].stock_quantity) {
        console.log("Ready to Check out!")
        return checkout(productID, quantityRequested)
      }
      else if (quantityRequested > res[0].stock_quantity) {
        console.log ("Insufficient quantity!")
        mainPrompt()
      }
    });
	});
}

function checkout (productID, quantity){
  console.log("TEST CHECKOUT");
  console.log(productID);
  console.log(quantity);
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



