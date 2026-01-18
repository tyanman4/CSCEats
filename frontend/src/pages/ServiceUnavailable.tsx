import { Header } from "../components/Header/Header"

export const ServiceUnavailable = () => {
    return (
        <>
            <Header />
            <div style={{ position: "relative", top: "80px", margin: "20px" }}>
                <h1>503 Service Unavailable</h1>
                <p>ただいまサービスをご利用いただけません。</p>
                <p>しばらく時間をおいてから再度お試しください。</p>
            </div>
        </>
    )
}