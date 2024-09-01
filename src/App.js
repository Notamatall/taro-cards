import "./app.css";
import "./cards.css";
import "./test.css";
import { LSKey } from "./constants";
import CardsGridDesktop from "./CardsGridDesktop";
import { useEffect, useState } from "react";
function App() {
  const [isCardRevealed, setIsCardRevealed] = useState(false);
  useEffect(() => {
    const key = localStorage.getItem(LSKey);
    if (key) {
      const taroInformation = JSON.parse(key);
    }
  }, []);
  return (
    <div className="app">
      <CardsGridDesktop isCardRevealed={isCardRevealed} />
    </div>
  );
}

export default App;
