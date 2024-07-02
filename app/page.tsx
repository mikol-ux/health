import React from "react";
import AuroraBackgroundDemo from "../components/Hero";
import Nav from "@/components/navbar";
import Header from "@/components/Header";
import About from "@/components/About";
import Clients from "@/components/Clients";

const Home = () => {
  return (
    <main>
      <Header />
      <AuroraBackgroundDemo />
      <About />
      <Clients />
    </main>
  );
};

export default Home;
