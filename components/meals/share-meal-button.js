export default function ShareMealButton({ isLoading }) {
  return (
    <button type="submit" disabled={isLoading}>
      {isLoading ? "Submitting..." : "Share Meal"}
    </button>
  );
}
