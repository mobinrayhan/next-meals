import NotFoundPage from "@/components/not-found";
import styles from "./index.module.css";
import { getMeal, getMeals } from "@/lib/meals";
import Image from "next/image";

export default function MealDetailPage({ meal: singleMeal, error }) {
  if (error) {
    return <NotFoundPage title={error.title} message={error.message} />;
  }

  const meal = JSON.parse(singleMeal);

  // meal.instructions = meal.instructions
  //   .split("\n")
  //   .filter((ins) => Boolean(ins))
  //   .map((ins) => {
  //     return ins + "<br/> <br/>";
  //   })
  //   .join("");

  meal.instructions = meal.instructions.replace(/\n/g, "<br/>");

  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={styles.headerText}>
          <h1>{meal.title}</h1>
          <p className={styles.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={styles.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={styles.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const meals = await getMeals();
  const paths = meals.map(({ slug }) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: "blocking", // false or true
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const meal = await getMeal(slug);

  if (!meal) {
    return {
      props: {
        error: {
          title: "Meal not found",
          message: "Unfortunately, This Meal no longer exists!",
        },
      },
    };
  }

  return {
    props: {
      meal: JSON.stringify(meal),
    },
    revalidate: 10,
  };
}
