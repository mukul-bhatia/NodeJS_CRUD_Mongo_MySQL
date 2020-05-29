                                                   NodeJS_CRUD_Mongo_MySQL
Prerequisite :
1. NodeJS installed on your machine(v10 or above).
2. MySQL and MongoDB installed on your machine.

Once you have downloaded the project, open the project on your editor and follow the steps:

Step 1:
Open path: "./server/routes/api.js" and edit (line 6 for Mongo) and (line 18 to 21 for MySQL) database connection. This basically includes the connection details and path for your database.

Step 2:
To change the port open path: "./server.js". Edit line 4 and change the port, else the server serves on port = 3000.

Step 3:
Now open the terminal and cd to the project folder path.

Step 4:
For installing packages, run the command: "npm install"

Step 5:
Once all the packages are installed, run the server by the command: "node server" or "nodemon server"

Once the server is running up and both the databases are connected, you are all set to hit the APIs.


APIs list for Mongo:

/getAll

get/:name

/update

/create

/delete



APIs list for MySQL:

/mysql/getAll

/mysql/get/:name

/mysql/update

/mysql/create

/mysql/delete
