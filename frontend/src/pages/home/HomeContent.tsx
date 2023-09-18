import { CurrentUserDetail } from "../../Context/CurrentUserContext";

const HomeContent = () => {
  const currentUserValue = CurrentUserDetail();

  return (
    <div className="bg-white h-screen w-[40%] mx-auto">
      <div>Home</div>
      <div>{currentUserValue?.user?.email}</div>
    </div>
  );
};

export default HomeContent;
