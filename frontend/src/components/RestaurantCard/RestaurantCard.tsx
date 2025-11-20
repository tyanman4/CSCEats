import React from "react";
import styles from "../../pages/RestaurantList/RestaurantList.module.scss";

interface RestaurantCardProps {
  restaurant: {
    id: number;
    name: string;
    address: string;
    distance: number;
    averageBudget: string;
    description: string;
    averageRating?: number;
    reviewCount?: number;
    categories?: { categoryId: number; name: string }[];
  };
  onClick: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onClick,
}) => {
  return (
    <div className={styles.restaurantCard} onClick={onClick}>
      <h5>{restaurant.name}</h5>

      <p className={styles.address}>
        📍 {restaurant.address}（{restaurant.distance}m）
      </p>

      <p className={styles.budget}>
        💰 予算: {restaurant.averageBudget}
      </p>

      {restaurant.averageRating !== undefined && (
        <p className={styles.review}>
          ⭐ {restaurant.averageRating.toFixed(1)}（{restaurant.reviewCount}件）
        </p>
      )}

      {restaurant.categories && restaurant.categories.length > 0 && (
        <p className={styles.categories}>
          🏷️{" "}
          {restaurant.categories.map((c) => (
            <span key={c.categoryId} className={styles.categoryTag}>
              #{c.name}
            </span>
          ))}
        </p>
      )}

      <p className={styles.description}>{restaurant.description}</p>
    </div>
  );
};
