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

    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

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
                    {restaurants.map((r) => (
                        <li key={r.restaurantId}>
                            <p>店名：<span className={styles.toDetail} onClick={() => navigate(`/restaurants-for-update/${r.restaurantId}`)}>{r.name}</span></p>
                            <p>住所：{r.address}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}