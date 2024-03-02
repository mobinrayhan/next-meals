import SlideshowImage from "@/components/images/slideshow-image";
import MainHeader from "@/components/main-header/main-header";
import styles from "./index.module.css";
import Link from "next/link";

export default function HomePage() {
  return (
    <header className={styles.header}>
      <div className={styles.slideshow}>
        <SlideshowImage />
      </div>
      <div>
        <div className={styles.hero}>
          <h1>NextLevel Food</h1>
          <p>Taste & share food from all over the world</p>
        </div>
        <div className={styles.cta}>
          <Link href="/community">Join The Community</Link>
          <Link href="/meals">Explore Meals</Link>
        </div>
      </div>
    </header>
  );
}
