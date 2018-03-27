# Hapijs REST APIs secured with JWT authentication 

This is a sample repository demonstrating how to create REST Api using Hapijs framework. Along the way it has following integrations. 

- JWT Authentication using hapu-auth-jwt2
- MongoDB integration with actual DB running on MLabs
- Swagger integration for self documentation
- Versioning support for API endpoints
- Unit testing with Lab and Code
- Joi integration for Model and Url parameter validation
- Docker integration for easier testing and deployment

# Running the sample locally

1. Clone the repository

`
https://github.com/Kraval/hapi-jwt-docker.git
`

2. Nativate to project directory

`
cd hapi-jwt-docker
`

3. Add .env file with following variables
```
   - PORT = 3000
   - SECRET_KEY= SomeSecretKey_For_JWT_Signing
   - NODE_ENV=DEVELOPMENT   
   - MONGO_URL=mongodb://localhost:27017/hapiapi
```

4. Run `npm test`, you shold see all the tests running

5. Run `npm start`, and you should be able to navigate to following swagger documentation

`
https://localhost:3000/documentation
`

Swagger Documentation by Version.

http://localhost:3000/documentation?tags=v1
http://localhost:3000/documentation?tags=v2

# Running same using Docker

I assume you have docker tools intalled and running on your machine. 

sudo docker build -t yourname/hapijwt .

sudo docker run -p 3000:3000 -d yourname/hapijwt

Navigate to,

`
https://localhost:3000/documentation
`

# Heroku Deployment
This application is deployed to Heroku Container and can be reached [Here](https://enigmatic-badlands-63395.herokuapp.com/documentation)
