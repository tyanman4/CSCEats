import styles from "./RestaurantHeader.module.scss";

interface Props {
  name: string;
  isFavorite: boolean;
  onToggleFavorite: () => Promise<void>;
  onRequireLogin: (callback: () => Promise<void>) => Promise<void>;
}

export const RestaurantHeader: React.FC<Props> = ({
  name,
  isFavorite,
  onToggleFavorite,
  onRequireLogin,
}) => {
  const handleToggleFavorite = () => {
    onRequireLogin(onToggleFavorite);
  };
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{name}</h1>

      <button
        className={isFavorite ? styles.favorite : styles.notFavorite}
        onClick={handleToggleFavorite}
      >
        {isFavorite ? "★ お気に入り中" : "☆ お気に入り登録"}
      </button>
    </div>
  );
};
