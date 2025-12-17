import { useEffect, useState } from "react"
import { Header } from "../../components/Header/Header"
import appApi from "../../api/appApi"
import { useNavigate } from "react-router-dom"
import styles from "./RestaurantsForUpdate.module.scss"

export const RestaurantsForUpdate: React.FC = () => {

    interface Restaurant {
        restaurantId: number;
        name: string;
        address: string;
    }

    const ITEMS_PER_PAGE = 100;
    const [currentPage, setCurrentPage] = useState(1);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [nameQuery, setNameQuery] = useState("");
    const [addressQuery, setAddressQuery] = useState("");

    const filteredRestaurants = restaurants.filter((r) => {
        const matchesName =
            r.name.toLowerCase().includes(nameQuery.toLowerCase());

        const matchesAddress =
            r.address.toLowerCase().includes(addressQuery.toLowerCase());

        return matchesName && matchesAddress;
    });

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const totalPages = Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE);

    const currentRestaurants = filteredRestaurants.slice(startIndex, endIndex);

    const navigate = useNavigate();


    useEffect(() => {
        appApi.get("admin/restaurants")
            .then((res) => {
                setRestaurants(res.data)
            })
            .catch((err) => console.error(err));
    }, [])

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.searchArea}>
                    <input
                        type="text"
                        placeholder="店名で検索"
                        value={nameQuery}
                        onChange={(e) => {
                            setNameQuery(e.target.value);
                            setCurrentPage(1); // 検索時は1ページ目に戻す
                        }}
                    />

                    <input
                        type="text"
                        placeholder="住所で検索"
                        value={addressQuery}
                        onChange={(e) => {
                            setAddressQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <ul>
                    {currentRestaurants.map((r) => (
                        <li key={r.restaurantId}>
                            <p>店名：<span className={styles.toDetail} onClick={() => navigate(`/restaurants-for-update/${r.restaurantId}`)}>{r.name}</span></p>
                            <p>住所：{r.address}</p>
                        </li>
                    ))}
                </ul>

                <div className={styles.pagination}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            disabled={page === currentPage}
                            className={styles.pageButton}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}