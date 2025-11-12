import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { MapView } from "../../components/Map/MapView";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { SortBar } from "../../components/ SortBar/SortBar";
import { RestaurantCard } from "../../components/RestaurantCard/RestaurantCard";
import appApi from "../../api/appApi";
import styles from "./RestaurantList.module.scss";
import { jwtDecode } from "jwt-decode";


export const RestaurantList: React.FC = () => {
  interface Restaurant {
    id: number;
    name: string;
    address: string;
    distance: number;
    averageBudget: string;
    description: string;
    lat: number;
    lng: number;
  }
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchWord, setSearchWord] = useState("");
  const [sortOption, setSortOption] = useState("人気順");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await appApi.get<Restaurant[]>("/restaurants", {
          params: {
            search: searchWord,
            sort: sortOption,
            page: page,
          },
        });
        setRestaurants(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRestaurants();
  }, [searchWord, sortOption, page]);

  const onClickSearch = (word: string) => {
    setPage(1);
    setSearchWord(word);
  };

  const onChangeSort = (option: string) => {
    setPage(1);
    setSortOption(option);
  };

  const onClickToDetail = (id: number) => {
    navigate(`/restaurants/${id}`)
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
            <RestaurantCard key={shop.id} restaurant={shop} onClick={() => onClickToDetail(shop.id)} />
          ))}
        </div>
      </div>
    </>
  );
};


interface DecodedToken {
  sub: string;      // ユーザー名など
  exp: number;      // 有効期限（秒単位のUNIXタイム）
  iat: number;      // 発行時刻
  [key: string]: any; // その他のカスタムクレームにも対応
}

function getDecodedToken(): DecodedToken | null {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (err) {
    console.error("トークンのデコードに失敗しました", err);
    return null;
  }
}