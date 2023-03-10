import React from "react";

const NavigationDots = ({ active }) => {
  return (
    <div className="app__navigation">
    {['home', 'about', 'work', 'skills', 'testimonial', 'contact'].map((item, index) => (
      <a
        href={`#${item}`}
        key={item + index}
        className="app__navigation-dot"
        style={active === item ? { backgroundColor: '#0c7b59' } : {}}
      />
    ))}
  </div>
);
};

export default NavigationDots;
