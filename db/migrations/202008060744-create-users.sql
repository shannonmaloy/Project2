CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255),
  password_digest TEXT
);

ALTER TABLE restaurants ADD COLUMN user_id INTEGER REFERENCES users(id);
