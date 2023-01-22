import React, {useState, useEffect} from 'react';

//libraries
import { motion } from "framer-motion";
import {HiChevronLeft, HiChevronRight} from 'react-icons/hi'

//components and pages
import { AppWrap, MotionWrap } from "../../wrapper";

//sanity
import { urlFor, client } from "../../client";

//styles
import './Testimonial.scss'

const Testimonial = () => {
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const query = '*[type == "testimonials"]';
  const brandsQuery = '*[type == "brands"]';

  useEffect(() => {
    client.fetch(query).then((data) => {
      setTestimonials(data);
    })

    client.fetch(brandsQuery).then((data) => {
      setBrands(data);
    })
  }, []);
  return (
    <div>Testimonial</div>
  )
}


export default AppWrap(
  MotionWrap(Testimonial, "app__testimonials"),
  "testimonial",
  "app__primarybg"
);