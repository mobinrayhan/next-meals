"use client";

import Link from "next/link";
import styles from "./nav-link.module.css";
import { useRouter } from "next/router";

export default function NavLink({ href, children }) {
  const { pathname } = useRouter();

  return (
    <Link
      href={href}
      className={pathname.startsWith(href) ? styles.active : ""}
    >
      {children}
    </Link>
  );
}
