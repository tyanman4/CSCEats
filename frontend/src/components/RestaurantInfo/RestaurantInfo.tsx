// components/RestaurantInfo/RestaurantInfo.tsx
import styles from "./RestaurantInfo.module.scss";

interface Props {
  address: string;
  budget: string;
  url: string;
  description: string;
}

export const RestaurantInfo: React.FC<Props> = ({
  address,
  budget,
  url,
  description,
}) => {
  return (
    <div className={styles.info}>
      <p>住所: {address}</p>
      <p>平均予算: {budget}</p>
      <p>
        公式サイト:
        <a href={url} target="_blank" rel="noreferrer">
          {url}
        </a>
      </p>
      <p>説明: {description}</p>
    </div>
  );
};

