// components/RestaurantPhotos/RestaurantPhotos.tsx
import { useState } from "react";
import appApi from "../../api/appApi";
import styles from "./RestaurantPhotos.module.scss";

interface Photo {
  photoId: number;
  url: string;
}

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

interface Props {
  photos: Photo[];
  restaurantId: string;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onRefresh: () => Promise<void>;
  onRequireLogin: (callback: () => Promise<void>) => Promise<void>;
}

export const RestaurantPhotos: React.FC<Props> = ({
  photos,
  restaurantId,
  onSuccess,
  onError,
  onRefresh,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? (photos ? photos.length - 1 : 0) : prevIndex - 1
    );
  };
  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      photos ? (prevIndex === photos.length - 1 ? 0 : prevIndex + 1) : 0
    );
  };

  const uploadPhotos = async () => {
    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));
    setShowModal(false);

    try {
      const res = await appApi.post<ApiResponse<null>>(
        `/restaurants/${restaurantId}/photos`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setFiles([]);
      setErrors({});
      onSuccess(res.data.message);
      await onRefresh();

    } catch (err: any) {
      if (err.response?.status === 400) {
        setErrors(err.response.data.data ?? {});
        onError(err.response.data.message);
      } else {
        onError("写真のアップロードに失敗しました");
      }
    }
  };

  return (
    <>
      <div className={styles.mainPhotoWrapper}>
        <button className={styles.arrowLeft} onClick={handlePrevPhoto}>‹</button>
        {photos.length > 0 ? (
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${photos[currentPhotoIndex].url}`}
            className={styles.mainPhoto}
          />
        ) : (
          <div className={styles.noPhoto}>
            <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/no-image.png`} alt='no image' className={styles.mainPhoto} />
          </div>
        )}

        < button className={styles.arrowRight} onClick={handleNextPhoto}>›</button>
      </div>

      {/* サムネ */}
      <div className={styles.thumbnailRow}>
        {photos.map((photo, index) => (
          <img
            key={photo.photoId}
            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${photo.url}`}
            className={`${styles.thumbnail} ${index === currentPhotoIndex ? styles.activeThumbnail : ''
              }`}
            onClick={() => setCurrentPhotoIndex(index)}
          />
        ))}

        {/* ✅ 追加用プラス枠 */}
        <div
          className={styles.addThumbnail}
          onClick={() => setShowModal(true)}
        >
          ＋
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>写真をアップロード</h3>

            {Object.values(errors).length > 0 && (
              <ul className={styles.errorList}>
                {Object.values(errors).map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            )}

            <input
              type="file"
              multiple
              onChange={(e) =>
                setFiles(Array.from(e.target.files ?? []))
              }
            />

            <div className={styles.modalButtons}>
              <button onClick={() => setShowModal(false)}>キャンセル</button>
              <button disabled={!files.length} onClick={uploadPhotos}>
                送信
              </button>
            </div>
          </div>
        </div>
      )
      }
    </>
  );
};
