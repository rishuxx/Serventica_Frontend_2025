import React from "react";
import Banner from "../components/Banner";
import Categories from "./Categories";
import CatRepair from "./CatRepair";
import CatOndemand from "./CatOndemand";

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <CatRepair />
      <CatOndemand />
    </div>
  );
};

export default Home;
