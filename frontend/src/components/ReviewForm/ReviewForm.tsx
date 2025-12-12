import { useState } from "react";
import { StarRating } from "../StarRating/StarRating";
import styles from "./ReviewForm.module.scss";
import appApi from "../../api/appApi";

export const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    if (isSending) return;
    if (rating === 0 || comment.length === 0) {
      setMessage("評価とコメントは必須です");
      return;
    }
    try {
      setIsSending(true);
      const res = await appApi.post("/reviews", {
        rating,
        comment,
      });
      if (res.status === 200) {
        setMessage("レビューが投稿されました");
        setRating(0);
        setComment("");
      } else {
        setMessage("レビューの投稿に失敗しました");
      }

    } catch (error) {
      setMessage("サーバーエラーが発生しました");
    } finally {
      setIsSending(false);
    }
  };

  return (
    // <div className={styles.reviewFormCard}>
    //         <h2 className={styles.sectionTitle}>レビューを投稿する</h2>

    //         <label>レビュー内容</label>
    //         <textarea placeholder="ここにレビューを書いてください" />

    //         <label>評価（1〜5）</label>
    //         <select>
    //           {[1, 2, 3, 4, 5].map((v) => (
    //             <option key={v}>{v}</option>
    //           ))}
    //         </select>

    //         <button className={styles.submitButton}>投稿する</button>
    //       </div>
    <div className={styles.reviewFormCard}>
      <h2 className={styles.sectionTitle}>レビューを投稿する</h2>

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
        disabled={rating === 0 || comment.length === 0}
        onClick={handleSubmit}
      >
        投稿する
      </button>
    </div>
  );
};
