import { Link } from "react-router-dom";
import { CurrentUserDetail } from "../../Context/CurrentUserContext";

const Contact = () => {
  const currentUserValue = CurrentUserDetail();

  return (
    <div className=" w-[20%] bg-transparent h-[calc(100vh-55px)] fixed right-0">
        <div>Contact here</div>
    </div>
  );
};

export default Contact;
