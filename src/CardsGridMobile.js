import { memo, useCallback, useEffect, useState } from "react";
import CardMobile from "./CardMobile";
import "./styles/cardsMobile.css";

const CardsGridMobileComponent = ({ cardRevealed }) => {
  const [revealCard, setRevealCard] = useState(cardRevealed);

  function hideRevealCard() {
    const btn = document.querySelector(".reveal-card-btn");
    btn.style.opacity = 0;
  }

  const onRevealCardClick = useCallback(() => {
    hideRevealCard();
    setRevealCard(true);
  }, []);

  return (
    <>
      <button className="reveal-card-btn" onClick={onRevealCardClick}>
        Reveal your card
      </button>
      <div alt="star" className="star" />
      <div className="mystical-frame">
        <CardMobile revealCard={revealCard} />
      </div>
    </>
  );
};

const CardsGridMobile = memo(CardsGridMobileComponent);
export default CardsGridMobile;
