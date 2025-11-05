import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { MapView } from "../../components/Map/MapView";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { SortBar } from "../../components/SortBar/SortBar";
import { RestaurantCard } from "../../components/RestaurantCard/RestaurantCard";
import appApi from "../../api/appApi";
import styles from "./RestaurantList.module.scss";

export const RestaurantList: React.FC = () => {
  interface Category {
    categoryId: number;
    name: string;
  }

  interface RestaurantReview {
    restaurantId: number;
    name: string;
    address: string;
    distance: number;
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
    categories: Category[];
  }

  const [restaurants, setRestaurants] = useState<RestaurantReview[]>([]);
  const [searchWord, setSearchWord] = useState("");
  const [sortOption, setSortOption] = useState("人気順");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await appApi.get<RestaurantReview[]>("/restaurants", {
          params: {
            search: searchWord,
            sort: sortOption,
            page: page,
          },
        });
        setRestaurants(res.data);
        console.log(restaurants);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
      }
    };

    fetchRestaurants();
  }, [searchWord, sortOption, page]);

  const onClickSearch = (word: string) => {
    setPage(1);
    setSearchWord(word.trim());
  };

  const onChangeSort = (option: string) => {
    setPage(1);
    setSortOption(option);
  };

  const onClickToDetail = (id: number) => {
    navigate(`/restaurants/${id}`);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.map}>
          <MapView restaurants={restaurants} />
        </div>
        <div className={styles.listArea}>
          <SearchBar onSearch={onClickSearch} />
          <SortBar value={sortOption} onChange={onChangeSort} />

          {restaurants.map((shop) => (
            <RestaurantCard
              key={shop.restaurantId}
              restaurant={shop}
              onClick={() => onClickToDetail(shop.restaurantId)}
            />
          ))}

          <div className={styles.pagination}>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>前へ</button>
            <span>ページ {page}</span>
            <button onClick={() => setPage(page + 1)}>次へ</button>
          </div>
        </div>
      </div>
    </>
  );
};
