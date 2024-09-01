import backSrc from "./assets/back.jpg";
const Card = ({ src }) => {
  return (
    <div className="card">
      <img src={src} alt="taro-card-front" className="card-front" />
      <img src={backSrc} alt="taro-card-back" className="card-back" />
    </div>
  );
};
export default Card;
