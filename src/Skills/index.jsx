import "./index.css";

import React from "react";

const Skills = (props) => {
  const { skillsDetails } = props;

  return (
    <li className="skill-items-container">
      <div className="individual-skill">
        <img alt={skillsDetails.name} src={skillsDetails.image_url} />
        <p>{skillsDetails.name}</p>
      </div>
    </li>
  );
};

export default Skills;