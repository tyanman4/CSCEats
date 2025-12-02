-- 写真承認制のための status と reject_reason カラム追加
ALTER TABLE photos
  ADD COLUMN status VARCHAR(35) NOT NULL DEFAULT 'PENDING',
  ADD COLUMN reject_reason TEXT;