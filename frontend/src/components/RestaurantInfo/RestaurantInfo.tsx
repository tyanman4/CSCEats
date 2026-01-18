// components/RestaurantInfo/RestaurantInfo.tsx
import styles from "./RestaurantInfo.module.scss";

interface Props {
  address: string;
  budget: string | undefined;
  url?: string;
  description?: string;
}

export const RestaurantInfo: React.FC<Props> = ({
  address,
  budget,
  url,
  description,
}) => {
  return (
    <div className={styles.info}>
      {/* 値が存在する場合のみ表示 */}
      {address?.trim() && <p>住所: {address}</p>}
      {budget?.trim() && <p>平均予算: {budget}</p>}
      {description?.trim() && <p>説明: {description}</p>}
      {url?.trim() && <p>
        {/* noopener / noreferrer: 外部リンクのセキュリティ対策らしい*/}
        <a href={url} target="_blank" rel="noopener noreferrer">公式サイトへ</a>
      </p>}
    </div>
  );
};

