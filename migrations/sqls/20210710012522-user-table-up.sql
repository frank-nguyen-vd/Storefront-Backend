CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(250),
    last_name VARCHAR(250),
    username VARCHAR(250),
    password VARCHAR(250)
);