CREATE TABLE IF NOT EXISTS user_restaurants (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  restaurant_id INTEGER REFERENCES restaurants(id),
  notes VARCHAR(255),
  )
