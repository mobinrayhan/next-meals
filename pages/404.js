export default function NotFoundPage({ title, message }) {
  return (
    <main className="not-found">
      <h1>{title || "404. Not Found"}</h1>
      <p>
        {message || "Unfortunately , we could not found the requested page!"}
      </p>
    </main>
  );
}
// export default function NotFoundPage({ title, message }) {
//   return (
//     <main className="not-found">
//       <h1>404. Not Found</h1>
//       <p>Unfortunately , we could not found the requested page!</p>
//     </main>
//   );
// }
