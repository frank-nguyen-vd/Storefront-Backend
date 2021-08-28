# StorefrontBackend
This application is able support online storefront backend, such as add products, show products, add orders, etc.

## Prerequisite
PostgreSQL server is required for this application and need to be installed.

After PostgreSQL server installation, 2 databases need to be created:
- dev: database for development purpose
- test: database for testing purpose

.env file is required for this application. Below is the sample .env file

  ```
  POSTGRES_HOST=127.0.0.1
  POSTGRES_DB=storefront
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD=password
  ENV=dev
  POSTGRES_DB_TEST=storefront_test
  BCRYPT_PASSWORD=speak-friend-and-enter
  SALT_ROUNDS=10
  TOKEN_SECRET=thisissecrettoken
  ``` 
*Note that all fields need to be present*

## Installation
Install dependencies

  ```
  npm install
  ```

Setup Database

  ```
  db-migrate up
  ```

## Run test 

  ```
  npm run test
  ```
  
## How to use
### Run server
There are 2 ways to run the server

1. Build project and run js file

In root directory, run the following
  ```
  npm run build
  ```
`build` folder will be created upon successfull built. Go to `build` folder and run
  ```
  node server
  ```

2. Use nodemon

In root directory, run the following
  ```
  npm run start
  ```

*Note: Backend server is running at port 3000, Database server is running at port 5432*

### API List
#### 1. User API
- Create new user (POST)
  ```
  http://localhost:3000/users/
  ```
  Request body
    ```
    {
      "username": <username (string)>,
      "firstname": <firstname (string)>,
      "lastname": <lastname (string)>,
      "password": <password (string)>
    }
    ```
  Response
    ```
    {
      "id": <user_id>,
      "username": <username>,
      "firstname": <firstname>,
      "lastname": <lastname>
    }
    ```
  
- Authenticate (POST)
  ```
  http://localhost:3000/authenticate/
  ```
  Request body
    ```
    {
      "username": <username (string)>,
      "password": <password (string)>
    }
    ```
  Response
    ```
    {
      "token": <jwt_token>
    }
    ```

- Get all users (GET)
  ```
  http://localhost:3000/users/
  ```
  *Need to put bearer token in the header*
  
  Request body: None

  Response
    ```
    [
      {
        "id": <user_id1>,
        "username": <username1>,
        "firstname": <firstname1>,
        "lastname": <lastname1>
      },
      {
        "id": <user_id2>,
        "username": <username2>,
        "firstname": <firstname2>,
        "lastname": <lastname2>
      },
      ....
    ]
    ```

- Get single user by user_id (GET)
  ```
  http://localhost:3000/users/:id
  ```
  *Need to put bearer token in the header*
  
  Request body: None

  Response
    ```
    {
      "id": <user_id>,
      "username": <username>,
      "firstname": <firstname>,
      "lastname": <lastname>
    }
    ```

#### 2. Product API
- Create new product (POST)
  ```
  http://localhost:3000/products/
  ```
  *Need to put bearer token in the header*
  
  Request body
    ```
    {
      "name": <product_name (string)>,
      "price": <product_price (integer)>,
      "category": <product_category (string)>
    }
    ```
  Response
    ```
    {
      "id": <product_id>,
      "name": <product_name>,
      "price": <product_price>,
      "category": <product_category>
    }
    ```
  

- Get all products (GET)
  ```
  http://localhost:3000/products/
  ```
  
  Request body: None

  Response
    ```
    [
      {
        "id": <product_id1>,
        "name": <product_name1>,
        "price": <product_price1>,
        "category": <product_category1>
      },
      {
        "id": <product_id2>,
        "name": <product_name2>,
        "price": <product_price2>,
        "category": <product_category2>
      },
      ....
    ]
    ```

- Get single product by product_id (GET)
  ```
  http://localhost:3000/products/:id
  ```
  *Need to put bearer token in the header*
  
  Request body: None

  Response
    ```
    {
      "id": <product_id>,
      "name": <product_name>,
      "price": <product_price>,
      "category": <product_category>
    }
    ```

