import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import MarketContent from "./MarketContent";
import MainLayout from "../../components/layout/MainLayout";
import Contact from "../../components/layout/Contact";
import Navigation from "../../components/layout/Navigation";

export function Marketplace() {
  return (
    <MainLayout>
      <div className="flex w-screen justify-between bg-lgray">
        <Navigation></Navigation>
        <MarketContent></MarketContent>
        <Contact></Contact>
      </div>
    </MainLayout>
  );
}
