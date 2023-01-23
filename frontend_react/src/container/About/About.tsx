//2 fixes

import React, { useState, useEffect } from "react";
import { urlFor, client } from "../../client";

import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";

//styles
import "./About.scss";

import { images } from "../../constants";


const About = () => {
  //create a type for this dataset?
  const [abouts, setAbouts] = useState<any>([]);

  //sanity query and fetch
  useEffect(() => {
    const query : string = '*[_type == "abouts"]';
    console.log(query);
    client.fetch(query).then((data : any) => {
      console.log(data);
      setAbouts(data);
      console.log(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        I know that <span>good dev</span>
        <br /> means <span>good business</span>
      </h2>

      <div className="app__profiles">
        {abouts.map((about : any, index: number) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
            key={about.title + index}
          >
            
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
