import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import appApi from '../../api/appApi';
import styles from './RestaurantDetail.module.scss';
import { ReviewForm } from '../../components/ReviewForm/ReviewForm';

interface Category {
  categoryId: number;
  name: string;
  usageCount?: number;
}

interface Restaurant {
  RestaurantId: number;
  name: string;
  address: string;
  url: string;
  averageBudget: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  latitude: number;
  longitude: number;
  averageRating: number;
  reviewCount: number;
}

interface Photo {
  photoId: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

interface Review {
  reviewId: number;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
}

interface RestaurantDetailResponse {
  restaurant: Restaurant;
  photos: Photo[];
  reviews: Review[];
  categories: Category[];
  favorite: boolean;
}

export const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurantDetail, setRestaurantDetail] = useState<RestaurantDetailResponse | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  const MAX_PHOTO_COUNT = 5;

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await appApi.delete(`/restaurants/${id}/likes`);
        setIsFavorite(false);
      } else {
        await appApi.post(`/restaurants/${id}/likes`);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('お気に入りの更新に失敗しました', error);
    }
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? (restaurantDetail ? restaurantDetail.photos.length - 1 : 0) : prevIndex - 1
    );
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      restaurantDetail && prevIndex === restaurantDetail.photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const validatePhotoFiles = (files: File[]): boolean => {
    if (files.length === 0) return false;

    // ✅ アップロード枚数制限（ここが今回の要件の本体）
    if (files.length > MAX_PHOTO_COUNT) {
      alert(`一度にアップロードできる写真は最大${MAX_PHOTO_COUNT}枚までです`);
      return false;
    }

    for (const file of files) {
      // ✅ 種類チェック
      if (!ALLOWED_TYPES.includes(file.type)) {
        alert('jpg / png / webp 形式のみアップロードできます。');
        return false;
      }

      // ✅ サイズチェック
      if (file.size > MAX_FILE_SIZE) {
        alert('ファイルサイズは5MB以内にしてください。');
        return false;
      }
    }

    return true;
  };

  const uploadPhotos = async () => {
    if (!selectedFiles.length || !id) return;

    const isValid = validatePhotoFiles(selectedFiles);
    if (!isValid) return;

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('files', file); // ✅ 複数枚
    });

    try {
      await appApi.post(
        `/restaurants/${id}/photos`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setShowUploadModal(false);
      setSelectedFiles([]);

      // ✅ 再取得
      const res = await appApi.get<RestaurantDetailResponse>(`/restaurants/${id}`);
      setRestaurantDetail(res.data);

    } catch (error) {
      console.error('写真アップロード失敗', error);
      alert('写真のアップロードに失敗しました');
    }
  };

  useEffect(() => {
    const fetchRestaurantDetail = async () => {
      try {
        const res = await appApi.get<RestaurantDetailResponse>(`/restaurants/${id}`);
        setRestaurantDetail(res.data);
        setIsFavorite(res.data.favorite);
      } catch (error) {
        console.error('Error fetching restaurant detail:', error);
      }
    };

    fetchRestaurantDetail();
  }, [id]);

  if (!restaurantDetail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        {/* 左カラム：店舗情報 */}
        <div className={styles.leftColumn}>

          <h1 className={styles.title}>{restaurantDetail.restaurant.name}</h1>
          <button
            className={isFavorite ? styles.favorite : styles.notFavorite}
            onClick={toggleFavorite}
          >
            {isFavorite ? '★ お気に入り中' : '☆ お気に入り登録'}
          </button>

          <div className={styles.categoryContainer}>
            {restaurantDetail.categories.map((category) => (
              <p key={category.categoryId} className={styles.categoryTag}>
                {category.name}
              </p>
            ))}
            <button
              className={styles.addCategoryButton}
              onClick={() => setShowCategoryModal(true)}
            >
              カテゴリーを追加
            </button>
          </div>
          <button
            className={styles.addPhotoButton}
            onClick={() => setShowUploadModal(true)}
          >
            写真を追加する
          </button>
          <div className={styles.photoGallery}>
            {/* メイン画像 */}

            <div className={styles.mainPhotoWrapper}>
              <button className={styles.arrowLeft} onClick={handlePrevPhoto}>‹</button>

              {restaurantDetail.photos.length > 0 ? (
                <img
                  src={`http://localhost:8080${restaurantDetail.photos[currentPhotoIndex].url}`}
                  className={styles.mainPhoto}
                />
              ) : (
                <div className={styles.noPhoto}>
                  <img src='http://localhost:8080/uploads/no-image.png' alt='no image' className={styles.mainPhoto} />
                </div>
              )}

              < button className={styles.arrowRight} onClick={handleNextPhoto}>›</button>
            </div>

            {/* サムネ */}
            <div className={styles.thumbnailRow}>
              {restaurantDetail.photos.map((photo, index) => (
                <img
                  key={photo.photoId}
                  src={`http://localhost:8080${photo.url}`}
                  className={`${styles.thumbnail} ${index === currentPhotoIndex ? styles.activeThumbnail : ''
                    }`}
                  onClick={() => setCurrentPhotoIndex(index)}
                />
              ))}

              {/* ✅ 追加用プラス枠 */}
              <div
                className={styles.addThumbnail}
                onClick={() => setShowUploadModal(true)}
              >
                ＋
              </div>
            </div>
          </div>

          <h2 className={styles.sectionTitle}>基本情報</h2>
          <ul className={styles.infoList}>
            <li>住所: {restaurantDetail.restaurant.address}</li>
            <li>平均予算: {restaurantDetail.restaurant.averageBudget}</li>
            <li>公式サイト: <a href={restaurantDetail.restaurant.url} target="_blank" rel="noopener noreferrer">{restaurantDetail.restaurant.url}</a></li>
          </ul>

          <h2 className={styles.sectionTitle}>説明</h2>
          <p className={styles.description}>
            {restaurantDetail.restaurant.description}
          </p>
        </div>


        {/* 右カラム：レビュー */}
        <div className={styles.rightColumn}>
          <ReviewForm />

          <h2 className={styles.sectionTitle}>レビュー一覧</h2>

          {restaurantDetail.reviews.map((review) => (
            <div key={review.reviewId} className={styles.reviewCard}>
              <p className={styles.reviewer}>{review.userName} {'⭐'.repeat(review.rating)}</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div >
      {showUploadModal && (
        <div className={styles.modalOverlay} onClick={() => setShowUploadModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} >
            <h2>写真を追加</h2>

            <p className={styles.modalNote}>
              ※ 不適切な画像の投稿は禁止されています。
            </p>

            {/* ✅ ファイル選択UI */}
            <div className={styles.fileSelectArea}>
              <label className={styles.fakeFileButton}>
                画像を選択
                <input
                  type="file"
                  accept="image/*"
                  multiple   // ✅ 複数選択
                  hidden
                  onChange={(e) => {
                    const files = Array.from(e.target.files ?? []);
                    if (files.length === 0) return;

                    const isValid = validatePhotoFiles(files);
                    if (!isValid) return;

                    setSelectedFiles(files);
                  }}

                />
              </label>

              <span className={styles.fileName}>
                {selectedFiles.length > 0
                  ? selectedFiles.map(f => f.name).join(', ')
                  : '選択されていません'}
              </span>
            </div>

            <div className={styles.modalButtons}>
              <button onClick={() => setShowUploadModal(false)}>
                キャンセル
              </button>

              <button
                disabled={!selectedFiles.length}
                onClick={uploadPhotos}
              >
                送信
              </button>

            </div>
          </div>
        </div>
      )
      }


      {showCategoryModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCategoryModal(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>カテゴリーを追加</h2>

            <p className={styles.modalNote}>
              ※ 複数のカテゴリーをまとめて登録できます。
            </p>

            <div className={styles.categoryInputRow}>
              <input
                type="text"
                placeholder="例：ラーメン、カフェ"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />

              <button
                onClick={() => {
                  if (!newCategory.trim()) return;
                  if (selectedCategories.includes(newCategory)) return;

                  setSelectedCategories([...selectedCategories, newCategory]);
                  setNewCategory("");
                }}
              >
                追加
              </button>
            </div>

            {/* ✅ 追加予定カテゴリ一覧 */}
            <div className={styles.categoryPreview}>
              {selectedCategories.map((cat, index) => (
                <span key={index} className={styles.categoryTag}>
                  {cat}
                  <button
                    className={styles.removeTag}
                    onClick={() =>
                      setSelectedCategories(
                        selectedCategories.filter((_, i) => i !== index)
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className={styles.modalButtons}>
              <button onClick={() => setShowCategoryModal(false)}>
                キャンセル
              </button>

              <button
                disabled={selectedCategories.length === 0}
                onClick={async () => {
                  await appApi.post(`/restaurants/${id}/categories`, {
                    categories: selectedCategories, // ✅ 複数送信
                  });

                  setSelectedCategories([]);
                  setShowCategoryModal(false);

                  // ✅ 再取得
                  const res = await appApi.get(`/restaurants/${id}`);
                  setRestaurantDetail(res.data);
                }}
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
