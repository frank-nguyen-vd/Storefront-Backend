# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Users

#### GET /api/users/login

**Description**  
To retrieve access token by providing username and password

**Request**

```json
{
  "username": "redfox",
  "password": "abc123"
}
```

**Response**

```json
{
  "statusCode": 200,
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlZGZveCIsImlhdCI6MTYyOTI4NDgyOSwiZXhwIjoxNjI5Mjg2NjI5fQ.vXwuwd9Lks8WooM7OUMeGdOWtwZRVpj0FCxJIxjwzbw"
}
```

#### GET /api/users

**Description**  
To retrieve the list of all users' profile

**Request**

- Authorization token

**Response**

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "first_name": "Arcadia",
      "last_name": "Oak",
      "username": "redfox",
      "password": "$2b$10$wX7wCnHdSIKIrlKncj/kFu0e9HtgeuqhLg8d1yInCKeknxMbdCxeO"
    },
    {...}.
    {...}
  ]
}
```

#### GET /api/users/\<id\>

**Description**  
To retrieve an user profile given the user id

**Request**

- `<id>` is the id of an user, for example, GET /api/users/1
- Authorization token

**Response**

```json
{
  "statusCode": 200,
  "data": {
    "id": 1,
    "first_name": "Arcadia",
    "last_name": "Oak",
    "username": "redfox",
    "password": "$2b$10$wX7wCnHdSIKIrlKncj/kFu0e9HtgeuqhLg8d1yInCKeknxMbdCxeO"
  }
}
```

#### POST /api/users

**Description**  
To create a new user account. The details of the newly created account will be returned

**Request**

- Authorization token
- json body

```json
{
  "first_name": "Arcadia",
  "last_name": "Oak",
  "username": "redfox1",
  "password": "abc123"
}
```

**Response**

```json
{
  "statusCode": 200,
  "data": {
    "id": 1,
    "first_name": "Arcadia",
    "last_name": "Oak",
    "username": "redfox",
    "password": "$2b$10$VpLH.xCI6qPbrl5r9de5hexDsShwHeL4Va28HvWmkemwlWTMmVlRK"
  }
}
```

#### DELETE /api/users/\<id\>

**Description**  
To delete a user account given user id. The details of the deleted account will be returned

**Request**

- `<id>` is the id of an user, for example, PATCH /api/users/1
- Authorization token

**Response**

```json
{
  "statusCode": 200,
  "data": {
    "id": 1,
    "first_name": "Green",
    "last_name": "Woods",
    "username": "redfox",
    "password": "$2b$10$VpLH.xCI6qPbrl5r9de5hexDsShwHeL4Va28HvWmkemwlWTMmVlRK"
  }
}
```

#### PATCH /api/users/\<id\>

**Description**  
To update a user account given user id. Only fields `first_name` and `last_name` can be updated

**Request**

- `<id>` is the id of an user, for example, PATCH /api/users/1
- Authorization token
- Json body

```json
{
  "first_name": "Green",
  "last_name": "Woods"
}
```

**Response**

```json
{
  "statusCode": 200,
  "data": {
    "id": 1,
    "first_name": "Green",
    "last_name": "Woods",
    "username": "redfox",
    "password": "$2b$10$VpLH.xCI6qPbrl5r9de5hexDsShwHeL4Va28HvWmkemwlWTMmVlRK"
  }
}
```

### Products

#### GET /api/products

**Description**  
To retrieve the list of all products' detail

**Request**

- None

**Response**

```json
{
  "statusCode": 200,
  "data": [
      {
          "id": 1,
          "name": "Iphone 12",
          "price": 1350.5,
          "category": "Smart Devices"
      },
      {...},
      {...}
  ]
}
```

#### GET /api/products?category=\<category_name\>

**Description**  
To retrieve the list of all products' detail under a defined category

**Request**

- If `<category_name>` is not defined, return empty list,  
  else return all products under the defined category

  for example, GET /api/products?category=Household

**Response**

```json
{
    "statusCode": 200,
    "data": [
        {
            "id": 1,
            "name": "Chair",
            "price": 1350.5,
            "category": "Household"
        },
        {...},
        {...}
    ]
}
```

#### GET /api/products?popular&limit=\<number_of_items\>

**Description**  
To retrieve the list of top sale products

**Request**

- If `limit` or `<number_of_items>` is not defined, return top 5 products,  
  else return `<number_of_items>` products

  for example, GET /api/products/?popular&limit=1

**Response**

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "name": "Chair",
      "price": 135.5,
      "category": "Household"
    }
  ]
}
```

