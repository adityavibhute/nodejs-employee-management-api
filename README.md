# nodejs-employee-management-api
Employee management api service where we can add, update, delete employee along with authorization

This project will server various endpoints which can be utilized for below operations -

* https://127.0.0.1:3000/api/v1/employees?page=2&limit=3

This will provide employee list with pagination 

* https://127.0.0.1:3000/api/v1/employees/62c9482c3f3f28f0e87f1183

This will return user details by ID

* https://127.0.0.1:3000/api/v1/employees

This is POST method to add employee. Please refer Employee-API-POSTMAN.json for payload

* https://127.0.0.1:3000/api/v1/employees/62c9482c3f3f28f0e87f1183

This is PATCH method to update employee. Please refer Employee-API-POSTMAN.json for payload

* https://127.0.0.1:3000/api/v1/employees/

This is DELETE method to delete employee. Please refer Employee-API-POSTMAN.json for payload

* https://127.0.0.1:3000/api/v1/users/login

This is LOGIN authorization method which need username and passoword for login

* https://127.0.0.1:3000/api/v1/users

This endpoint will return all the users in user table
