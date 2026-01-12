import { useNavigate, useParams } from "react-router-dom"
import { Header } from "../../components/Header/Header"
import styles from "./UserDetail.module.scss"
import { useAuth } from "../../contexts/AuthContext"
import { useEffect, useState } from "react"
import appApi from "../../api/appApi"

export const UserDetail: React.FC = () => {

    interface RequestRestaurants {
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

    interface Reviews {
        reviewId: number
        restaurantId: number
        rating: number
        comment: number
        restaurantName: string
    }

    interface Likes {
        restaurantId: number
        restaurantName: string
    }

    interface Notifications {
        notificationId: number
        type: "request_approved" | "request_rejected" | "photo_approved" | "photo_rejected"
        relatedId: number
        createdAt: string
        readFlag: boolean
        relatedInfo: string
        relatedSubInfo: string
    }

    interface User {
        id: number
        name: string
        introduction: string
    }

    const { user } = useAuth()
    const navigate = useNavigate();

    const userId = useParams().id
    const loginId = user?.id

    const isMyPage = userId == loginId

    const [targetUser, serTargetUser] = useState<User>()
    const [requestRestaurants, setRequestRestaurants] = useState<RequestRestaurants[]>([])
    const [reviews, setReviews] = useState<Reviews[]>([])
    const [likes, setLikes] = useState<Likes[]>([])
    const [notifications, setNotifications] = useState<Notifications[]>([])

    const [onlyUnread, setOnlyUnread] = useState<boolean>(false)

    const statusMessage = {
        pending: "審査中",
        approved: "承認済",
        reject: "不承認"
    }

    const notificationsMessage = (r: Notifications) => {
        switch (r.type) {
            case "request_approved":
                return `レストラン(${r.relatedInfo})の追加リクエストは承認されました。`
            case "request_rejected":
                return `レストラン(${r.relatedInfo})の追加リクエストは承認されませんでした。`
                    + "\r\n" + `理由：${r.relatedSubInfo}`
            case "photo_approved":
                return `レストラン(${r.relatedInfo})への写真追加は承認されました。`
            case "photo_rejected":
                return `レストラン(${r.relatedInfo})への写真追加は承認されませんでした。`
                    + "\r\n" + `理由：${r.relatedSubInfo}`
            default:
                return ""
        }
    }

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



    return (
        <>
            <Header />

            <div className={`${styles.container} ${isMyPage ? "" : styles.mypage}`}>
                <div className={styles.leftGrid}>
                    <div className={styles.profileContainer}>
                        <p className={styles.userName}>{targetUser?.name}</p>
                        <p className={styles.introduction}>{targetUser?.introduction}</p>
                        {isMyPage &&
                            <p className={styles.toMypageP}>プロフィール編集・パスワード変更は
                                <a onClick={() => navigate("/mypage")} className={styles.toMypage}>
                                    こちら
                                </a>
                            </p>
                        }
                    </div>
                    {isMyPage &&
                        <div className={styles.notificationContainer}>
                            <div className={styles.flex}>
                                <p className={styles.containerName}>通知</p>
                                <div className={styles.buttons}>
                                    <button type="button" className={`${styles.all} ${onlyUnread ? "" : styles.pushed}`} onClick={() => { setOnlyUnread(false) }}>すべて</button>
                                    <button type="button" className={`${styles.all} ${onlyUnread ? styles.pushed : ""}`} onClick={() => { setOnlyUnread(true) }}>未読のみ</button>
                                    <button type="button" onClick={() => {
                                        notifications.map(n => {
                                            toRead(n.notificationId)
                                        })
                                    }}>すべて既読</button>
                                </div>
                            </div>
                            {notifications.filter(r => !onlyUnread || !r.readFlag)
                                .map(r => (

                                    <div key={r.notificationId} className={styles.notification}>
                                        <p
                                            className={r.readFlag ? styles.read : styles.unread}
                                            onClick={() => {
                                                if (!r.readFlag) {
                                                    toRead(r.notificationId)
                                                }
                                            }}
                                        >{notificationsMessage(r)}
                                            <p className={styles.date}>{new Date(r.createdAt).toLocaleString("ja-JP")}</p>

                                        </p>
                                    </div>
                                ))}
                        </div>
                    }
                </div>
                <div className={styles.rightGrid}>
                    <div className={styles.favoriteContainer}>
                        <p className={styles.containerName}>お気に入り</p>
                        <div className={styles.lists}>
                            {likes.map(r => (
                                <div key={r.restaurantId} className={styles.likes}
                                    onClick={() => {
                                        navigate(`/restaurants/${r.restaurantId}`)
                                    }}
                                >{r.restaurantName}</div>
                            ))}
                        </div>

                    </div>

                    <div className={styles.reviewContainer}>
                        <p className={styles.containerName}>レビュー</p>
                        {reviews.map(r => (
                            <div key={r.reviewId} className={styles.review}>
                                <div className={styles.flex}>
                                    <p className={styles.toRestaurant} onClick={() => {
                                        navigate(`/restaurants/${r.restaurantId}`)
                                    }}>{r.restaurantName}</p>
                                    <p className={styles.star}>{"⭐".repeat(r.rating)}</p>
                                </div>
                                <p className={styles.content}>{"　" + r.comment}</p>

                            </div>
                        ))}
                    </div>

                    {isMyPage &&
                        <div className={styles.requestContainer}>
                            <p className={styles.containerName}>レストランリクエスト状況</p>
                            {requestRestaurants.map(r => (
                                <div key={r.requestRestaurantId}
                                    className={`${styles.request} ${r.status === "reject" ? styles.reject : r.status === "approved" ? styles.approved : ""}`}>
                                    <p
                                        className={r.approvedRestaurantId ? styles.toRestaurant : styles.title}
                                        onClick={() => {
                                            if (r.approvedRestaurantId) navigate(`/restaurants/${r.approvedRestaurantId}`)
                                        }}>{r.name}</p>
                                    <p>　状況：{statusMessage[r.status]}</p>
                                    {r.rejectReason && <p>　理由：{r.rejectReason}</p>}
                                </div>
                            ))}

                        </div>
                    }
                </div>
            </div>
        </>
    )
}