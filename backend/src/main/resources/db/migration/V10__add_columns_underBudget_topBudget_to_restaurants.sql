ALTER TABLE restaurants
ADD COLUMN under_budget INTEGER,
ADD COLUMN top_budget INTEGER,

DROP COLUMN average_budget;