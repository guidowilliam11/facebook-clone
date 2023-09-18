import { CurrentUserDetail } from "../../Context/CurrentUserContext";

const GroupContext = () => {
  const currentUserValue = CurrentUserDetail();

  return (
    <div className="bg-white h-screen w-[40%] mx-auto">
      <div>Group</div>
      <div>{currentUserValue?.user?.email}</div>
    </div>
  );
};

export default GroupContext;
