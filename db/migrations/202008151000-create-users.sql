CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255),
  password_digest TEXT,
  fullname VARCHAR(255),
  streetaddress VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  zip_code INTEGER
);

