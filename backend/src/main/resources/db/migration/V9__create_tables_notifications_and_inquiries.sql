-- 問い合わせと通知機能機能のためのテーブル作成
-- 問い合わせ機能に使用するテーブルの作成
CREATE TABLE inquiries (
    inquiry_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(user_id),
    subject VARCHAR(255),
    message TEXT,
    answer TEXT,
    admin_user_id BIGINT REFERENCES users(user_id),
    status VARCHAR(50) DEFAULT 'open', -- open / in_progress / closed
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 通知機能に使用するテーブルの作成
CREATE TABLE notifications (
    notification_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(user_id),
    
    -- 文章の作成に用いるカラム
    type VARCHAR(100) NOT NULL, 
        -- 例: request_approved, request_rejected, photo_approved, photo_rejected, info
    related_id BIGINT,  -- 関連ID（リクエストID, レストランID, 写真ID など汎用用途）
    
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    read_flag BOOLEAN NOT NULL DEFAULT FALSE
);
