import React from "react";
import styles from "../../pages/RestaurantList/RestaurantList.module.scss";

interface PaginationProps {
  page: number;
  totalPages: number;
  onClickPrev: () => void;
  onClickNext: () => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onClickPrev,
  onClickNext,
}) => {
  if(totalPages === 0) {
    return (
      <p className={styles.noResult}>該当するレストランが見つかりませんでした。</p>
    )
  }

  return (
    <>
      <button
        className={styles.paginationButton}
        disabled={page === 1}
        onClick={onClickPrev}
      >
        ← Prev
      </button>
      <p>{page} / {totalPages}</p>
      <button
        className={styles.paginationButton}
        disabled={page >= totalPages}
        onClick={onClickNext}
      >
        Next →
      </button>
    </>
  )
};