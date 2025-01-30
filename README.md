#Task Management API
This API allows users to register, log in, and manage tasks. The application uses JWT authentication to secure endpoints. Users can create, read, update, and delete tasks

#Technologies Used
1)node.js
2)Express.js
3)MongoDB with Mongoose

#Installation
1)Clone the repository
git clone <https://github.com/hrutik2/Fluid_AI_-Assignment-.git>
2)installed the dependencies
 npm install
3)start the server
npm start

##Register User
the endpoint for Register User :-/user/register
<br/>
send this data in json format
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

##User Login
the endpoint for login User :-/user/login
send this data in json format
{
  "name": "John Doe",
  "email": "john@example.com",
  
}





