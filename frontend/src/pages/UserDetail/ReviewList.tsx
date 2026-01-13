import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./ReviewList.module.scss"
import commonStyles from "./common.module.scss"

export interface Review {
    reviewId: number
    restaurantId: number
    rating: number
    comment: string
    restaurantName: string
}

interface Props {
    reviews: Review[]
}

export const ReviewList: React.FC<Props> = ({ reviews }) => {
    const navigate = useNavigate()

    const REVIEWS_PER_PAGE = 3
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE)

    const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE
    const endIndex = startIndex + REVIEWS_PER_PAGE
    const currentReviews = reviews.slice(startIndex, endIndex)

    return (
        <div className={commonStyles.container}>
            <p className={commonStyles.containerName}>レビュー</p>

            {currentReviews.map(r => (
                <div key={r.reviewId} className={styles.review}>
                    <div className={commonStyles.flex}>
                        <p
                            className={styles.toRestaurant}
                            onClick={() => navigate(`/restaurants/${r.restaurantId}`)}
                        >
                            {r.restaurantName}
                        </p>
                        <p className={styles.star}>{"⭐".repeat(r.rating)}</p>
                    </div>
                    <p className={styles.content}>{"　" + r.comment}</p>
                </div>
            ))}

            {/* ページネーション */}
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
        </div>
    )
}