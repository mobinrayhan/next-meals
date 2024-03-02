import styles from "./main-header.module.css";
import Link from "next/link";

import NavLink from "./nav-link";
import Image from "next/image";
import LogoImage from "@/assets/logo.png";
import MainHeaderBackground from "./main-header-background";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />

      <header className={styles.header}>
        <Link className={styles.logo} href="/">
          <Image src={LogoImage} alt="A Plate of food on it" priority />
          <span>Foodies Community</span>
        </Link>

        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
