var mysql = require('mysql');
var Table = require('cli-table2');
var inquirer = require('inquirer');
const READLINE = require('readline');

const RL = READLINE.createInterface({
  input: process.stdin,
  output: process.stdout
});

var done = false;

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '', //your mysql workbench password goes here
    database:  'bamazon'
});

connection.connect(function (err) {
    if (err) {
        console.log('Error connectig to Db');
        throw err;
    }
});


function askManager() {
    var managerMsg = [
    '\nSelect the option number for the option you need:\n',
    "1 - View Products for Sale\n", 
    "2 - View Low Inventory\n", 
    "3 - Add to Inventory\n", 
    "4 - Add New Product\n",
    ];

    for (i = 0; i < managerMsg.length; i++) {
    console.log(managerMsg[i]);
    }

    return RL.question('Which option do you want to choose? ', (answer) => {
        if (answer > 0 && answer < 5) {
            console.log('Calling function for option ', answer);
            switch(answer.action) {
                case 'View Products for Sale':
                    viewProducts();
                break;
                
                case 'View Low Inventory':
                    viewLowInventory();
                break;
                
                case 'Add to Inventory':
                    addInventory();
                break;
                
                case 'Add New Product':
                    addProduct();
                break;      
            } 
        } else {
            console.log('Please choose a number between 1 and 4');
            askManager();
        }
    });
}

askManager();

function viewProducts() {
    console.log('entered viewProducts');
}

function viewLowInventory() {
    console.log('entered viewLowInventory');
}

function addInventory() {
    console.log('entered addInventory');
}

function addProduct() {
    console.log('entered addProduct');
}

