ALTER TABLE users
ADD COLUMN role VARCHAR(64) NOT NULL DEFAULT 'user';

CREATE TABLE restaurants_likes (
  user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  restaurant_id INTEGER NOT NULL REFERENCES restaurants(restaurant_id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, restaurant_id)
);
