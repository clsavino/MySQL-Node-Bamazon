# MySQL-Node-Bamazon
Amazon-like storefront using MySQL and Node.js. It is comprised of two apps - one for customer orders and one for manager actions. Uses basic functions of persistant storage. CRUD database operations -  INSPECT, SELECT, UPDATE SQL queries used.

BamazonCustomer:
* displays a table with the inventory
* takes a customer's order
* computes the cost
* depletes the stock from the store's inventory

BamazonManager - allows a manager to:
* View Products for Sale 
* View Low Inventory 
* Add to Inventory
* Add New Product

# Screenshots
#### Bamazon schema in MySQL Workbench

![Alt text](/images/schema.PNG?raw=true "Photo of the MySQL Workbench showing the schema and initial inventory")

## Bamazon Customer App
#### Screenshot 1 - Command Line Interface showing:
* initial inventory when database created - SELECT query used,
* initial user prompt - inquirer npm used,
* order fulfilled message - SELECT query used
* cost of items calculated and displayed - UPDATE query used,
* customer prompted to continue shopping,
* when customer selects "yes" the table is displayed with updated stock quantities - cli-table2 npm used,
* customer is prompted to continue shopping,
* order is fulfilled and cost is calculated
* customer is prompted again


![Alt text](/images/customer1.PNG?raw=true "Photo of the command line interface showing table with initial inventory and customer prompts")

#### Screenshot 2 - Demonstate failure to fill an order due to insufficient quantity in inventory:
* show current inventory after purchases, 
* customer prompted to order an item, 
* response to customer's request for quantity of items not in stock,
* customer prompted for desire to order again - connection.end() used for clean end to node.js app


![Alt text](/images/customer2.PNG?raw=true "Photo of the command line interface showing table with inventory and customer prompts")

## Bamazon Manager App
#### Screenshot 1 - Node command line interface showing:
* View Products for Sale option - Inventory Table displayed, SELECT query used
* View Low Inventory option - Inventory Table displayed only with items with stock quantity less than 5, SELECT WHERE query used
* Prompt Manager to determine if desires to continue 

![Alt text](/images/manager1.PNG?raw=true "Photo of the command line interface showing manager option selected and response")

#### Screenshot 2 - 
* Add New Product option - prompt Manager to input product name, department, price, and quantity, INSERT and SELECT queries used
* Add to Inventory option - prompt Manager to input Item id and quantity to add, display Inventory Table, SELECT and UPDATE queries used
* Prompt Manager to determine if desires to continue, "No" is selected which invokes connection.end() for a clean end to database connection and Node.js app

![Alt text](/images/manager2.PNG?raw=true "Photo of the command line interface showing manager option selected and response")

#### Screenshot 3 -
* All Done option - terminates connection to database using connection.end() for a clean end to database connection and Node.js app (no need for cntl C)

![Alt text](/images/manager3.PNG?raw=true "Photo of the command line interface showing manager option to finish and connection ended cleanly")

# Technologies Used
#### The following technologies and tools were used
* **JavaScript**
* **node.js**
* **MySQL Workbench**

#### The following npm packages were used 
* **mysql**
* **inquirer**
* **cli-table2**

# Getting Started
#### The Bamazon node.js app is maintained in Github with the SQL file to use in the MySQL workbench. You will need to add your password in the BamazonCustomer.js file to run on your local machine

```javascript
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'your password',
	database:  'bamazon'
});
```
#Acknowledgments
####Thanks to [Shaun](https://github.com/fullers) for the idea of using the cli-table2 node package to display the tables.