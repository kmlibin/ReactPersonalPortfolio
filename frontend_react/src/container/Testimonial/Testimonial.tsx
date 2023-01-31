import React, { useState, useEffect } from "react";

//libraries
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

//components and pages
import { AppWrap, MotionWrap } from "../../wrapper";

//sanity
import { urlFor, client } from "../../client";

//styles
import "./Testimonial.scss";

interface ITestimonial {
  company: string,
  feedback: string,
  imgurl: {
    asset: {
      _ref: string
    }
  },
  name: string
}

interface IBrand {
  imgUrl: {
    asset: {
      _ref: string
    },
  },
  name: string,
  _id: string,
}

const Testimonial: React.FC = () => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  //handles moving from one testimonial to another
  const handleClick = (index: number) => {
    setCurrentIndex(index);
  };

  //set up queries and connect to sanity
  const query: string = '*[_type == "testimonials"]';
  const brandsQuery: string = '*[_type == "brands"]';

  useEffect(() => {
    client.fetch(query).then((data) => {
      setTestimonials(data);
      
    });

    client.fetch(brandsQuery).then((data) => {
      setBrands(data);
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
            <div className="app__flex" onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
              <HiChevronLeft />
            </div>

            <div className="app__flex" onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: 'tween' }}
            key={brand._id}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, 'app__testimonial'),
  'testimonial',
  'app__primarybg',
);