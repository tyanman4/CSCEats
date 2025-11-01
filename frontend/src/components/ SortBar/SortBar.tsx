import React from "react";
import styles from "../../pages/RestaurantList/RestaurantList.module.scss";

interface SortBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SortBar: React.FC<SortBarProps> = ({ value, onChange }) => {
  return (
    <div className={styles.sortBar}>
      <label className={styles.sortLabel}>並び替え:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.sortSelect}
      >
        <option>人気順</option>
        <option>安い順</option>
        <option>レビュー総数順</option>
        <option>近い順</option>
      </select>
    </div>
  );
};
