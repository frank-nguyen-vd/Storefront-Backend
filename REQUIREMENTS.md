# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show (args: product id)
- Create (args: Product)[token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show (args: id)[token required]
- Create (args: User)

#### Orders
- Index 
- Show (args: order id)
- Create (args: Order)[token required]
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
- id: integer
- name: VARCHAR(64)
- price: integer
- [OPTIONAL] category: VARCHAR(64)

#### User
- id: integer
- firstName: VARCHAR(100)
- lastName: VARCHAR(100)
- username: VARCHAR(100)
- password: VARCHAR

#### Orders
- id: integer
- user_id: biginteger
- status of order (active or complete): VARCHAR(15)

#### Order_Products
- id: integer
- quantity of each product in the order: integer
- user_id: biginteger
- id of each product in the order: biginteger