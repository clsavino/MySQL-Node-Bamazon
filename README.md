# MySQL-Node-Bamazon
Amazon-like storefront using MySQL. The app takes in orders from customers and depletes stock from the store's inventory.

# Screenshots
#### Example 1 - Command Line Interface showing:
* initial inventory when database created
* initial user prompt

![Alt text](/images/bamazonStart.PNG?raw=true "Photo of the command line interface showing table with initial inventory and customer prompts")

#### Example 2 - Demonstate failure to fill an order due to insufficient quantity in inventory:
* show current inventory table after a few customer orders fulfilled,
* customer prompts to order an item, 
* response to customer's request for quantity of items not in stock,
* inventory table to help customer order correct quantity,
* new prompt to order,
* order fulfilled message,
* updated table showing inventory reduction

![Alt text](/images/bamazon1a.PNG?raw=true "Photo of the command line interface showing table with inventory and customer prompts")

#### Example 3 - Demonstrate order fulfilled on first prompt:
* current inventory table,
* customer prompt to order an item,
* Order fulfilled message,
* updated table showing inventory reduction

![Alt text](/images/bamazon1b.PNG?raw=true "Photo showing customer's order and updated inventory table")

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
#Acknowlegements
####Thanks to [Shaun](https://github.com/fullers) for the idea of using the cli-input node package to display the tables.