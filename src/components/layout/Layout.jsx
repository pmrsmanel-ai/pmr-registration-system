import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({
  children,
  settings = {},
}) {
  return (
    <>
      <Navbar settings={settings} />

      <main>{children}</main>

      <Footer settings={settings} />
    </>
  );
}

export default Layout;