import "./styles/app.css";
import { LSKey } from "./constants";
import CardsGridDesktop from "./CardsGridDesktop";
import CardsGridMobile from "./CardsGridMobile";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Card from "./Card";
import Countdown from "./CountDownComponent";
const taroCardsSrcList = require.context("./assets/cards", true);

function App() {
  const isMobile = useMediaQuery({
    query: "(max-width:569px)",
  });

  const [initialTime, setInitialTime] = useState(null);
  const [isCardRevealed, setIsCardRevealed] = useState(false);
  const [cardToDisplaySrc, setCardToDisplaySrc] = useState(null);
  function getDifferenceInHours(targetDate) {
    // Get the current date and time in milliseconds
    const now = new Date().getTime();

    // Get the target date and time in milliseconds
    const target = new Date(targetDate).getTime();

    // Calculate the difference in milliseconds
    const differenceInMs = now - target;

    // Convert the difference from milliseconds to hours (1 hour = 3600000 ms)
    const differenceInHours = differenceInMs / (1000 * 60 * 60);

    return differenceInHours;
  }

  function dropLSKey() {
    localStorage.removeItem(LSKey);
  }

  function getTimeTillNextDate(time) {
    const currentDate = new Date(time);
    const newDate = new Date(currentDate);
    return newDate.setDate(currentDate.getDate() + 1) - Date.now();
  }

  useEffect(() => {
    let intervalId = null;
    const json = localStorage.getItem(LSKey);
    if (json) {
      const taroInformation = JSON.parse(json);
      if (taroInformation) {
        const timeSinceLastReveal = getDifferenceInHours(
          taroInformation.dateRevealed
        );

        const timeTillNext = getTimeTillNextDate(taroInformation.dateRevealed);
        setInitialTime(timeTillNext);

        if (timeSinceLastReveal >= 24) {
          dropLSKey();
          return;
        }

        setIsCardRevealed(true);
        const imageList = [
          ...taroCardsSrcList
            .keys()
            .map((image, index) => ({ image: taroCardsSrcList(image), index })),
        ];
        const cardToDisplay = imageList.find(
          (_, index) => index === taroInformation.index
        );
        setCardToDisplaySrc(cardToDisplay);

        intervalId = setInterval(() => {
          const card = document.querySelector(".card");
          if (card) {
            card.classList.add("blooming-selected");
            card.style.opacity = 1;
            clearInterval(intervalId);
          }
        }, 300);
      }
    }
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="app">
      {!isCardRevealed ? (
        <>
          {isMobile && <CardsGridMobile />}
          {!isMobile && <CardsGridDesktop />}
        </>
      ) : (
        <>
          {initialTime && <Countdown initialTime={initialTime} />}
          <Card src={cardToDisplaySrc.image} isMain={isCardRevealed} />
        </>
      )}
    </div>
  );
}

export default App;
