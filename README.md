# Task Management API
This API allows users to register, log in, and manage tasks. The application uses JWT authentication to secure endpoints. Users can create, read, update, and delete tasks
<br/>
# Technologies Used
<br/>
1)node.js
<br/>
2)Express.js
<br/>
3)MongoDB with Mongoose
<br/>

# Installation
1)Clone the repository
<br/>
git clone <https://github.com/hrutik2/Fluid_AI_-Assignment-.git>
<br/>
2)installed the dependencies
<br/>
 npm install
 <br/>
3)start the server
 <br/>
npm start
 <br/>
## Register User
the endpoint for Register User :-/user/register

<br/>
send this data in json format
 <br/>
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
 <br/>

## User Login
the endpoint for login User :-/user/login
 <br/>
send this data in json format
 <br/>
{
  "name": "John Doe",
  "email": "john@example.com",
  
}
 <br/>

 # task 
  <br/>
 ## creating
   <br/>
request:- POST 
<br/>
endpoint-/task/create
<br/>
body :-
{
  "title": "Complete project",
  "description": "Finish the API development",
  "dueDate": "2025-02-10",
  "priority": "High",
  "status": "Pending",
  "userId": "user123"
}

## updting 
   <br/>
request:- patch
<br/>
endpoint- /task/update/:id
<br/>


## deleting
   <br/>
request:- POST 
<br/>
endpoint-/task/delete/:id
<br/>

## Getting the data

  <br/>
request:- get
<br/>
endpoint-/task/
<br/>






