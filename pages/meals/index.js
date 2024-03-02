import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import Link from "next/link";

import styles from "./index.module.css";
import Head from "next/head";

export default function MealsPage({ meals }) {
  return (
    <>
      <Head>
        <title>A list of meal</title>
        <meta name="description" content="A list of delicious food" />
      </Head>
      <header className={styles.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={styles.highlight}>by Mobin</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={styles.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <MealsGrid meals={JSON.parse(meals)} />
    </>
  );
}

export async function getStaticProps() {
  const meals = await getMeals();

  return {
    props: {
      meals: JSON.stringify(meals),
    },

    revalidate: 60, // it is revalidate after 1
  };
}

// export async function getServerSideProps() {
//   const { meals } = await getMeals();

//   return {
//     props: {
//       meals,
//     },
//   };
// }
