import React, { useState } from "react";
import styles from "../../pages/RestaurantList/RestaurantList.module.scss";

interface SearchBarProps {
  onSearch: (word: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleClick = () => {
    onSearch(input);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="検索"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles.searchInput}
      />
      <button onClick={handleClick} className={styles.searchButton}>
        検索
      </button>
    </div>
  );
};
