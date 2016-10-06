var mysql = require('mysql');
var Table = require('cli-table2');
var inquirer = require('inquirer');
var done = false;

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'yourpassword',
	database:  'bamazon'
});
//From MySQL workbench bamazon database schema: 
// CREATE TABLE products (
// 	ItemID INTEGER(11) AUTO_INCREMENT NOT NULL, 
//  ProductName  VARCHAR(50) NOT NULL,
//  DepartmentName VARCHAR(50) NOT NULL, 
//  Price DECIMAL(10,2), 
// 	StockQuantity INTEGER(10),
//  PRIMARY KEY (ItemID)

connection.connect(function (err) {
	if (err) {
		console.log('Error connectig to Db');
		throw err;
	}
	//console.log("Connected as id", connection.threadId);
});

// Display products database using a table made with the npm package cli-table2
// then Prompt the user to determine item and quantity they want to purchase
var displayForPurchase = function(done) {
connection.query('SELECT * FROM products', function(err, results){		
		var table = new Table({
			head: ['Item ID', 'Product Name', 'Price', 'Stock Quantity'],
		   	//colWidths: [20, 200, 50]
		});
		for (var i=0; i <results.length; i++) {
			table.push(
				[results[i].ItemID, results[i].ProductName, '$'+ results[i].Price, results[i].StockQuantity]			
			);			
		}
		console.log('\n' + table.toString() + '\n');
		if (!done) {
			purchaseItem();
		}
		
	});
}

var purchaseItem = function() {
	//displayTable();
	inquirer.prompt([{
		name: "id",
		type: "input",
		message: "Enter the Item ID of the product you want to purchase",
		// validate: function(value) {
		// 	if (isNAN(value) == false) {
		// 		return true;
		// 	} else {
		// 		return false;
		// 	}
		// }
	}, {
		name: "quantity",
		type: "input",
		message: "Enter the quantity you want to purchase",
		//validate: function(value) {
        //    if (isNaN(value) == false) {
        //        return true;
        //    } else {
        //        return false;
        //    }
        //}	
	}]).then(function(answer) {
		//console.log(answer);
		connection.query('SELECT ProductName, DepartmentName, Price, StockQuantity FROM products WHERE ?', {ItemID: answer.id}, function(err,res) {
		//console.log(res);
			
		console.log('\nYou would like to buy ' + answer.quantity + ' ' + res[0].ProductName + ' ' + res[0].DepartmentName + ' at $' + res[0].Price + ' each'
			);
			if (res[0].StockQuantity >= answer.quantity) {
				var itemQuantity = res[0].StockQuantity - answer.quantity;
				connection.query("UPDATE products SET ? WHERE ?", [
				{
					StockQuantity: itemQuantity
				}, {
					ItemID: answer.id
				}], function(err,res) {
					});	
				var cost = res[0].Price * answer.quantity;
				console.log('Order fulfilled! Your cost is $' + cost.toFixed(2));
				// Order completed - set done = true to end
				var done = true;
				displayForPurchase(done);
					
			} else {
				console.log('Sorry, Insufficient quantity to fulfill your order!');
				// Order not completed  - set done = false to continue and prompt user again.
				var done = false;
				displayForPurchase(done);
			}
		})
    });
}
// Start app by displaying Bamazon database
displayForPurchase(done); // done = false
