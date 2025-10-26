import { useState, useEffect } from "react";
function App() {
  interface Restaurant {
    id: number,
    name: string,
    genre: string
  }
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/restaurants")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setRestaurants(data)})
      .catch(err => console.error(err));
  }, []);
  // console.log(restaurants);
  return (
    <>
      <h1>CSCEats 店舗一覧</h1>
      <ul>
        {restaurants.map(shop => (
          <li key={shop.id}>{shop.name} ({shop.genre})</li>
        ))}
      </ul>
    </>
  )
}
export default App
