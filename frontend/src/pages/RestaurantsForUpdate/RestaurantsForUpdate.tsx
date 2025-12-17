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

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const totalPages = Math.ceil(restaurants.length / ITEMS_PER_PAGE);

    const currentRestaurants = restaurants.slice(startIndex, endIndex);

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