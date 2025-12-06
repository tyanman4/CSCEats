import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import appApi from '../../api/appApi';
import styles from './RestaurantDetail.module.scss';

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
          </div>
          <div className={styles.potoContainer}>
            {restaurantDetail.photos.map((photo) => (
              <img
                key={photo.photoId}
                src={photo.url}
                alt="店舗写真"
                className={styles.photo}
              />
            ))}
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
          <div className={styles.reviewFormCard}>
            <h2 className={styles.sectionTitle}>レビューを投稿する</h2>

            <label>レビュー内容</label>
            <textarea placeholder="ここにレビューを書いてください" />

            <label>評価（1〜5）</label>
            <select>
              {[1, 2, 3, 4, 5].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>

            <button className={styles.submitButton}>投稿する</button>
          </div>

          <h2 className={styles.sectionTitle}>レビュー一覧</h2>

          {restaurantDetail.reviews.map((review) => (
            <div key={review.reviewId} className={styles.reviewCard}>
              <p className={styles.reviewer}>{review.userName} {'⭐'.repeat(review.rating)}</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
