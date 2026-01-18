// components/RestaurantCategories/RestaurantCategories.tsx
import { useState } from "react";
import appApi from "../../api/appApi";
import styles from "./RestaurantCategories.module.scss";

interface Category {
  categoryId: number;
  name: string;
}

interface Props {
  categories: Category[];
  restaurantId: string;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onRefresh: () => Promise<void>;
  onRequireLogin: (callback: () => Promise<void>) => Promise<void>;
}

export const RestaurantCategories: React.FC<Props> = ({
  categories,
  restaurantId,

  onRefresh,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addCategories = async () => {
    await appApi.post(`/${restaurantId}/categories`, {
      categories: selected,
    });

    setSelected([]);
    setShowModal(false);
    await onRefresh();
  };

  const removeCategory = (index: number) => {
    setSelected(selected.filter((_, i) => i !== index));
  };


  return (
    <>
      <div className={styles.tags}>
        {categories.map((c) => (
          <span key={c.categoryId} className={styles.tag}>
            {c.name}
          </span>
        ))}
        <button className={styles.addTag} onClick={() => setShowModal(true)}>＋ カテゴリーを追加</button>
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.inputRow}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="カテゴリー名を入力"
              />
              <button
                onClick={() => {
                  if (input) {
                    setSelected([...selected, input]);
                    setInput("");
                  }
                }}
              >
                追加
              </button>
            </div>

            <div className={styles.preview}>
              {selected.map((c, i) => (
                <span key={i} className={styles.previewTag}>
                  # {c}
                  <button
                    className={styles.remove}
                    onClick={() => removeCategory(i)}
                    aria-label="remove category"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>


            <div className={styles.modalButtons}>
              <button
                className={styles.cancel}
                onClick={() => setShowModal(false)}
              >
                キャンセル
              </button>
              <button
                className={styles.submit}
                onClick={addCategories}
                disabled={selected.length === 0}
              >
                登録
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};
