import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import appApi from "../../api/appApi";
import styles from "./RestaurantDetail.module.scss";

import { RestaurantHeader } from "../../components/RestaurantHeader/RestaurantHeader";
import { RestaurantPhotos } from "../../components/RestaurantPhotos/RestaurantPhotos";
import { RestaurantCategories } from "../../components/RestaurantCategories/RestaurantCategories";
import { RestaurantInfo } from "../../components/RestaurantInfo/RestaurantInfo";
import { RestaurantReviews } from "../../components/RestaurantReviews/RestaurantReviews";
import { RestaurantMap } from "../../components/DetailMap/DetailMap";

/* ===== 型定義 ===== */

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

interface Category {
  categoryId: number;
  name: string;
}

interface Photo {
  photoId: number;
  url: string;
}

interface Review {
  reviewId: number;
  rating: number;
  comment: string;
  userName: string;
}

interface Restaurant {
  restaurantId: number;
  name: string;
  address: string;
  url: string;
  averageBudget: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface RestaurantDetailResponse {
  restaurant: Restaurant;
  photos: Photo[];
  categories: Category[];
  reviews: Review[];
  favorite: boolean;
}

/* ===== コンポーネント ===== */

export const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [detail, setDetail] = useState<RestaurantDetailResponse | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /* ===== 再取得 ===== */
  const refresh = async () => {
    if (!id) return;

    const res = await appApi.get<ApiResponse<RestaurantDetailResponse>>(
      `/restaurants/${id}`
    );

    setDetail(res.data.data);
    setIsFavorite(res.data.data.favorite);
  };

  /* ===== 初回取得 ===== */
  useEffect(() => {
    refresh();
  }, [id]);

  /* ===== お気に入り切り替え ===== */
  const toggleFavorite = async () => {
    if (!id) return;

    try {
      if (isFavorite) {
        await appApi.delete(`/restaurants/${id}/likes`);
        setIsFavorite(false);
        setMessage("お気に入りを解除しました");
      } else {
        await appApi.post(`/restaurants/${id}/likes`);
        setIsFavorite(true);
        setMessage("お気に入りに追加しました");
      }
    } catch {
      setErrorMessage("お気に入りの更新に失敗しました");
    }
  };

  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />

      <div className={styles.container}>
        {/* ===== 左カラム ===== */}
        <div className={styles.leftColumn}>
          <RestaurantHeader
            name={detail.restaurant.name}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />

          <RestaurantCategories
            categories={detail.categories}
            restaurantId={id!}
            onRefresh={refresh}
          />

          <RestaurantPhotos
            photos={detail.photos}
            restaurantId={id!}
            onSuccess={(msg) => setMessage(msg)}
            onError={(msg) => setErrorMessage(msg)}
            onRefresh={refresh}
          />

          <RestaurantInfo
            address={detail.restaurant.address}
            budget={detail.restaurant.averageBudget}
            url={detail.restaurant.url}
            description={detail.restaurant.description}
          />

          <RestaurantMap
            restaurant={{
              name: detail.restaurant.name,
              address: detail.restaurant.address,
              latitude: detail.restaurant.latitude,
              longitude: detail.restaurant.longitude,
            }}
          />
        </div>

        {/* ===== 右カラム ===== */}
        <div className={styles.rightColumn}>
          <RestaurantReviews
            reviews={detail.reviews}
            restaurantId={id!}
            onRefresh={refresh}
          />
        </div>
      </div>

      {/* ===== メッセージ表示（簡易） ===== */}
      {message && (
        <div className={styles.message} onClick={() => setMessage(null)}>
          {message}
        </div>
      )}

      {errorMessage && (
        <div className={styles.error} onClick={() => setErrorMessage(null)}>
          {errorMessage}
        </div>
      )}
    </>
  );
};
