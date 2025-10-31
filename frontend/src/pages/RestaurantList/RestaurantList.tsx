import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { MapView } from "../../components/Map/MapView";
import appApi from "../../api/appApi";
import styles from "./RestaurantList.module.scss";

export const RestaurantList: React.FC = () => {
  interface Restaurant {
    id: number;
    name: string;
    address: string;
    distance: number;
    averageBudget: string;
    description: string;
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

  const onClickSearch = () => {
    setPage(1);
    setSearchWord((document.getElementById("searchInput") as HTMLInputElement).value);
  };

  const onClickToDetail = (id: number) => {
    navigate(`/restaurants/${id}`)
  }

  const onChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.map}>
          <MapView />
        </div>
        <div className={styles.listArea}>
          <div className={styles.searchBar}>
            <input id="searchInput" type="text" placeholder="検索" className={styles.searchInput} />
            <button onClick={onClickSearch} className={styles.searchButton}> 検索 </button>
          </div>
          <div className={styles.sortBar}>
            <label>並び替え:</label>
            <select value={sortOption} onChange={onChangeSort}>
              <option>人気順</option>
              <option>安い順</option>
              <option>レビュー総数順</option>
              <option>近い順</option>
            </select>
          </div>

          {restaurants.map((shop) => (
            <div key={shop.id} className={styles.restaurantCard} onClick={() => onClickToDetail(shop.id)}>
              <h5>{shop.name}</h5>
              <p>{shop.address}  {shop.distance}m</p>
              <p>{shop.averageBudget}円  {shop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
