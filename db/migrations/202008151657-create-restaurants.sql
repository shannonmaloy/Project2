CREATE TABLE IF NOT EXISTS restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  yelp_alias VARCHAR(255),
  img_url VARCHAR(255),
  address VARCHAR(255),
  website VARCHAR(255))