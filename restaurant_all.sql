-- ================================
--  Categories
-- ================================
INSERT INTO categories (name)
VALUES
('ラーメン'), ('カフェ'), ('焼肉'), ('寿司'), ('カレー'),
('イタリアン'), ('定食'), ('バー'), ('焼鳥'), ('ベーカリー'),
('居酒屋'), ('中華'), ('韓国料理'), ('フレンチ'), ('スイーツ'),
('うどん'), ('そば'), ('ピザ'), ('ファミレス'), ('ハンバーガー');

-- ================================
--  Users
-- ================================
INSERT INTO users (name, password, introduction, created_at, updated_at)
VALUES
('佐藤 太郎', 'password123', 'ラーメン巡りが趣味の会社員です。', now(), now()),
('鈴木 花子', 'hanako2024', 'カフェでのんびり過ごすのが好きです。', now(), now()),
('高橋 健', 'takahashi_pass', '焼肉と日本酒が大好きです。', now(), now()),
('田中 美咲', 'misaki_pw', 'レビュー投稿初心者です！', now(), now()),
('伊藤 陽介', 'yousuke_it', '高田馬場周辺のご飯屋を開拓中。', now(), now()),
('渡辺 彩', 'aya_secure', 'スイーツが大好きなOLです。', now(), now()),
('中村 翔', 'sho_nkmr', '飲み歩きが趣味のフリーランスです。', now(), now()),
('小林 優', 'kobayashi_yu', '学生です。安くて美味しいお店を探してます。', now(), now()),
('加藤 愛', 'ai_kato', 'ランチメインで投稿してます。', now(), now()),
('山本 拓', 'takuyamamoto', 'バーや居酒屋のレビュー多め。', now(), now());

-- ================================
--  Restaurants
-- ================================
INSERT INTO restaurants
(name, address, distance, url, average_budget, description, image_url, created_at, updated_at, latitude, longitude)
VALUES
('ラーメン馬場家', '東京都新宿区高田馬場1-26-5', 120, 'https://ramen-babaya.example.com', '0 ~ 1000', '濃厚豚骨スープが自慢のラーメン店。', 'https://example.com/images/ramen1.jpg', now(), now(), 35.7128, 139.7032),
('カフェ・ミルキーウェイ', '東京都新宿区高田馬場2-14-9', 250, 'https://milkyway-cafe.example.com', '0 ~ 1000', '学生に人気の落ち着いたカフェ。', 'https://example.com/images/cafe1.jpg', now(), now(), 35.7134, 139.7041),
('焼肉たかだ', '東京都新宿区高田馬場3-2-2', 320, 'https://yakiniku-takada.example.com', '1000 ~ 2000', '国産牛をリーズナブルに楽しめる焼肉店。', 'https://example.com/images/yakiniku1.jpg', now(), now(), 35.7139, 139.7029),
('寿司・華', '東京都新宿区高田馬場1-33-15', 180, 'https://sushi-hana.example.com', '2000 ~ 3000', '旬のネタを使った本格江戸前寿司。', 'https://example.com/images/sushi1.jpg', now(), now(), 35.7121, 139.7043),
('カレー工房ババ', '東京都新宿区高田馬場2-8-6', 210, 'https://curry-baba.example.com', '0 ~ 1000', 'スパイスの香りが広がるインド風カレー。', 'https://example.com/images/curry1.jpg', now(), now(), 35.7130, 139.7027),
('パスタ屋リコ', '東京都新宿区高田馬場1-24-7', 160, 'https://pasta-rico.example.com', '4000 ~ 5000', '自家製ソースと生パスタが自慢。', 'https://example.com/images/pasta1.jpg', now(), now(), 35.7125, 139.7040),
('高田馬場食堂', '東京都新宿区高田馬場2-18-11', 200, 'https://takadanobaba-shokudo.example.com', '0 ~ 1000', '昔ながらの定食を味わえる学生街の食堂。', 'https://example.com/images/shokudo1.jpg', now(), now(), 35.7132, 139.7038),
('BAR BABA BASE', '東京都新宿区高田馬場3-12-1', 300, 'https://bar-baba-base.example.com', '1000 ~ 2000', 'おしゃれな隠れ家的バー。カクテルが人気。', 'https://example.com/images/bar1.jpg', now(), now(), 35.7141, 139.7036),
('焼鳥とりまる', '東京都新宿区高田馬場1-29-3', 230, 'https://yakitori-torimaru.example.com', '4000 ~ 3000', '備長炭で焼く絶品の焼鳥を提供。', 'https://example.com/images/yakitori1.jpg', now(), now(), 35.7129, 139.7039),
('ベーカリー馬場パン', '東京都新宿区高田馬場2-10-8', 150, 'https://babapan.example.com', '0 ~ 1000', '朝から焼き立てパンが楽しめる人気店。', 'https://example.com/images/bakery1.jpg', now(), now(), 35.7131, 139.7033),
('イタリアン・ポンテ', '東京都新宿区高田馬場2-19-10', 270, 'https://italian-ponte.example.com', '2000 ~ 3000', '本格イタリアンとワインが楽しめる隠れ家的レストラン。', 'https://example.com/images/italian1.jpg', now(), now(), 35.7135, 139.7050),
('とんかつ武蔵', '東京都新宿区高田馬場1-12-9', 190, 'https://tonkatsu-musashi.example.com', '1000 ~ 2000', 'サクサク衣のとんかつが名物。ランチが人気。', 'https://example.com/images/tonkatsu1.jpg', now(), now(), 35.7124, 139.7042),
('餃子の福龍', '東京都新宿区高田馬場2-15-12', 230, 'https://gyoza-fukuryu.example.com', '0 ~ 1000', '手作り餃子と炒飯が人気の中華食堂。', 'https://example.com/images/gyoza1.jpg', now(), now(), 35.7138, 139.7049),
('カフェ・ルミエール', '東京都新宿区高田馬場3-4-15', 340, 'https://cafe-lumiere.example.com', '1000 ~ 2000', '静かな雰囲気のカフェで勉強にも最適。', 'https://example.com/images/cafe2.jpg', now(), now(), 35.7139, 139.7057),
('バババーガー', '東京都新宿区高田馬場2-11-3', 210, 'https://bababurger.example.com', '1000 ~ 2000', 'ジューシーなパティが自慢のハンバーガー専門店。', 'https://example.com/images/burger1.jpg', now(), now(), 35.7133, 139.7044),
('天ぷら匠', '東京都新宿区高田馬場1-30-6', 260, 'https://tempura-takumi.example.com', '2000 ~ 3000', '旬の素材を使った天ぷら専門店。カウンター席のみ。', 'https://example.com/images/tempura1.jpg', now(), now(), 35.7129, 139.7052),
('ビストロ・パリ馬場', '東京都新宿区高田馬場2-7-8', 380, 'https://bistro-paribaba.example.com', '3000 ~ 4000', 'フレンチとワインが楽しめるカジュアルビストロ。', 'https://example.com/images/bistro1.jpg', now(), now(), 35.7137, 139.7060),
('焼きとん山田屋', '東京都新宿区高田馬場3-6-4', 420, 'https://yakiton-yamadaya.example.com', '1000 ~ 2000', '昭和レトロな雰囲気の大衆居酒屋。', 'https://example.com/images/yakiton1.jpg', now(), now(), 35.7141, 139.7063),
('そば処みずき', '東京都新宿区高田馬場1-20-11', 180, 'https://sobadokoro-mizuki.example.com', '1000 ~ 2000', '香り高い手打ちそばが評判の老舗。', 'https://example.com/images/soba1.jpg', now(), now(), 35.7122, 139.7035),
('ベトナム食堂フォーババ', '東京都新宿区高田馬場2-9-9', 260, 'https://pho-baba.example.com', '1000 ~ 2000', '本場ベトナムのフォーと生春巻きを提供。', 'https://example.com/images/pho1.jpg', now(), now(), 35.7134, 139.7048),
('バー・ナイトクローバー', '東京都新宿区高田馬場3-10-5', 480, 'https://bar-nightclover.example.com', '3000 ~ 4000', 'ジャズが流れる大人のバー。ウイスキーの種類が豊富。', 'https://example.com/images/bar2.jpg', now(), now(), 35.7142, 139.7069);

