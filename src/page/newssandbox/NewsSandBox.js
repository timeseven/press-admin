import React from "react";
import { redirect } from "react-router-dom";
import SideMenu from "../../components/newssandbox/SideMenu";
import TopHeader from "../../components/newssandbox/TopHeader";

const NewsSandBox = () => {
  return (
    <div>
      <SideMenu />
      <TopHeader />
    </div>
  );
};

// News SandBox loader
const newsSandBoxLoader = () => {
  if (!localStorage.getItem("token")) {
    console.log("no authority", localStorage.getItem("token"));
    return redirect("/login");
  }
  return null;
};

export { newsSandBoxLoader };
export default NewsSandBox;
