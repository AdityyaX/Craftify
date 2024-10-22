import Footer from "../footer/Footer"
import Navbart from '../Navbar/navbar'

const Layout = ({children}) => {
  return (
    <div>
      <Navbart />
      <div className="container mx-auto px-6">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout
