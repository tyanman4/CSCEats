import { useEffect, useState } from "react";
import appApi from "../../api/appApi";
import { Header } from "../../components/Header/Header"
import styles from "./RequestRestaurants.module.scss";

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


    return (
        <>
            <Header />
            <div className={styles.container}>
                <ul>
                    {requests.map((r) => (
                        <li key={r.requestRestaurantId}>
                            <p>{r.createdAt}</p>
                            <p>{r.userName}</p>
                            {r.name} - {r.address} - <a href={r.url} target="_blank">URL</a>
                            <button onClick={() => handleApprove(r.requestRestaurantId)}>承認する</button>
                            <button>拒否する</button>
                            <textarea name="" id=""></textarea>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}


