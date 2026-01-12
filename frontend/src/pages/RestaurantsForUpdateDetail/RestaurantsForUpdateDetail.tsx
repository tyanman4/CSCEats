import { useNavigate, useParams } from "react-router-dom"
import { Header } from "../../components/Header/Header"
import { useEffect, useState } from "react"
import appApi from "../../api/appApi"
import styles from "./RestaurantsForUpdateDetail.module.scss"
import { distanceFromCSC, getLatLon } from "../../util/geocoding"

export const RestaurantsForUpdateDetail: React.FC = () => {

    interface Restaurant {
        restaurantId: number;
        name: string;
        address: string;
        distance: string | null;
        url: string | null;
        averageBudget: string | null;
        description: string | null;
        imageUrl: string | null;
        latitude: string | null;
        longitude: string | null;
    }
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

    const id = useParams().id

    const [isSending, setIsSending] = useState(false);
    const [message, setMessage] = useState("");

    const [LON_MIN, LON_MAX] = [129, 146]
    const [LAT_MIN, LAT_MAX] = [30, 46]

    useEffect(() => {
        appApi.get(`admin/restaurants/${id}`)
            .then(res => {
                setRestaurant(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setRestaurant((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (restaurant == null) {
            return
        }
        if (!restaurant.name || !restaurant.address) {
            setMessage("店名と住所は必須です。");
            return
        } else if (restaurant.name.length > 64) {
            setMessage("店名が長すぎます。")
            return
        } else if (restaurant.address.length > 256) {
            setMessage("住所が長すぎます。")
            return
        }

        if (restaurant.latitude) {
            const lat = Number(restaurant.latitude)
            if (!Number.isFinite(lat)) {
                setMessage("緯度には数値を入力してください。")
                return
            }
            if (lat < LAT_MIN || lat > LAT_MAX) {
                setMessage("緯度に適切な数値を入力してください。")
                return
            }
        }
        if (restaurant.longitude) {
            const lon = Number(restaurant.longitude)
            if (!Number.isFinite(lon)) {
                setMessage("経度には数値を入力してください。")
                return;
            }
            if (lon < LON_MIN || lon > LON_MAX) {
                setMessage("経度には適切な数値を入力してください。")
            }
        }
        if (restaurant.distance) {
            const dist = Number(restaurant.distance)
            if (!Number.isFinite(dist)) {
                setMessage("距離には数値を入力してください。");
                return;
            }
        }

        try {
            setIsSending(true);
            const res = await appApi.post(`admin/restaurants/update/${id}`, restaurant);

            if (res.status === 200) {
                setMessage("変更を完了しました。");
            }
        } catch (error: any) {
            setMessage("変更に失敗しました。");
            console.error(error);
        } finally {
            setIsSending(false);
        }
    };

    const calcFromAddress = async () => {
        if (restaurant == null) { return }
        const result = await getLatLon(restaurant.address)
        if (result == null) {
            setMessage("計算できませんでした。")
            return
        }
        const distance = Math.floor(distanceFromCSC(result[0], result[1])).toString()
        setRestaurant({
            ...restaurant,
            latitude: String(result[0]),
            longitude: String(result[1]),
            distance: distance
        })
    }

    return (
        <>
            <Header />
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p>店名　　：
                            <input type="text" name="name" value={restaurant?.name} onChange={handleChange} />
                        </p>
                        <p>住所　　：
                            <input type="text" className={styles.longForm} name="address" value={restaurant?.address ?? ""} onChange={handleChange} />
                        </p>
                        <button type="button" onClick={calcFromAddress}>緯度経度距離自動入力</button>
                        <p>説明　　：
                            <textarea name="description" value={restaurant?.description ?? ""} onChange={handleChange} />
                        </p>
                        <p>URL　　：
                            <input type="text" className={styles.longForm} name="url" value={restaurant?.url ?? ""} onChange={handleChange} />
                        </p>
                        <p>画像URL：
                            <input type="text" className={styles.longForm} name="imageUrl" value={restaurant?.imageUrl ?? ""} onChange={handleChange} />
                        </p>
                        <p>平均予算：
                            <input type="text" name="averageBudget" value={restaurant?.averageBudget ?? ""} onChange={handleChange} />
                        </p>
                        <p>緯度　　：
                            <input type="text" name="latitude" value={restaurant?.latitude ?? ""} onChange={handleChange} />
                        </p>
                        <p>経度　　：
                            <input type="text" name="longitude" value={restaurant?.longitude ?? ""} onChange={handleChange} />
                        </p>
                        <p>距離　　：
                            <input type="text" name="distance" value={restaurant?.distance ?? ""} onChange={handleChange} />
                        </p>
                    </div>
                    <button type="submit" disabled={isSending} >
                        {isSending ? "送信中..." : "変更する"}
                    </button>
                    <button type="button" onClick={() => navigate(-1)}>戻る</button>
                </form>
                <p>{message}</p>
            </div>
        </>
    )
}