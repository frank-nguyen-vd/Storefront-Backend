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

- Index [token required]
- Show [token required]
- Create N[token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

| Column   | Data Type    |
| -------- | ------------ |
| id       | INTEGER      |
| name     | VARCHAR(50)  |
| price    | REAL         |
| category | VARCHAR(250) |

#### User

| Column     | Data Type    |
| ---------- | ------------ |
| id         | INTEGER      |
| first_name | VARCHAR(50)  |
| last_name  | VARCHAR(50)  |
| password   | VARCHAR(250) |

#### Order

| Column       | Data Type |
| ------------ | --------- |
| id           | INTEGER   |
| product_id   | INTEGER   |
| qty          | INTEGER   |
| user_id      | INTEGER   |
| is_completed | BOOLEAN   |
