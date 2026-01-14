import React, { useState } from "react"
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

    const PER_PAGE = 5
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(requestRestaurants.length / PER_PAGE)

    const startIndex = (currentPage - 1) * PER_PAGE
    const endIndex = startIndex + PER_PAGE
    const currentRequests = requestRestaurants.slice(startIndex, endIndex)



    return (
        <div className={commonStyles.container}>
            <p className={commonStyles.containerName}>レストランリクエスト状況</p>

            {currentRequests.map(r => (
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

            {/* ページネーション */}
            {totalPages > 1 &&
                <div className={commonStyles.pagination}>
                    <button
                        onClick={() => setCurrentPage(p => p - 1)}
                        disabled={currentPage === 1}
                    >
                        ←Prev
                    </button>

                    <span>
                        {currentPage} / {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage(p => p + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next→
                    </button>
                </div>
            }
        </div>
    )
}