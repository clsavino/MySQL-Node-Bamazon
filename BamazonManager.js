var mysql = require('mysql');
var Table = require('cli-table2');
var inquirer = require('inquirer');
const READLINE = require('readline');
var TASKS = 5;

const RL = READLINE.createInterface({
  input: process.stdin,
  output: process.stdout
});

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'christi', //your mysql workbench password goes here
    database:  'bamazon'
});

connection.connect(function (err) {
    console.log('connection created');
    if (err) {
        console.log('Error connectig to Db');
        throw err;
    }
});

// function promptManager() {
//     inquirer.prompt({
//         name: "action",
//         type: "list",

//         message: " Would like to continue?\n",
//         choices: ["Yes", "No"]
//     }).then(function(answer) {
//         switch(answer.action) {
//             case 'Yes':
//                 askManager();
//             break;

//             case 'No':
//                 connection.end();
//             break;
//         }
//     })
// }

function viewProducts() {
    connection.query('SELECT * FROM products', function(err, results){        
        displayForManager(results);
        //promptManager(); 
    })
}

function viewLowInventory() {
    console.log('entered viewLowInventory');
    connection.query('SELECT ProductName, StockQuantity FROM products WHERE StockQuantity < 5', function(err,results) {
        displayForManager(results); 
        //promptManager();            
    })
}

function addInventory() {
        console.log('entered addInventory');
}
//     inquirer.prompt([{
//         name: "id",
//         type: "input",
//         message: " Enter the Item ID of the product",

//     }, {
//         name: "quantity",
//         type: "input",
//         message: " Enter quantity you wish to add",

//     }]).then(function(answer) {
//                 console.log(answer.id,answer.quantity);
//                 connection.query("UPDATE products SET ? WHERE ?", [{
//                     StockQuantity: answer.quantity
//                 }, {
//                     ItemID: answer.id
//                 }], function(err, results) {});
//                 console.log('stock updated');
//                 displayForManager();
//                 //promptManager();
//         })
// }   

//         // Query the database for info about the item including the quantity currently in stock. 
//         connection.query('SELECT ProductName, DepartmentName, Price, StockQuantity FROM products WHERE ?', {ItemID: answer.id}, function(err,res) {
// function addProduct() {
//     console.log('entered addProduct');
//     displayForManager(results);
//    //promptManager();
// }

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

    return RL.question('Which option do you want to choose? ', (answer) => {
        var choice = parseInt(answer);

        if (choice > 0 && choice <= TASKS) {
            switch(answer) {
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

askManager();



