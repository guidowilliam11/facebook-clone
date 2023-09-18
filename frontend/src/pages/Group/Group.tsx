import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import MainLayout from "../../components/layout/MainLayout";
import Contact from "../../components/layout/Contact";
import Navigation from "../../components/layout/Navigation";
import GroupContext from "./GroupContent";

export function Group() {
  return (
    <MainLayout>
      <div className="flex w-screen justify-between bg-lgray">
        <Navigation></Navigation>
        <GroupContext></GroupContext>
        <Contact></Contact>
      </div>
    </MainLayout>
  );
}
