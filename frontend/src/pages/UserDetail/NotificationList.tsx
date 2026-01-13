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
    )
}