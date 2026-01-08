// components/RestaurantReviews/RestaurantReviews.tsx
import { ReviewForm } from "../ReviewForm/ReviewForm";
import styles from "./RestaurantReviews.module.scss";

interface Review {
  reviewId: number;
  rating: number;
  comment: string;
  userName: string;
}

interface Props {
  reviews: Review[];
  restaurantId: string;
  onRefresh: () => Promise<void>;
  onRequireLogin: (callback: () => Promise<void>) => Promise<void>;
}

export const RestaurantReviews: React.FC<Props> = ({
  reviews,
  restaurantId,
  onRefresh,
}) => {
  return (
    <div className={styles.reviews}>
      <ReviewForm restaurantId={restaurantId} onSuccess={onRefresh} />

      {reviews.map((r) => (
        <div key={r.reviewId} className={styles.review}>
          <strong>{r.userName}</strong> {"⭐".repeat(r.rating)}
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
};
