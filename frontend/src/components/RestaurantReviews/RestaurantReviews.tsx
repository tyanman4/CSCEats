// components/RestaurantReviews/RestaurantReviews.tsx
import { ReviewForm } from "../ReviewForm/ReviewForm";
import styles from "./RestaurantReviews.module.scss";
import { useNavigate } from 'react-router-dom';



interface Review {
  reviewId: number;
  rating: number;
  comment: string;
  userId: number;
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
  const navigate = useNavigate()
  return (
    <div className={styles.reviews}>
      <ReviewForm restaurantId={restaurantId} onSuccess={onRefresh} />

      {reviews.map((r) => (
        <div key={r.reviewId} className={styles.review}>
          <p className={styles.reviewer} onClick={() => { navigate(`/user-detail/${r.userId}`) }}>{r.userName} &nbsp; {'⭐'.repeat(r.rating)}</p>
          <p className={styles.comment}>{r.comment}</p>
        </div>
      ))}
    </div>
  );
};
