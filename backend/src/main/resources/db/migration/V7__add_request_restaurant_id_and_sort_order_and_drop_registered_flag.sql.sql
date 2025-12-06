-- レストラン追加依頼と紐づけるためのカラムを追加
ALTER TABLE photos
ADD COLUMN request_restaurant_id BIGINT;

-- 写真の表示順序用カラム（初期値 0）
ALTER TABLE photos
ADD COLUMN sort_order INTEGER DEFAULT 0;

-- 不要になった registed_flag を削除
ALTER TABLE photos
DROP COLUMN registed_flag;
