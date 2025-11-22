ALTER TABLE request_restaurants
  ADD COLUMN address VARCHAR(256),
  ADD COLUMN status VARCHAR(32) NOT NULL DEFAULT 'pending',
  ADD COLUMN approved_restaurant_id INTEGER REFERENCES restaurants(restaurant_id) ON DELETE SET NULL,
  ADD COLUMN admin_user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
  ADD COLUMN reject_reason TEXT,
  ADD COLUMN updated_at TIMESTAMP DEFAULT now();