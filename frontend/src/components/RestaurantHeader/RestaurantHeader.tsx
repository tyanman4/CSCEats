// components/RestaurantHeader/RestaurantHeader.tsx
import styles from "./RestaurantHeader.module.scss";

interface Props {
  name: string;
  isFavorite: boolean;
  onToggleFavorite: () => Promise<void>;
}

export const RestaurantHeader: React.FC<Props> = ({
  name,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{name}</h1>

      <button
        className={isFavorite ? styles.favorite : styles.notFavorite}
        onClick={onToggleFavorite}
      >
        {isFavorite ? "★ お気に入り中" : "☆ お気に入り登録"}
      </button>
    </div>
  );
};
