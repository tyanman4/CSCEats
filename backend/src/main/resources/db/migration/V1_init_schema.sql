-- ユーザーテーブル
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    password VARCHAR(1024) NOT NULL,
    introduction TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- カテゴリーテーブル
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(128),
    created_at TIMESTAMP DEFAULT now()
);

-- レストランテーブル
CREATE TABLE restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    name VARCHAR(64),
    address VARCHAR(256),
    distance INTEGER,
    url VARCHAR(256),
    average_budget VARCHAR(64),
    description TEXT,
    image_url VARCHAR(256),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- レビュー
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    restaurant_id INTEGER NOT NULL REFERENCES restaurants(restaurant_id),
    user_id INTEGER REFERENCES users(user_id),
    rating INTEGER,
    comment TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- 写真
CREATE TABLE photos (
    photo_id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES restaurants(restaurant_id),
    user_id INTEGER REFERENCES users(user_id),
    url VARCHAR(256),
    registed_flag BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- レストラン×カテゴリー中間テーブル
CREATE TABLE restaurant_categories (
    restaurant_id INTEGER NOT NULL REFERENCES restaurants(restaurant_id),
    category_id INTEGER NOT NULL REFERENCES categories(category_id),
    PRIMARY KEY (restaurant_id, category_id)
);

-- 店舗追加リクエスト
CREATE TABLE request_restaurants (
    request_restaurant_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    name VARCHAR(64),
    url VARCHAR(256),
    created_at TIMESTAMP DEFAULT now()
);