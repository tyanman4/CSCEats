import axios from "axios";

const appApi = axios.create({
  baseURL: "https://csceats.onrender.com/api",
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