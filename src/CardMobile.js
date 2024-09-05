import backSrc from "./assets/back.jpg";
import { useCallback, useEffect, useState } from "react";
import { getRandomUniqueElements } from "./utils/index";
import { setLocalStorageKey } from "./utils/index";

import { memo } from "react";
const taroCardsSrcList = require.context("./assets/cards", true);
const cardsCount = 24;
const rotationAnimationTiming = 3000;
const CardMobileComponent = ({ revealCard }) => {
  const [cardsList, setCardsList] = useState([]);
  const radomizeArrayElements = useCallback(getRandomUniqueElements, []);

  const setRandomUniqueCards = useCallback(() => {
    const imageList = taroCardsSrcList
      .keys()
      .map((image, index) => ({ image: taroCardsSrcList(image), index }));
    const finalImages = radomizeArrayElements(imageList, cardsCount);
    setCardsList(finalImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRandomUniqueCards();
  }, [setRandomUniqueCards]);

  useEffect(() => {
    if (cardsList.length > 0 && revealCard === true) {
      const frontCards = document.querySelectorAll(".card-front-mobile");
      const cardMobile = document.querySelector(".card-mobile");
      const arr = [...frontCards];

      const animationDelay = rotationAnimationTiming / cardsCount;
      arr.forEach((elem, index) => {
        setTimeout(
          () => (elem.style.opacity = 1),
          1000 + animationDelay * index
        );
      });

      setTimeout(
        () => setLocalStorageKey(cardsList.pop().index),
        1000 + animationDelay * arr.length
      );

      setTimeout(() => cardMobile.classList.add("animated-card-mobile"), 1000);
    }
  }, [cardsList, revealCard]);

  return (
    <div className="card-mobile">
      {cardsList.map((card, index) => (
        <img
          src={card.image}
          key={index}
          alt="taro-card-front"
          className="card-front-mobile"
        />
      ))}

      <img src={backSrc} alt="taro-card-back" className="card-back" />
    </div>
  );
};

const CardMobile = memo(CardMobileComponent);
export default CardMobile;
