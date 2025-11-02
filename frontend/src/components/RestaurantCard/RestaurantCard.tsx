import React from "react";
import styles from "../../pages/RestaurantList/RestaurantList.module.scss";

interface Restaurant {
  id: number;
  name: string;
  address: string;
  distance: number;
  averageBudget: string;
  description: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onClick,
}) => {
  return (
    <div className={styles.restaurantCard} onClick={onClick}>
      <h5>{restaurant.name}</h5>
      <p>
        {restaurant.address} {restaurant.distance}m
      </p>
      <p>
        {restaurant.averageBudget}円 {restaurant.description}
      </p>
    </div>
  );
};
