# MySQL-Node-Bamazon
Amazon-like storefront using MySQL. The app takes in orders from customers and depletes stock from the store's inventory.

# Screenshots
#### Bamazon schema in MySQL Workbench

![Alt text](/images/mysqlWorkbench.PNG?raw=true "Photo of the MySQL Workbench showing the schema and initial inventory")

#### Example 1 - Command Line Interface showing:
* initial inventory when database created,
* initial user prompt,
* order fulfilled message,
* cost of items calculated and displayed,
* customer prompted to continue shopping,
* when custom selects "yes" the table is displayed with updated stock quantities,
* customer is prompted to continue shopping,
* order is fulfilled and cost is calculated
* customer is prompted again


![Alt text](/images/r1.PNG?raw=true "Photo of the command line interface showing table with initial inventory and customer prompts")

#### Example 2 - Demonstate failure to fill an order due to insufficient quantity in inventory:
* show current inventory after purchases, 
* customer prompted to order an item, 
* response to customer's request for quantity of items not in stock,
* customer prompted for desire to order again

![Alt text](/images/r2.PNG?raw=true "Photo of the command line interface showing table with inventory and customer prompts")

# Technologies Used
#### The following technologies and tools were used
* **JavaScript**
* **node.js**
* **MySQL Workbench**

#### The following node modules and npm packages were used 
* **readline**
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
#Acknowlegements
####Thanks to [Shaun](https://github.com/fullers) for the idea of using the cli-table2 node package to display the tables.