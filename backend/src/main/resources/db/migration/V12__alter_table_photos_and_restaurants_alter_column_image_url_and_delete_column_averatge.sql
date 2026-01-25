ALTER TABLE photos
ALTER COLUMN url TYPE TEXT;

ALTER TABLE restaurants
ALTER COLUMN image_url TYPE TEXT;

ALTER TABLE restaurants
DROP COLUMN average_budget;