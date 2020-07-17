# Torque Report Printer
In Triumph Motocycles we use electronic torque wrenches to apply torques in some main engine bolts.

These tools send the information about the torques applied to a SQL Server database and we used to have a desktop app to print a torque report of these torques, 
which was then attached to the build card of the engine.

About six months we updated the software that manages the database and the tools programming and since then the application that prints the report stopped working.


We quoted the development of a new application with our supplier but they charged a amount completely over our budge.

Since I was alreday studying about web development and had recently found out about Electron, I decided to give it a go and now we have are printing torque reports again haha.

## How To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](https://www.npmjs.com/)) installed on your computer. From your command line:

``` bash
# Clone this repository
git clone https://github.com/alcimar-filho/TorqueReportPrinter.git
# Go into the repository
cd TorqueReportPrinter
# Install dependencies
npm install
# Open main.js and change the connection string to the one of your database
var connectionString = 'mssql://username:password@localhost/database'
# Run the application
npm start
```

To pack into an app, simply type:

``` shell
electron-packager .
```
