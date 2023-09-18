import { ReactNode } from "react";
import { CurrentUserDetail } from "../../Context/CurrentUserContext";

const MarketContent = () => {
  const currentUserValue = CurrentUserDetail();

  return (
    <div className="bg-white h-screen w-[40%] mx-auto">
      <div>Market</div>
      <div>{currentUserValue?.user?.email}</div>
    </div>
  );
};

export default MarketContent;
