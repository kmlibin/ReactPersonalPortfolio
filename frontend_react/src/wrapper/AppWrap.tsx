import React from "react";

//components
import { NavigationDots, SocialMedia } from "../components";

//interfaces
import { IComponentProps } from "../models/model";

const AppWrap = (
  Component: React.ComponentType<IComponentProps>,
  idName?: string,
  classNames?: string
) => {
  const AppWrap: React.FC = () => (
    <div id={idName} className={`app__container ${classNames}`}>
      <SocialMedia />
      <div className="app__wrapper app__flex">
        <Component />
        <div className="copyright">
          <p className="p-text"> @2023 Kelli</p>
          <p className="p-text"> All rights reserved</p>
        </div>
      </div>
      <NavigationDots active={idName} />
    </div>
  );

  return AppWrap;
};

export default AppWrap;
