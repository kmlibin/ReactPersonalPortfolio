import React, { useState, useEffect } from "react";

//libraries
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { motion } from "framer-motion";

//interfaces
import { ITestimonial } from "../../models/model";

//components and pages
import { AppWrap, MotionWrap } from "../../wrapper";

//sanity
import { urlFor, client } from "../../client";

//styles
import "./Testimonial.scss";

const Testimonial: React.FC = () => {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fadeKey, setFadeKey] = useState(0);

  //handles moving from one testimonial to another, also controls the fade of images
  const handleClick = (index: number) => {
    setCurrentIndex(index);
    setFadeKey((prevKey) => prevKey + 1);
  };

  //set up queries and connect to sanity
  const query: string = '*[_type == "testimonials"]';

  useEffect(() => {
    client.fetch(query).then((data) => {
      setTestimonials(data);
    });
  }, []);

  //will show one testimonial at a time, based on index
  const test: ITestimonial = testimonials[currentIndex];
  return (
    <>
      {testimonials.length && (
        <>
          <div className="app__testimonial-item app__flex">
            <motion.img
              src={urlFor(test.imgurl)}
             
              key={fadeKey}
              alt={test.name}
              initial={{ opacity: 0, scale: 0.8 }} // Start slightly smaller and invisible
              animate={{ opacity: 1, scale: 1 }} // End fully visible and normal size
              transition={{ duration: 1 }} // Customize duration for the image
            />
            <div className="app__testimonial-content">
              <p className="p-text">{test.feedback}</p>
              <div>
                <h4 className="bold-text">{test.name}</h4>
                <h5 className="p-text">{test.company}</h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>

            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, "app__testimonial"),
  "testimonial",
  "app__whitebg"
);
