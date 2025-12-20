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

    const [requests, setRequests] = useState<RequestRestaurants[]>([]);

    const [rejectReasons, setRejectReasons] = useState<{ [key: number]: string }>({});

    const [message, setMessage] = useState<{ [key: number]: string }>({})

    useEffect(() => {
        appApi.post("admin/pending-list")
            .then((res) => {
                console.log(res.data);
                setRequests(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleApprove = (id: number) => {

        appApi.post(`admin/approve/${id}`)
            .then(() => {
                setRequests(prev => prev.filter(r => r.requestRestaurantId !== id));
            })
            .catch((e) => console.error(e));
    }

    const handleReject = (id: number) => {


        if (!rejectReasons[id] || rejectReasons[id].length < 4) {

            setMessage(prev => ({ ...prev, [id]: "理由を4文字以上入力してください" }));
            return;
        }
        setMessage(prev => ({ ...prev, [id]: "" }));

        appApi.post(`admin/reject/${id}`, {
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


    return (
        <>
            <Header />

            <div className={styles.container}>
                <h3>申請中レストラン</h3>
                <ul>
                    {requests.map((r) => (
                        <li key={r.requestRestaurantId}>
                            <p>申請日時：{r.createdAt.substring(0, 16)}</p>
                            <p>申請者　：{r.userName}</p>
                            <p>店名　　：{r.name}</p>
                            <p>住所　　：{r.address} </p>
                            <a href={r.url} target="_blank">URL</a>
                            <div>
                                <button onClick={() => handleApprove(r.requestRestaurantId)} className={styles.button}>承認する</button>
                                <button onClick={() => handleReject(r.requestRestaurantId)} className={styles.button}>拒否する</button>
                                拒否理由：<textarea
                                    value={rejectReasons[r.requestRestaurantId] || ""}
                                    onChange={(e) => handleRejectReasonChange(r.requestRestaurantId, e.target.value)}

                                />
                            </div>
                            <p className={styles.message}>{message[r.requestRestaurantId]}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}


