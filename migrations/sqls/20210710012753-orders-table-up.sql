CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    qty INTEGER,
    is_completed BOOLEAN,
    product_id INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
)