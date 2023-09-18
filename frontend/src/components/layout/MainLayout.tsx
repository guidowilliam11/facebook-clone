import Header from "./Header";
import Footer from "./Footer";
import UserDetailProvider from "../../Context/CurrentUserContext";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  
  return (
    <UserDetailProvider>
      <Header />
      <div className="h-[55px]"></div>
      {children}
    </UserDetailProvider>
  );
};

export default MainLayout;
