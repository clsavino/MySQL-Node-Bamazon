var mysql = require('mysql');
var Table = require('cli-table2');
var inquirer = require('inquirer');

var TASKS = 5;

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'christi', //your mysql workbench password goes here
    database:  'bamazon'
});

connection.connect(function (err) {
    if (err) {
        console.log('Error connecting to Db');
        throw err;
    }
});

function promptManager() {
    inquirer.prompt({
        name: "action",
        type: "list",

        message: " Would like to continue?\n",
        choices: ["Yes", "No"]
    }).then(function(answer) {
        switch(answer.action) {
            case 'Yes':
                askManager();
            break;

            case 'No':
                connection.end();
            break;
        }
    });
}

function viewProducts() {
    connection.query('SELECT * FROM products', function(err, results){        
        displayForManager(results);
        promptManager(); 
    })
}

function viewLowInventory() {
    connection.query('SELECT * FROM products WHERE StockQuantity < 5', function(err,results) {
        console.log('\n  All products with quantity lower than 5 shown in Inventory Table\n');
        displayForManager(results); 
        promptManager();            
    })
}

function addInventory() {

    inquirer.prompt([{
        name: "id",
        type: "input",
        message: " Enter the Item ID of the product",

    }, {
        name: "quantity",
        type: "input",
        message: " Enter quantity you wish to add",

    }]).then(function(answer) {

        connection.query('SELECT * FROM products WHERE ?', {ItemID: answer.id},function(err,res) {
            itemQuantity = res[0].StockQuantity + parseInt(answer.quantity);

            connection.query("UPDATE products SET ? WHERE ?", [{
                StockQuantity: itemQuantity
            }, {
                ItemID: answer.id
            }], function(err, results) {});

            connection.query('SELECT * FROM products WHERE ?', {ItemID: answer.id},function(err,results) {
                console.log('\n The Stock Quantity was updated- see Inventory Table\n');   
                displayForManager(results);
                promptManager();
            });

        });
    });
}   

function addProduct() {
    inquirer.prompt([{
        name: "productName",
        type: "input",
        message: " Enter the name of the product",
    }, {
        name: "departmentName",
        type: "input",
        message: " Enter the department of the product",
    }, {
        name: "price",
        type: "input",
        message: " Enter price of the product",
    }, {
        name: "quantity",
        type: "input",
        message: " Enter the quantity",                
    }]).then(function(answer) {
        connection.query("INSERT INTO products SET ?", {
            ProductName: answer.productName,
            DepartmentName: answer.departmentName,
            Price: answer.price,
            StockQuantity: answer.quantity
        }, function(err, res) {
            console.log('\n  The new product was added - See the Inventory Table\n');
                connection.query('SELECT * FROM products', function(err, results){  
                    displayForManager(results);
                    promptManager();
                });               
        }); 
    });
} 

function askManager() {
    var managerMsg = [
    '\nSelect the option number for the option you need:\n',
    "1 - View Products for Sale\n", 
    "2 - View Low Inventory\n", 
    "3 - Add to Inventory\n", 
    "4 - Add New Product\n",
    "5 - All Done\n",
    ];

    for (i = 0; i < managerMsg.length; i++) {
    console.log(managerMsg[i]);
    }

    inquirer.prompt({
        name: "option",
        type: "input",
        message: " Which option would you like to perform?\n",
    }).then(function(answer) {

        var choice = parseInt(answer.option);

        if (choice > 0 && choice <= TASKS) {
            switch(answer.option) {
                case '1':
                     viewProducts();
                     break;
                
                case '2':
                     viewLowInventory();
                     break;
                
                case '3':
                     addInventory();
                     break;
                
                case '4':
                     addProduct();
                     break;

                case '5':
                     connection.end();
                     break;      
            } 
        } else {
            console.log('Please choose a number between 1 and ' + TASKS);
            askManager();
        }
    });
}

var displayForManager = function(results) {   
    var table = new Table({
        head: ['Item ID', 'Product Name', 'Price', 'Stock Quantity'],
    });
    for (var i=0; i <results.length; i++) {
        table.push(
            [results[i].ItemID, results[i].ProductName, '$'+ results[i].Price, results[i].StockQuantity]            
        );          
    }
    console.log('\n' + table.toString());
}

// **** Start the Bamazon Manager Function ****
askManager();



