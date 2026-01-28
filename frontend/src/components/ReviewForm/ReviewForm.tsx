import { useState } from "react";
import { StarRating } from "../StarRating/StarRating";
import styles from "./ReviewForm.module.scss";
import appApi from "../../api/appApi";
import { useAuth } from "../../contexts/AuthContext";

interface Props {
  restaurantId: string;
  onSuccess: () => Promise<void>;
}

export const ReviewForm: React.FC<Props> = ({
  restaurantId,
  onSuccess,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const handleSubmit = async () => {
    if (isSending) return;

    // フロントバリデーション
    if (rating === 0 || comment.trim().length === 0) {
      setErrorMessage("評価とコメントは必須です");
      return;
    }

    try {
      setIsSending(true);
      setErrorMessage(null);

      await appApi.post(
        `/${restaurantId}/reviews`,
        {
          restaurantId,
          rating,
          comment,
        }
      );

      // 入力リセット
      setRating(0);
      setComment("");

      // 親に通知（再取得・成功メッセージは親の責務）
      await onSuccess();

    } catch (err: any) {
      if (err.response?.status === 400) {
        // ApiResponseDto の message をそのまま使う
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("レビューの投稿に失敗しました");
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={styles.reviewFormCard}>
      <h2 className={styles.sectionTitle}>レビューを投稿する</h2>

      {errorMessage && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}

      <label>評価</label>
      <StarRating value={rating} onChange={setRating} />

      <label>コメント</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="レビュー内容を入力してください"
      />

      <button
        className={styles.submitButton}
        disabled={isSending || !isAuthenticated}
        onClick={handleSubmit}
      >
        {!isAuthenticated
          ? "ログインしてください"
          : isSending
            ? "送信中..."
            : "投稿する"}
      </button>
    </div>
  );
};
