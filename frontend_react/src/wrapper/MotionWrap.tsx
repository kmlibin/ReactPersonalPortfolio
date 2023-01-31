import React from "react";

//libraries
import { motion } from "framer-motion";

//interfaces
import { IComponentProps } from "../models/model";

const MotionWrap = (
  Component: React.ComponentType<IComponentProps>,
  classNames?: string
) => {
  const MotionWrap: React.FC = () => (
    <motion.div
      whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
      transition={{ duraction: 0.5 }}
      className={`${classNames} app__flex`}
    >
      <Component />
    </motion.div>
  );
  return MotionWrap;
};

export default MotionWrap;
