import ReactModal from "react-modal";
import styles from "./ImageModal.module.css";

ReactModal.setAppElement("#root");

const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <ReactModal
      isOpen={!!image}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className={styles.modalContent}>
        <img
          src={image.urls.regular}
          alt={image.alt_description || "Image"}
          className={styles.image}
        />
        <div className={styles.textContent}>
          <p>{image.description || "No description available"}</p>
          <p>Author: {image.user.name}</p>
          <p>Likes: {image.likes}</p>
        </div>
      </div>
    </ReactModal>
  );
};

export default ImageModal;
