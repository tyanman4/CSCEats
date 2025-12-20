import { Header } from "../components/Header/Header"

export const InternalServiceError = () => {
    return (
        <>
            <Header />
            <div style={{ position: "relative", top: "80px", margin: "20px" }}>
                <h1>500 Internal Service Error</h1>
                <p>申し訳ありません。</p>
                <p>予期しないエラーが発生しました。</p>
                <p>しばらく時間をおいてから再度お試しください。</p>
            </div>
        </>
    )
}