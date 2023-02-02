import React, { useEffect, useState } from "react";

//libraries
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

//components, pages, wrappers
import { AppWrap, MotionWrap } from "../../wrapper";

//interfaces
import { ISkills, IExperience } from "../../models/model";

//sanity
import { urlFor, client } from "../../client";

//styles
import "./Skills.scss";
import "react-tooltip/dist/react-tooltip.css";

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<ISkills[]>([]);
  const [experience, setExperience] = useState<IExperience[]>([]);

  //connect to sanity
  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      setExperience(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="app__skills-exp">
          {experience.map((experience) => (
            <motion.div className="app__skills-exp-item" key={experience.year}>
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.name}
                      key={work.name}
                    >
                      <h4 id={work.name}>
                        {work.name}
                      </h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <Tooltip
                      anchorId={work.name}
                      data-tooltip-place="top"
                      data-tooltip-variant="#fff"
                      className="skills-tooltip"
                      content={work.desc}
                    />
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__primarybg"
);
