import { useEffect, useState } from "react"
import appApi from "../../api/appApi"
import { Header } from "../../components/Header/Header"
import styles from "./RequestRestaurants.module.scss"

export const RequestRestaurants: React.FC = () => {

    interface RequestRestaurants {
        requestRestaurantId: number;
        userId: number;
        userName: string;
        name: string;
        url: string;
        createdAt: string;
        address: string;
        status: string;
        approvedRestaurantId: number;
        adminUserId: number;
        rejectReason: string;
        updatedAt: string;
    }

    interface Photos {
        photoId: number
        url: string
        createdAt: string
        restaurantId?: number
        restaurantName?: string
        userId: number
        userName: string
    }

    const [requests, setRequests] = useState<RequestRestaurants[]>([]);
    const [photos, setPhotos] = useState<Photos[]>([]);

    const [rejectReasons, setRejectReasons] = useState<{ [key: number]: string }>({});
    const [rejectReasonsPhoto, setRejectReasonsPhoto] = useState<{ [key: number]: string }>({});

    const [message, setMessage] = useState<{ [key: number]: string }>({})
    const [messagePhoto, setMessagePhoto] = useState<{ [key: number]: string }>({})

    useEffect(() => {
        appApi.get("admin/pending")
            .then((res) => {
                setRequests(res.data);
            })
            .catch((err) => console.error(err));

        appApi.get("admin/photo/pending")
            .then(res => {
                setPhotos(res.data)
            })
            .catch((err) => console.error(err));
    }, []);

    const handleApprove = (id: number, userId: number) => {

        appApi.post(`admin/approve/${id}`, {
            userId: userId
        })
            .then(() => {
                setRequests(prev => prev.filter(r => r.requestRestaurantId !== id));
            })
            .catch((e) => console.error(e));
    }

    const handleReject = (id: number, userId: number) => {


        if (!rejectReasons[id] || rejectReasons[id].length < 4) {

            setMessage(prev => ({ ...prev, [id]: "理由を4文字以上入力してください" }));
            return;
        }
        setMessage(prev => ({ ...prev, [id]: "" }));

        appApi.post(`admin/reject/${id}`, {
            userId: userId,
            reason: rejectReasons[id]
        })
            .then(() => {
                setRequests(prev => prev.filter(r => r.requestRestaurantId !== id));
            })
            .catch((e) => console.error(e));
    }

    const handleRejectReasonChange = (id: number, value: string) => {
        setRejectReasons(prev => ({ ...prev, [id]: value }));
    };

    const handleApprovePhoto = (id: number, userId: number) => {

        appApi.post(`admin/approve/photo/${id}`, {
            userId: userId
        })
            .then(() => {
                setPhotos(prev => prev.filter(r => r.photoId !== id));
            })
            .catch((e) => console.error(e));
    }

    const handleRejectPhoto = (id: number, userId: number) => {


        if (!rejectReasonsPhoto[id] || rejectReasonsPhoto[id].length < 4) {

            setMessagePhoto(prev => ({ ...prev, [id]: "理由を4文字以上入力してください" }));
            return;
        }
        setMessagePhoto(prev => ({ ...prev, [id]: "" }));

        appApi.post(`admin/reject/photo/${id}`, {
            userId: userId,
            reason: rejectReasonsPhoto[id]
        })
            .then(() => {
                setPhotos(prev => prev.filter(r => r.photoId !== id));
            })
            .catch((e) => console.error(e));
    }

    const handleRejectReasonChangePhoto = (id: number, value: string) => {
        setRejectReasonsPhoto(prev => ({ ...prev, [id]: value }));
    };



    return (
        <>
            <Header />

            <div className={styles.container}>
                <h2>申請中レストラン</h2>
                <ul className={styles.list}>
                    {requests.map((r) => (
                        <li key={r.requestRestaurantId} >
                            <p>申請日時：{r.createdAt.substring(0, 16)}</p>
                            <p>申請者　：{r.userName}</p>
                            <p>店名　　：{r.name}</p>
                            <p>住所　　：{r.address} </p>
                            {r.url && <p>URL　　：<a href={r.url} target="_blank">{r.url.length > 50 ? r.url.slice(0, 50) + "..." : r.url}</a></p>}
                            <div>
                                <button onClick={() => handleApprove(r.requestRestaurantId, r.userId)} className={styles.button}>承認する</button>
                                <button onClick={() => handleReject(r.requestRestaurantId, r.userId)} className={styles.button}>拒否する</button>
                                拒否理由：<input type="text"
                                    value={rejectReasons[r.requestRestaurantId] || ""}
                                    onChange={(e) => handleRejectReasonChange(r.requestRestaurantId, e.target.value)}

                                />
                            </div>
                            <p className={styles.message}>{message[r.requestRestaurantId]}</p>
                        </li>
                    ))}
                </ul>
                <hr></hr>
                <h2>申請中写真</h2>
                <ul className={styles.list}>
                    {photos.filter(r => r.restaurantId).map(r => (
                        <li key={r.photoId}>
                            <p>申請日時：{new Date(r.createdAt).toLocaleString("ja-JP")}</p>
                            <p>申請者　：{r.userName}</p>
                            <p>店名　　：{r.restaurantName}</p>
                            <div className={styles.imgFrame}>
                                <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${r.url}`} />
                            </div>
                            <div>
                                <button onClick={() => handleApprovePhoto(r.photoId, r.userId)} className={styles.button}>承認する</button>
                                <button onClick={() => handleRejectPhoto(r.photoId, r.userId)} className={styles.button}>拒否する</button>
                                拒否理由：<input type="text"
                                    value={rejectReasonsPhoto[r.photoId] || ""}
                                    onChange={(e) => handleRejectReasonChangePhoto(r.photoId, e.target.value)}

                                />
                            </div>
                            <p className={styles.message}>{messagePhoto[r.photoId]}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}


