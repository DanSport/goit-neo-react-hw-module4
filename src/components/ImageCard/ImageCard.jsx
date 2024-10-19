import styles from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => {
  return (
    <li className={styles.imageCard} onClick={() => onClick(image)}>
      <div>
        <img src={image.urls.small} alt={image.alt_description} />
      </div>
    </li>
  );
};

export default ImageCard;