#### GET /api/products/\<id\>

**Description**  
To retrieve an product detail given the product id

**Request**

- `<id>` is the id of a product, for example, GET /api/products/1

**Response**

```json
{
  "statusCode": 200,
  "data": {
    "id": 1,
    "name": "Iphone 12",
    "price": 1350.5,
    "category": "Smart Devices"
  }
}
```

#### POST /api/products

**Description**  
To create a new product. The details of the newly created product will be returned

**Request**

- Authorization token

**Response**

```json
{
  "statusCode": 200,
  "data": {
    "id": 1,
    "name": "Tiffany Chair",
    "price": 129.99,
    "category": "Household"
  }
}
```

#### DELETE /api/products/\<id\>

**Description**  
To delete a product given its id. The details of the deleted product will be returned

**Request**

- `<id>` is the id of the product, for example, DELETE /api/products/1
- Authorization token

**Response**

```json
{
  "statusCode": 200,
  "data": {
    "id": 1,
    "name": "Tiffany Chair",
    "price": 129.99,
    "category": "Household"
  }
}
```

#### PATCH /api/products/\<id\>

**Description**  
To update a product details given its id.

**Request**

- `<id>` is the id of the product, for example, PATCH /api/products/1
- Authorization token
- Json body

```json
{
  "name": "Chair",
  "price": "450.0",
  "category": "Household"
}
```

**Response**

```json
{
  "statusCode": 200,
  "data": {
    "id": 1,
    "name": "Chair",
    "price": "450.0",
    "category": "Household"
  }
}
```

#### Orders

#### GET /api/orders

**Description**  
To retrieve the list of all orders

**Request**

- Authorization token

**Response**

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "qty": 1,
      "product_id": 1,
      "user_id": 1,
      "is_completed": false,
    },
    {...},
    {...}
  ]
}
```

#### GET /api/orders/\<id\>

**Description**  
To retrieve an order given id

**Request**

- `<id>` is the id of an order, for example GET /api/orders/1
- Authorization token

**Response**

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "qty": 1,
      "product_id": 1,
      "user_id": 1,
      "is_completed": false,
    },
    {...},
    {...}
  ]
}
```

#### POST /api/orders

**Description**  
To create a new order

**Request**

- Authorization token
- json body

```json
{
  "product_id": 1,
  "user_id": 1,
  "qty": 1
}
```

**Response**

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "qty": 1,
      "product_id": 1,
      "user_id": 1,
      "is_completed": false,
    },
    {...},
    {...}
  ]
}
```

## Database Tables

#### products

| Column   | Data Type    |
| -------- | ------------ |
| id       | INTEGER      |
| name     | VARCHAR(50)  |
| price    | REAL         |
| category | VARCHAR(250) |

#### users

| Column     | Data Type    |
| ---------- | ------------ |
| id         | INTEGER      |
| first_name | VARCHAR(50)  |
| last_name  | VARCHAR(50)  |
| password   | VARCHAR(250) |

#### orders

| Column       | Data Type |
| ------------ | --------- |
| id           | INTEGER   |
| product_id   | INTEGER   |
| qty          | INTEGER   |
| user_id      | INTEGER   |
| is_completed | BOOLEAN   |
