import { Header } from "../components/Header/Header"

export const NotFound = () => {
    return (
        <>
            <Header />
            <div style={{ position: "relative", top: "80px", margin: "20px" }}>
                <h1>404 NotFound</h1>
                <p>お探しのページは見つかりませんでした。</p>
                <p>URLが正しいかご確認ください。</p>
            </div>
        </>
    )
}