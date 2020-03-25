CREATE TABLE helo_users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password TEXT NOT NULL

);

CREATE TABLE helo_posts(
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES helo_users(user_id),
    content TEXT,
    post_image TEXT
);