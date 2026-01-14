import { useState } from "react"
import styles from "./NotificationList.module.scss"
import commonStyles from "./common.module.scss"

export interface Notification {
    notificationId: number
    type: "request_approved" | "request_rejected" | "photo_approved" | "photo_rejected"
    relatedId: number
    createdAt: string
    readFlag: boolean
    relatedInfo: string
    relatedSubInfo: string
}

interface Props {
    notifications: Notification[]
    toRead: (notificationId: number) => void
}

export const NotificationList: React.FC<Props> = ({ notifications, toRead }) => {

    const [onlyUnread, setOnlyUnread] = useState<boolean>(false)

    const PER_PAGE = 5
    const [currentPage, setCurrentPage] = useState(1)



    const startIndex = (currentPage - 1) * PER_PAGE
    const endIndex = startIndex + PER_PAGE
    const filteredNotifications = notifications.filter(r => !onlyUnread || !r.readFlag)

    const totalPages = Math.ceil(filteredNotifications.length / PER_PAGE)

    const currentNotifications = filteredNotifications.slice(startIndex, endIndex)

    const notificationsMessage = (r: Notification) => {
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

    return (
        <div className={commonStyles.container}>
            <div className={commonStyles.flex}>
                <p className={commonStyles.containerName}>通知</p>
                <div className={styles.buttons}>
                    <button type="button" className={`${styles.all} ${onlyUnread ? "" : styles.pushed}`} onClick={() => { setOnlyUnread(false), setCurrentPage(1) }}>すべて</button>
                    <button type="button" className={`${styles.all} ${onlyUnread ? styles.pushed : ""}`} onClick={() => { setOnlyUnread(true), setCurrentPage(1) }}>未読のみ</button>
                    <button type="button" onClick={() => {
                        notifications.map(n => {
                            toRead(n.notificationId)
                        })
                    }}>すべて既読</button>
                </div>
            </div>
            {currentNotifications.filter(r => !onlyUnread || !r.readFlag)
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