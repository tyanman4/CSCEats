import React from "react"
import { useNavigate } from "react-router-dom"
import styles from "./FavoriteList.module.scss"
import commonStyles from "./common.module.scss"

export interface Favorite {
    restaurantId: number
    restaurantName: string
}

interface Props {
    likes: Favorite[]
}

export const FavoriteList: React.FC<Props> = ({ likes }) => {
    const navigate = useNavigate()

    return (
        <div className={commonStyles.container}>
            <p className={commonStyles.containerName}>お気に入り</p>

            <div className={styles.lists}>
                {likes.map(r => (
                    <div
                        key={r.restaurantId}
                        className={styles.likes}
                        onClick={() => navigate(`/restaurants/${r.restaurantId}`)}
                    >
                        {r.restaurantName}
                    </div>
                ))}
            </div>
        </div>
    )
}