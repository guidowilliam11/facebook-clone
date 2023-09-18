import { CurrentUserDetail } from "../../Context/CurrentUserContext";

const FriendContext = () => {
  const currentUserValue = CurrentUserDetail();

  return (
    <div className="bg-white h-screen w-[40%] mx-auto">
      <div>Friend</div>
      <div>{currentUserValue?.user?.email}</div>
    </div>
  );
};

export default FriendContext;