#### 3. Order API
- Create new order (POST)
  ```
  http://localhost:3000/orders/
  ```
  *Need to put bearer token in the header*
  
  Request body
    ```
    {
      "status": <active or complete (string)>,
      "user_id": <user_id (string)>,
    }
    ```
  Response
    ```
    {
      "id": <order_id>,
      "status": <active or complete>,
      "user_id": <user_id>,
    }
    ```
  

- Get all orders (GET)
  ```
  http://localhost:3000/orders/
  ```
  
  Request body: None

  Response
    ```
    [
      {
        "id": <order_id1>,
        "status": <active or complete>,
        "user_id": <user_id>,
      },
      {
        "id": <order_id2>,
        "status": <active or complete>,
        "user_id": <user_id>,
      },
      ....
    ]
    ```

- Get single order by order_id (GET)
  ```
  http://localhost:3000/orders/:id
  ```
  *Need to put bearer token in the header*
  
  Request body: None

  Response
    ```
    {
      "id": <order_id>,
      "status": <active or complete>,
      "user_id": <user_id>,
    }
    ```

- Add product to order (POST)
  ```
  http://localhost:3000/orders/:id/products
  ```
  *Need to put bearer token in the header*

  Request body
    ```
    {
      "quantity": <product quantity (number)>,
      "product_id": <product_id (string)>,
    }
    ```

  Response
    ```
    {
      "id": <order_id>,
      "quantity": <product quantity>,
      "product_id": <product_id>,
      "order_id": <order_id>
    }
    ```

#### 4. Dashboard API
- Get products by category (GET)
  ```
  http://localhost:3000/products-by-category/
  ```
  
  Request body
   ```
    {
      "category": <product_category (string)>
    }
    ```

  Response
    ```
    [
      {
        "id": <product_id1>,
        "name": <product_name1>,
        "price": <product_price1>,
        "category": <product_category1>
      },
      {
        "id": <product_id2>,
        "name": <product_name2>,
        "price": <product_price2>,
        "category": <product_category2>
      },
      ....
    ]
    ```
  

- Get five most popular products (GET)
  ```
  http://localhost:3000/five-most-popular-product/
  ```
  
  Request body: None

  Response
    ```
    [
      {
        "name": <product_name1>,
        "price": <product_price1>,
        "category": <product_category1>,
        "Sum": <product_sum1>
      },
      {
        "name": <product_name2>,
        "price": <product_price2>,
        "category": <product_category2>,
        "Sum": <product_sum2>
      },
      ....
    ]
    ```

- Get orders by user_id (GET)
  ```
  http://localhost:3000/order-by-userid/
  ```
  *Need to put bearer token in the header*
  
  Request body
   ```
    {
      "user_id": <user_id (integer)>
    }
   ```

  Response
    ```
    [
      {
        "id": <order_id1>,
        "status": <active or complete>,
        "product_id": <product_id1>,
        "user_id": <user_id>,
        "quantity": <product_quantity1>
      },
      {
        "id": <order_id2>,
        "status": <active or complete>,
        "product_id": <product_id2>,
        "user_id": <user_id>,
        "quantity": <product_quantity2>
      },
      ....
    ]
    ```
    
- Get complete orders by user_id (GET)
  ```
  http://localhost:3000/complete-order-by-userid/
  ```
  *Need to put bearer token in the header*
  
  Request body
   ```
    {
      "user_id": <user_id (integer)>
    }
   ```

  Response
    ```
    [
      {
        "id": <order_id1>,
        "status": complete,
        "product_id": <product_id1>,
        "user_id": <user_id>,
        "quantity": <product_quantity1>
      },
      {
        "id": <order_id2>,
        "status": complete,
        "product_id": <product_id2>,
        "user_id": <user_id>,
        "quantity": <product_quantity2>
      },
      ....
    ]
    ```
