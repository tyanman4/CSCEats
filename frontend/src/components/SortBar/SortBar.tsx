import React from "react";
import styles from "../../pages/RestaurantList/RestaurantList.module.scss";

interface SortBarProps {
  selectedOptions: string[]; // 複数選択
  onChange: (values: string[]) => void;
}

const SORT_OPTIONS = ["人気順", "安い順", "レビュー総数順", "近い順"];

export const SortBar: React.FC<SortBarProps> = ({ selectedOptions,onChange }) => {
  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      onChange(selectedOptions.filter((v) => v !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  const displayOrder = [
    ...selectedOptions,
    ...SORT_OPTIONS.filter((o) => !selectedOptions.includes(o)),
  ]

  return (
    <div className={styles.sortBar}>
      <div className={styles.sortButtons}>
        {displayOrder.map((option) => (
          <button
            key={option}
            type="button"
            className={`${styles.sortButton} ${
              selectedOptions.includes(option) ? styles.active : ""
            }`}
            onClick={() => toggleOption(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
