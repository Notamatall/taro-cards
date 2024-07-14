import "./App.css";
import wheel from "./tarot/10.Wheel of Fortune.jpg";

function App() {
  return (
    <div className="App">
      <div className="cards-layout">
        <div className="slider">
          <img src={wheel} alt="taro-card" className="card"></img>
        </div>
      </div>
    </div>
  );
}

export default App;
