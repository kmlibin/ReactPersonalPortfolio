import React from "react";

//containers and components
import { About, Footer, Header, Skills, Testimonial, Work } from "./container";
import { Navbar } from "./components";

//styles
import './App.scss';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default App;
