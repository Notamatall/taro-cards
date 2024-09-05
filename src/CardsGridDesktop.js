import { memo } from "react";
import { useCallback, useEffect, useState } from "react";
import { cardWidth, cardHeight, gapBetweenCards } from "./constants";
import Card from "./Card";
import { setLocalStorageKey } from "./utils/index";
import { getRandomUniqueElements, generateRandomArray } from "./utils/index";
import "./styles/cards.css";

const taroCardsSrcList = require.context("./assets/cards", true);

const CardsGridDesktopComponent = ({ cardInfo }) => {
  const [cardsList, setCardsList] = useState([]);
  const [isAnimationInProcress, setIsAnimationInProcress] = useState();

  const radomizeArrayElements = useCallback(getRandomUniqueElements, []);
  const radomizeArray = useCallback(generateRandomArray, []);

  const setRandomUniqueCards = useCallback(() => {
    if (!isAnimationInProcress) {
      const { itemsPerColumn } = getHeightStartingDimensions();
      const { itemsPerRow } = getWidthStartingDimensions();
      const imageList = taroCardsSrcList
        .keys()
        .map((image, index) => ({ image: taroCardsSrcList(image), index }));
      const cardsCount = itemsPerColumn * itemsPerRow;
      const finalImages = radomizeArrayElements(imageList, cardsCount);
      setCardsList(finalImages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimationInProcress]);

  useEffect(() => {
    if (!cardInfo) {
      setRandomUniqueCards();
      window.addEventListener("resize", setRandomUniqueCards);
    }
    return () => window.removeEventListener("resize", setRandomUniqueCards);
  }, [setRandomUniqueCards, cardInfo]);

  function hideRevealCard() {
    const btn = document.querySelector(".reveal-card-btn");
    btn.style.opacity = 0;
  }

  function getWidthStartingDimensions() {
    const width = window.innerWidth;
    const itemsPerRowWithoutGap = Math.floor(width / cardWidth);
    let itemsPerRow = itemsPerRowWithoutGap;

    let cardsGridWidth =
      itemsPerRowWithoutGap * cardWidth +
      (itemsPerRowWithoutGap - 1) * gapBetweenCards;
    let widthWithGap =
      itemsPerRowWithoutGap * cardWidth +
      (itemsPerRowWithoutGap + 1) * gapBetweenCards;
    while (widthWithGap > width) {
      itemsPerRow--;
      widthWithGap =
        itemsPerRow * cardWidth + (itemsPerRow + 1) * gapBetweenCards;
      cardsGridWidth =
        itemsPerRow * cardWidth + (itemsPerRow - 1) * gapBetweenCards;
    }
    const left = (width - cardsGridWidth) / 2;
    return { left, itemsPerRow };
  }

  function getHeightStartingDimensions() {
    const height = window.innerHeight;
    const itemsPerColumnWithoutGap = Math.floor(height / cardHeight);
    let itemsPerColumn = itemsPerColumnWithoutGap;

    let cardsRowHeight =
      itemsPerColumnWithoutGap * cardHeight +
      (itemsPerColumnWithoutGap - 1) * gapBetweenCards;
    let heightWithGap =
      itemsPerColumnWithoutGap * cardHeight +
      (itemsPerColumnWithoutGap + 1) * gapBetweenCards;
    while (heightWithGap > height) {
      itemsPerColumn--;
      heightWithGap =
        itemsPerColumn * cardHeight + (itemsPerColumn + 1) * gapBetweenCards;
      cardsRowHeight =
        itemsPerColumn * cardHeight + (itemsPerColumn - 1) * gapBetweenCards;
    }
    const top = (height - cardsRowHeight) / 2;
    return { top, itemsPerColumn };
  }

  const stackCards = () => {
    setIsAnimationInProcress(true);
    const { itemsPerRow, left } = getWidthStartingDimensions();
    const { top } = getHeightStartingDimensions();
    hideRevealCard();

    const halfBloomBall = 8;
    const cards = document.querySelectorAll(".card");
    const star = document.querySelector(".star");
    const lastCardsIndex = cards.length - 1;
    setTimeout(() => {
      cards.forEach((element, index) => {
        const row = Math.ceil((index + 1) / itemsPerRow);
        const column = (index + 1) % itemsPerRow || itemsPerRow;
        const elementLeft =
          left + (column - 1) * cardWidth + (column - 1) * gapBetweenCards;
        const elementTop =
          top + (row - 1) * cardHeight + (row - 1) * gapBetweenCards;

        setTimeout(() => {
          element.style.left = `${elementLeft}px`;
          element.style.top = `${elementTop}px`;
          element.style.transform = "translate(0, 0) scale(1) rotateY(180deg)";
          let lastCard = null;
          let lastImageIndex = null;

          if (lastCardsIndex === index) {
            setTimeout(() => {
              star.style.opacity = 1;
              const randomCardsIndexes = radomizeArray(lastCardsIndex);
              setTimeout(() => {
                for (let ind = 0; ind < randomCardsIndexes.length; ind++) {
                  const randomCardIndex = randomCardsIndexes[ind];
                  const card = cards[randomCardIndex];
                  lastCard = card;
                  lastImageIndex = cardsList[randomCardIndex].index;

                  setTimeout(() => {
                    star.style.left =
                      Number.parseInt(card.style.left) +
                      cardWidth / 2 -
                      halfBloomBall +
                      "px";

                    star.style.top =
                      Number.parseInt(card.style.top) +
                      cardHeight / 2 -
                      halfBloomBall +
                      "px";

                    setTimeout(() => {
                      card.style.transform =
                        "translate(0, 0) scale(1) rotateY(0deg)";
                      card.classList.add("card-bloom");
                    }, 1000);
                  }, 500 + ind * 1500);
                }
              }, 1000);

              setTimeout(() => {
                const card = lastCard;
                star.style.display = "none";
                card.classList.add("blooming-selected");
                card.style.transform =
                  "translate(-50%, -50%) scale(2.5) rotateY(0deg)";
                card.style.left = "50%";
                card.style.top = "50%";
                card.style.filter = "none";
                card.style.zIndex = "2";
                setLocalStorageKey(lastImageIndex);
              }, 2500 + randomCardsIndexes.length * 1500);
            }, 1500);
          }
        }, index * 50);
      });
    }, 1000);
  };

  return (
    <>
      <button className="reveal-card-btn" onClick={stackCards}>
        Reveal your card
      </button>
      <div alt="star" className="star" />

      <div className="cards-container">
        <div className="deck">
          {cardsList.map((elem, index) => (
            <Card src={elem.image} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

const CardsGridDesktop = memo(CardsGridDesktopComponent);
export default CardsGridDesktop;
