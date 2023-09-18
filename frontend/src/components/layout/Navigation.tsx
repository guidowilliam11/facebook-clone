import { CurrentUserDetail } from "../../Context/CurrentUserContext";
import Footer from "./Footer";

const Navigation = () => {
  const currentUserValue = CurrentUserDetail();

  return (
    <div className="pl-3 flex flex-col justify-between items-start h-[calc(100vh-55px)] w-[20%] bg-transparent fixed left-0">
        <div>Navigation here</div>
        <Footer />
    </div>
  );
};

export default Navigation;
