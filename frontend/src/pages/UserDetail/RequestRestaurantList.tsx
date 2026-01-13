import React from "react"
import { useNavigate } from "react-router-dom"
import styles from "./RequestRestaurantList.module.scss"
import commonStyles from "./common.module.scss"

export interface RequestRestaurant {
    requestRestaurantId: number
    userId: number
    userName: string
    name: string
    url: string
    createdAt: string
    address: string
    status: "pending" | "approved" | "reject"
    approvedRestaurantId: number
    adminUserId: number
    rejectReason: string
    updatedAt: string
}

interface Props {
    requestRestaurants: RequestRestaurant[]
}

export const RequestRestaurantList: React.FC<Props> = ({
    requestRestaurants
}) => {
    const navigate = useNavigate()

    const statusMessage = {
        pending: "審査中",
        approved: "承認済",
        reject: "不承認"
    }

    return (
        <div className={commonStyles.container}>
            <p className={commonStyles.containerName}>レストランリクエスト状況</p>

            {requestRestaurants.map(r => (
                <div
                    key={r.requestRestaurantId}
                    className={`${styles.request} ${r.status === "reject"
                        ? styles.reject
                        : r.status === "approved"
                            ? styles.approved
                            : ""
                        }`}
                >
                    <p
                        className={r.approvedRestaurantId ? styles.toRestaurant : styles.title}
                        onClick={() => {
                            if (r.approvedRestaurantId) {
                                navigate(`/restaurants/${r.approvedRestaurantId}`)
                            }
                        }}
                    >
                        {r.name}
                    </p>

                    <p>　状況：{statusMessage[r.status]}</p>
                    {r.rejectReason && <p>　理由：{r.rejectReason}</p>}
                </div>
            ))}
        </div>
    )
}