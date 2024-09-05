import backSrc from "./assets/back.jpg";
const Card = ({ src, isMain }) => {
  return (
    <div
      className={(isMain ? "card-main" : "") + " card"}
      style={
        isMain
          ? { transform: "translate(-50%, -50%) scale(2.5) rotateY(0deg)" }
          : {}
      }
    >
      <img src={src} alt="taro-card-front" className="card-front" />
      <img src={backSrc} alt="taro-card-back" className="card-back" />
    </div>
  );
};
export default Card;
