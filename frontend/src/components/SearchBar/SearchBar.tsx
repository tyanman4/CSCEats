import React, { useState } from "react";
import styles from "../../pages/RestaurantList/RestaurantList.module.scss";

interface Category {
  categoryId: number;
  name: string;
  usageCount?: number;
}

interface SearchBarProps {
  onSearch: (word: string) => void;
  categories: Category[];
}


export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  categories
}) => {
  const [input, setInput] = useState("");

  const selectedCategories = input.split(/\s+/).filter((word) => word.startsWith("#")).map((word) => word.substring(1));

  const handleClick = () => {
    onSearch(input);
  };

  const handleCategoryClick = (catName: string) => {
    const tag = `#${catName}`;

    // 現在 input に入っているタグ一覧
    const words = input.split(/\s+/).filter(Boolean);

    let newWords;

    if (words.includes(tag)) {
      // すでに選択 → 解除
      newWords = words.filter(w => w !== tag);
    } else {
      // 未選択 → 追加
      newWords = [...words, tag];
    }

    const newInput = newWords.join(" ");
    setInput(newInput);
    onSearch(newInput);
  };



  return (
    <div className={styles.searchBar}>
      <div className={styles.inputArea}>
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
      <div className={styles.categoryScroll}>
        {categories.map((cat) => {
          const isSelected = selectedCategories.includes(cat.name);

          return (
            <button
              key={cat.categoryId}
              className={
                isSelected
                  ? `${styles.categoryButton} ${styles.selected}`
                  : styles.categoryButton
              }
              onClick={() => handleCategoryClick(cat.name)}
            >
              {cat.name}
            </button>
          )

        })}
      </div>
    </div>
  );
};
