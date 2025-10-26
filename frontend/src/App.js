import React, { useEffect, useState } from "react";

//最上位コンポーネントをAppとする。
function App() {
  //const [状態の変数名, その変数を更新する関数名] = useState(初期値);
  const [message, setMessage] = useState("Loading...");

  //レンダリング以外の処理はここに書く
  //第二引数の空配列は最初の一回だけ実行するという意味
  //response.text()がdataに入る、という風に見る
  useEffect(() => {
    fetch("http://localhost:8080/api/message2")
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(() => setMessage("Error fetching message"));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{message}</h1>
    </div>
  );
}

export default App;