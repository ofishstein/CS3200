# Project Repo for CS3200.

This is for the [Northeastern University Database Design Course](https://course.ccs.neu.edu/cs3200sp18s3/index.html).

Team members:
 * Sheryl Deakin
 * Oli Fishstein
 * Karan Marwah
 * Joey Wood
 
 
 Steps to Run:
 
 1) Clone Our Entire Repo from Master
 
 2) Run MySQL (through XAMPP or command line tool) and Create a database using our ddl file as SOURCE for schema and our dml file as SOURCE for inserts
 
 e.g. CREATE DATABASE dbdesignproject;
 
      USE dbdesignproject;
      
      SOURCE /Users/karanmarwah/Desktop/DatabaseHw/CS3200/project/ddl.sql;
      
      SOURCE /Users/karanmarwah/Desktop/DatabaseHw/CS3200/project/dml.sql;
 
 3) cd into our 'dbdesignproject' folder
 
 4) Run the command 'npm install' to install all dependencies
 
 5) Run the command 'brew install yarn' if you do not already have yarn on your system 
 
 6) cd into the 'src folder
 
 7) open the server.js file. At the top edit the username, password, and database name to match the ones you used for step 2.
 
 8) in the 'src' folder run 'node server.js'. The backend should now be running on localhost:3000
 
 9) cd .. and return to the 'dbdesignproject' directory. Run 'yarn start'. The front end should prompt you to run on another  port as 3000 is in use, type in 'y'
 
 10) once compilation has finished the frontend should be available at localhost:3001 in your browser
 
 
 
 
