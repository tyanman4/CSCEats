import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { MapView } from "../../components/Map/MapView";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { SortBar } from "../../components/SortBar/SortBar";
import { RestaurantCard } from "../../components/RestaurantCard/RestaurantCard";
import { Pagination } from "../../components/Pagination/Pagination";
import appApi from "../../api/appApi";
import styles from "./RestaurantList.module.scss";

interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
  path: string;
  timestamp: string;
}
interface Category {
  categoryId: number;
  name: string;
  usageCount?: number;
}

interface RestaurantReview {
  id: number;
  name: string;
  address: string;
  distance: number;
  url: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  latitude?: number;
  longitude?: number;
  underBudget: number;
  topBudget: number;
  averageRating: number;
  reviewCount: number;
  categories: Category[];
}

interface RestaurantResponse {
  restaurants: RestaurantReview[];
  totalCount: number;
}

type MapRestaurant = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  imageUrl?: string | null;
};

export const RestaurantList: React.FC = () => {

  const [restaurants, setRestaurants] = useState<RestaurantReview[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchWord, setSearchWord] = useState("");
  const [sortOptions, setSortOption] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await appApi.get<ApiResponse<Category[]>>("/categories");
        setCategories(res.data.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await appApi.get<ApiResponse<RestaurantResponse>>("/restaurants", {
          params: {
            search: searchWord,
            sorts: sortOptions,
            page: page,
          },
        });
        setRestaurants(res.data.data.restaurants);
        setTotalCount(res.data.data.totalCount);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
      }
    };

    fetchRestaurants();
  }, [searchWord, sortOptions, page]);

  const mapRestaurants = useMemo<MapRestaurant[]>(() => {
    return restaurants
      .map((r) => {
        const lat = Number(r.latitude);
        const lng = Number(r.longitude);

        // 不正な座標は Map には渡さない
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          return null;
        }

        return {
          id: r.id,
          name: r.name,
          lat,
          lng,
          address: r.address,
          imageUrl: r.imageUrl ?? null,
        };
      })
      .filter(Boolean) as MapRestaurant[];
  }, [restaurants]);

  const totalPages = Math.ceil(totalCount / limit);

  const onClickSearch = (word: string) => {
    setPage(1);
    setSearchWord(word.trim());
  };

  const onChangeSort = (options: string[]) => {
    setPage(1);
    setSortOption(options);
  };

  const onClickToDetail = (id: number) => {
    navigate(`/restaurants/${id}`);
  };

  const onClickNext = () => {
    setPage(page + 1);
  }

  const onClickPrev = () => {
    setPage(page - 1);
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.map}>
          <MapView markers={mapRestaurants} />
        </div>
        <div className={styles.listArea}>
          <SearchBar onSearch={onClickSearch} categories={categories} />
          <SortBar selectedOptions={sortOptions} onChange={onChangeSort} />
          <div className={styles.scrollArea} >
            {restaurants.map((shop) => (
              <RestaurantCard
                key={shop.id}
                restaurant={shop}
                onClick={() => onClickToDetail(shop.id)}
              />
            ))}
          </div>
        </div>

        <div className={styles.paginationArea}>
          <Pagination page={page} totalPages={totalPages} onClickNext={onClickNext} onClickPrev={onClickPrev} />
        </div>
      </div>
    </>
  );
};