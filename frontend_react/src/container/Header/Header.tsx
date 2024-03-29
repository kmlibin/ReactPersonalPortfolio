import React from "react";

//libraries
import { motion } from "framer-motion";

//images
import { images } from "../../constants";

//components, pages, wrappers
import { AppWrap } from "../../wrapper";

//styles
import "./Header.scss";

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const Header: React.FC = () => {
  return (
    <div className="app__header app__flex">
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <span>👋🏻</span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hey, I'm </p>
              <h1 className="head-text">Kelli</h1>
            </div>
          </div>
          <div className="tag-cmp app__flex">
            <p className="p-text">FullStack / Frontend Dev</p>
            <p className="p-text">Keen Bread Baker</p>
            <p className="p-text">Cat Herder</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__header-img"
      >
        <img src={images.profile} alt="profile_bg" />
        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: "easeInOut" }}
          src={images.circle}
          alt="profile_circle"
          className="overlay_circle"
        />
      </motion.div>

      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className="app__header-circles"
      >
        {[images.nodelogo, images.react, images.typescript].map((item, index) => (
          <div className="circle-cmp app__flex" key={`circle-${index}`}>
            <img src={item} alt="circle" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

//pass in header to appwrap, and home as the id
export default AppWrap(Header, "home");
