import { useState } from "react";
import styles from "./StarRating.module.scss";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export const StarRating = ({ value, onChange }: Props) => {
  const [hover, setHover] = useState(0);

  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            (hover || value) >= star ? styles.activeStar : styles.star
          }
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};
