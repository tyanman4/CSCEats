# CSCEats

## 概要
レストランの検索・レビュー・管理ができる Web アプリケーションです。
ユーザーはレストランの検索・レビュー投稿・お気に入り登録ができ、
管理者はレストランの承認・問い合わせ対応を行えます。

## リンク
- URL: https://csceats.onrender.com/

## 画像
（後で追加予定）

## 機能
### User
- ユーザーの新規登録・ログイン
- レストラン検索・並び替え
- レストランの詳細閲覧
- レストラン・写真の追加の依頼
- レビューの投稿・閲覧
- お気に入り登録
- 問い合わせの送信
- ユーザー情報の更新

### Admin
- レストラン・写真の追加の承認
- レストラン情報の編集
- 問い合わせへの回答

## 開発技術

### フロントエンド
- React
- TypeScript
- Vite
- SCSS Modules

### Backend
- Java
- Spring Boot
- MyBatis
- PostgreSQL

### Infrastructure
- Render

### Note
- 環境変数は .env ファイルで管理しています（値はGitHub上にはありません）

### ブランチ運用
- main: 本番環境
- develop: 開発用の統合ブランチ
- 各自のブランチ

基本的に 各自のブランチから `develop` へ `Pull Request` を作成します。<br>
`develop` から `main` への `Pull Request` は `Branch Protection Rules` を利用し必須としています。
