import axios from "axios";

const appApi = axios.create({
  // TODO: 本番環境用のURLに変更する
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//トークンを自動でリクエストヘッダに付与する
appApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // headers が undefined の場合に空オブジェクトを作成
  config.headers = config.headers || {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default appApi;