-- ================================
--  Restaurant Categories
-- ================================
INSERT INTO restaurant_categories (restaurant_id, category_id)
VALUES
(1, 1), (1, 11), (1, 12),
(2, 2), (2, 15), (2, 20),
(3, 3), (3, 11), (3, 13),
(4, 4), (4, 14), (4, 11),
(5, 5), (5, 12), (5, 6),
(6, 6), (6, 18), (6, 15),
(7, 7), (7, 16), (7, 17), (7, 19),
(8, 8), (8, 11), (8, 15),
(9, 9), (9, 11), (9, 12),
(10, 10), (10, 2), (10, 15), (10, 19);

-- ================================
--  Reviews
-- ================================
INSERT INTO reviews (restaurant_id, user_id, rating, comment, created_at, updated_at)
VALUES
(1, 1, 5, 'スープが濃厚でおいしい！', now(), now()),
(1, 2, 4, 'チャーシューが絶品。', now(), now()),
(1, 3, 3, '少し味が濃いけど満足。', now(), now()),

(2, 1, 4, '静かで作業しやすい雰囲気。', now(), now()),
(2, 4, 5, 'コーヒーが美味しかった！', now(), now()),

(3, 2, 5, 'コスパが最高！', now(), now()),
(3, 3, 4, 'お肉が柔らかい。', now(), now()),
(3, 5, 5, '接客が丁寧でした。', now(), now()),

(4, 1, 4, 'ネタが新鮮で美味しい。', now(), now()),
(4, 3, 5, '雰囲気も良かった。', now(), now()),

(5, 2, 3, 'スパイスが効いてていい。', now(), now()),
(5, 4, 4, 'ボリュームたっぷり。', now(), now()),
(5, 5, 2, '少し辛すぎた。', now(), now()),

(6, 1, 5, 'モチモチのパスタが最高！', now(), now()),
(6, 3, 4, 'ソースの味が本格的。', now(), now()),

(7, 2, 3, '懐かしい味の定食。', now(), now()),
(7, 4, 4, 'リーズナブルでうまい。', now(), now()),

(8, 1, 5, '雰囲気が最高。デートに良い。', now(), now()),
(8, 5, 4, 'カクテルが美味しい。', now(), now()),

(9, 3, 5, '炭火焼きの香ばしさが最高。', now(), now()),
(9, 4, 4, 'お酒に合う焼鳥。', now(), now()),
(9, 5, 5, '再訪したい。', now(), now()),

(10, 1, 4, 'クロワッサンがサクサク。', now(), now()),
(10, 2, 5, '朝にぴったりのパン屋さん。', now(), now());
