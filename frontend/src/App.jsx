import { useEffect, useState } from "react";

function App() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/restaurants")
      .then(res => res.json())
      .then(data => setRestaurants(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>CSCEats 店舗一覧</h1>
      <ul>
        {restaurants.map(shop => (
          <li key={shop.id}>{shop.name} ({shop.genre})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
