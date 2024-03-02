import { useRef, useState } from "react";
import styles from "./index.module.css";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";
import slugify from "slugify";
import { useRouter } from "next/router";
import ImagePicker from "@/components/meals/image-picker";
import Head from "next/head";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default function MealsSharePage() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);

  const nameRef = useRef();
  const emailRef = useRef();
  const titleRef = useRef();
  const summaryRef = useRef();
  const instructionsRef = useRef();

  async function handleSubmitImage(eve) {
    eve.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const title = titleRef.current.value;
    const summary = summaryRef.current.value;
    const instructions = instructionsRef.current.value;

    if (
      !name ||
      !email ||
      !title ||
      !summary ||
      !instructions ||
      image.length <= 0 ||
      !validateEmail(email)
    ) {
      return null;
    }

    try {
      setError("");
      setIsLoading(true);
      const imageName = `images/${image.name}-MOBIN-${crypto.randomUUID()}`;

      const imageFirebaseRef = ref(storage, imageName);
      const uploadedImage = await uploadBytes(imageFirebaseRef, image);
      const imageUrl = await getDownloadURL(uploadedImage.ref);

      const slug = slugify(title, { lower: true });
      const response = await fetch("/api/meals", {
        method: "POST",
        body: JSON.stringify({
          title,
          slug,
          creator: name,
          creator_email: email,
          image: imageUrl,
          summary,
          instructions,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);

      if (response.ok) {
        eve.target.reset();
        push("/meals");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message || "Something  Went Wrong 😢");
    }
  }

  return (
    <>
      <Head>
        <title>Share Your Favorite Meal</title>
        <meta
          name="description"
          content="Meal sharing page. for sharing meal"
        />
      </Head>
      <header className={styles.header}>
        <h1>
          Share your <span className={styles.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmitImage}>
          <div className={styles.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input
                disabled={isLoading}
                required
                type="text"
                id="name"
                name="name"
                ref={nameRef}
              />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input
                disabled={isLoading}
                required
                type="email"
                id="email"
                name="email"
                ref={emailRef}
              />
            </p>
          </div>
          <p>
            <label disabled={isLoading} htmlFor="title">
              Title
            </label>
            <input
              required
              type="text"
              id="title"
              name="title"
              ref={titleRef}
            />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input
              disabled={isLoading}
              required
              type="text"
              id="summary"
              name="summary"
              ref={summaryRef}
            />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              disabled={isLoading}
              required
              id="instructions"
              name="instructions"
              rows="10"
              ref={instructionsRef}
            ></textarea>
          </p>

          <ImagePicker
            label="Share Image"
            name="image"
            handleImage={(eve) => setImage(eve)}
            isLoading={isLoading}
          />
          <p className={styles.actions}>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Share Meal"}
            </button>
          </p>
        </form>
      </main>
    </>
  );
}
