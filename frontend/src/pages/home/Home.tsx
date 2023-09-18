import HomeContent from "./HomeContent";
import MainLayout from "../../components/layout/MainLayout";
import Contact from "../../components/layout/Contact";
import Navigation from "../../components/layout/Navigation";

export function Home() {
  return (
    <MainLayout>
      <div className="flex w-screen justify-between bg-lgray">
        <Navigation></Navigation>
        <HomeContent></HomeContent>
        <Contact></Contact>
      </div>
    </MainLayout>
  );
}
