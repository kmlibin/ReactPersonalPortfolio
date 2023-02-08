import React, { useState, useEffect } from "react";

//libraries
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

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

  //handles moving from one testimonial to another
  const handleClick = (index: number) => {
    setCurrentIndex(index);
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
            <img src={urlFor(test.imgurl)} alt={test.name} />
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
