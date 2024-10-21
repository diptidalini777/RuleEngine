# RuleEngine

**Overview**
This project is a simple 3-tier rule engine application designed to evaluate user eligibility based on various attributes such as age, department, salary, and experience. The rule engine utilizes Abstract Syntax Tree (AST) to dynamically create, combine, and evaluate complex rules.


The system is split into two main parts:
Backend: Responsible for defining rules, storing them in a database, and exposing APIs to create, combine, and evaluate rules.
Frontend: A simple user interface to interact with the rule engine, submit rules, and evaluate conditions.


**Features**
-Define and store eligibility rules using AST.
-Create and combine multiple rules.
-Evaluate rules against user attributes.
-Handle error validation for invalid rules or inputs.
-Support for dynamic rule modification.


**********Backend Setup**********

1.Navigate to the backend directory:
cd ruleEngine/backend

2.Install backend dependencies:
npm install

3.Configure .env file with your MongoDB connection string:
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.kcbvv.mongodb.net/weatherMonitoring?retryWrites=true&w=majority&appName=Cluster0

4.Start the backend server:
nodemon src/server.js
The backend will be running at http://localhost:5000.

API Endpoints:
POST /create_rule: Create a rule from a string and store it in the database.
POST /combine_rules: Combine multiple rules and return the combined AST.
POST /evaluate_rule: Evaluate the combined rule against provided user attributes.


*******Frontend Setup*******

1.Navigate to the frontend directory:
cd ruleEngine/frontend

2.Install frontend dependencies:
npm install

3.Run the frontend:
npm start
The frontend will be available at http://localhost:3000.
