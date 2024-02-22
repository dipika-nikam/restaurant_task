# Restaurant

This is a basic example of creating a Node.js API using TypeScript and Express.js.

## Getting Started

### Prerequisites
---

Make sure you have [Node.js](https://nodejs.org/) installed.

1. Clone the repository and run below commands:

```bash
git clone git@github.com:dipika-nikam/restaurant_task.git
```
2. Install dependencies:

 ```bash
 npm install
```
Install all require packages which is used in this project

### Start project 
---

1. Create a .env file 
```bash
PORT = 3000
MONGODB_URI = 'mongodb://localhost:27017'
DB_NAME = 'restaurants'
COLLECTON = 'restaurants'
```
2. Add restaurants static data 
```bash 
npx ts-node src/staticdata/add.restaurant.ts
```
3. Run project 

```bash  
npm run server  
 ```

### API Endpoints
---
Main URL: http://localhost:3000/api/restaurants/

1. GET /api/restaurants/get-nearby-restaurants

- Description: Retrieves restaurant data that is located near the user's current location. The API should accept user location coordinates as input and return a list of nearby restaurants based on a specified radius. Implement a geospatial query to find restaurants within the desired distance from the user's location.

2. GET /api/restaurants/get-all-restaurants

- Description: Returns all the restaurant data stored in the database. This API should provide a complete list of all the restaurants, including their details and coordinates.

3. DELETE /api/restaurants/delete-restaurant/:id

- Description: Deletes a specific restaurant from the database based on its unique identifier (ID). The API should accept the restaurant ID as a parameter and remove the corresponding entry from the database.


## Postman Collection

https://api.postman.com/collections/23194037-ca3a6017-1a3e-45c7-bd2b-46942283fc95?access_key=PMAT-01HQ86PM3C0B1NEQE64CDKPNJG

## API Documentation

https://documenter.getpostman.com/view/23194037/2sA2rAzhfX
