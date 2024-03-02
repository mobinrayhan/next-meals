import { useRef, useState } from "react";
import styles from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name, isLoading, handleImage }) {
  const [pickedImage, setPickedImage] = useState();

  const imageInput = useRef();

  function handelPickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    handleImage(file);
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={`${styles.preview} ${isLoading ? "loading" : ""}`}>
          {!pickedImage && <p>No picked image yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill
            />
          )}
        </div>
        <input
          className={styles.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button
          disabled={isLoading}
          className={styles.button}
          type="button"
          onClick={handelPickClick}
        >
          Pick an image
        </button>
      </div>
    </div>
  );
}
