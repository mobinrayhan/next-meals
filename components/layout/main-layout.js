import MainHeader from "../main-header/main-header";

export default function Layout({ children }) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
}
