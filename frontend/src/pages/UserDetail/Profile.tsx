import React from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Profile.module.scss"
import commonStyles from "./common.module.scss"

export interface User {
    id: number
    name: string
    introduction: string
}

interface Props {
    user?: User
    isMyPage: boolean
}

export const Profile: React.FC<Props> = ({
    user,
    isMyPage
}) => {
    const navigate = useNavigate()

    return (
        <div className={commonStyles.container}>
            <p className={styles.userName}>{user?.name}</p>
            {user?.introduction ?
                <p className={styles.introduction}>{user?.introduction}</p> :
                <p className={styles.noIntroduction}>（自己紹介はありません）</p>
            }

            {isMyPage && (
                <p className={styles.toMypageP}>
                    プロフィール編集・パスワード変更は
                    <a
                        onClick={() => navigate("/mypage")}
                        className={styles.toMypage}
                    >
                        こちら
                    </a>
                </p>
            )}
        </div>
    )
}