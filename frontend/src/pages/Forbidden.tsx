import { Header } from "../components/Header/Header"

export const Forbidden = () => {
    return (
        <>
            <Header />
            <div style={{ position: "relative", top: "80px", margin: "20px" }}>
                <h1>403 Forbidden</h1>
                <p>このページを表示する権限がありません。</p>
            </div>
        </>
    )
}