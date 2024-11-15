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
interface WorkExperience {
  _id: string;
  company: string;
  desc: string;
  name: string;
  year1: string;
  year2: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  key:string;
}

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<ISkills[]>([]);
  const [experience, setExperience] = useState<WorkExperience[]>([]);

  //connect to sanity
  useEffect(() => {
    const query = '*[_type == "workExperience"]';

    client.fetch<WorkExperience[]>(query).then((data) => {
      const sortedData = data.sort((a, b) => {
        // Handle comparison based on year1 or year2
        const yearA = parseInt(a.year1, 10) || 0; // Default to 0 if year1 is invalid
        const yearB = parseInt(b.year1, 10) || 0;
        return yearB - yearA; // Descending order
      });
      setExperience(sortedData);
    });

    const skillsQuery = '*[_type == "skills"]';
    client.fetch(skillsQuery).then((data) => setSkills(data));
  }, []);

  console.log(experience);
  return (
    <>
      <h2 className="head-text">
        Skills <span>&</span> Experiences
      </h2>

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
          {experience.map((experience, index) => (
            <motion.div className="app__skills-exp-item" key={experience._id}>
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year1}</p>{" "}
                {experience.year2 && experience.year2 != "none" ? (
                  <p>&nbsp;- {experience.year2}</p>
                ) : null}
              </div>
              <motion.div className="app__skills-exp-works">
                <>
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5 }}
                    className="app__skills-exp-work"
                    data-tip
                    data-for={experience._id}
                    key={experience.key}
                  >
                    <h4 id={experience._id}>{experience.name}</h4>
                    <p className="p-text">{experience.company}</p>
                  </motion.div>
                  <Tooltip
                    anchorId={experience._id}
                    data-tooltip-place="top"
                    data-tooltip-variant="#fff"
                    className="skills-tooltip"
                    content={experience.desc}
                  />
                </>
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
