import { useParams } from "react-router-dom"
import { Header } from "../../components/Header/Header"
import styles from "./UserDetail.module.scss"
import { useAuth } from "../../contexts/AuthContext"
import { useEffect, useState } from "react"
import appApi from "../../api/appApi"

import { ReviewList, type Review } from "./ReviewList"
import { RequestRestaurantList, type RequestRestaurant } from "./RequestRestaurantList"
import { FavoriteList, type Favorite } from "./FavoriteList"
import { NotificationList, type Notification } from "./NotificationList"
import { Profile, type User } from "./Profile"

export const UserDetail: React.FC = () => {

    const { user } = useAuth()
    const userId = useParams().id
    const loginId = user?.id

    const isMyPage = userId == loginId

    const [targetUser, serTargetUser] = useState<User>()
    const [requestRestaurants, setRequestRestaurants] = useState<RequestRestaurant[]>([])
    const [reviews, setReviews] = useState<Review[]>([])
    const [likes, setLikes] = useState<Favorite[]>([])
    const [notifications, setNotifications] = useState<Notification[]>([])


    useEffect(() => {
        appApi.get(`user/${userId}`)
            .then(res => {
                serTargetUser(res.data)
            })
            .catch((err) => console.error(err))


        appApi.get(`reviews/user/${userId}`)
            .then(res => {
                setReviews(res.data)
            })
            .catch((err) => console.error(err))

        appApi.get(`restaurant-likes/user/${userId}`)
            .then(res => {
                setLikes(res.data)
            })
            .catch((err) => console.error(err))

        if (isMyPage) {
            appApi.get(`request-restaurants/${userId}`)
                .then(res => {
                    setRequestRestaurants(res.data)
                })
                .catch((err) => console.error(err))

            appApi.get(`notifications/user/${userId}`)
                .then(res => {
                    setNotifications(res.data)
                })
                .catch((err) => console.error(err))
        }
    }, [userId])

    const toRead = (notificationId: number) => {
        appApi.post(`notifications/to-read/${notificationId}`)
            .then(() => {
                setNotifications(prev =>
                    prev.map(n =>
                        n.notificationId === notificationId
                            ? { ...n, readFlag: true }
                            : n
                    )
                )
            })
    }

    return (
        <>
            <Header />

            <div className={`${styles.container} ${isMyPage ? "" : styles.mypage}`}>
                <div className={styles.leftGrid}>
                    <Profile
                        user={targetUser}
                        isMyPage={isMyPage}
                    />
                    {isMyPage &&
                        <NotificationList
                            notifications={notifications}
                            toRead={toRead}
                        />
                    }
                </div>
                <div className={styles.rightGrid}>

                    <FavoriteList likes={likes} />

                    <ReviewList reviews={reviews} />

                    {isMyPage &&
                        <RequestRestaurantList
                            requestRestaurants={requestRestaurants}
                        />
                    }
                </div>
            </div>
        </>
    )
}