const chalk = require('chalk');
var inquirer = require('inquirer');
var numeral = require('numeral');
var Table = require('cli-table3');
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "bootcamp",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("success!")
});


