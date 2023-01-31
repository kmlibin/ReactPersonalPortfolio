interface IAsset {
  asset: {
    _ref: string;
    _type?: string;
  };
}

export interface IComponentProps {
  idName?: string;
  classNames?: string;
}

export interface ISkills {
  bgColor: string;
  icon: IAsset;
  name: string;
}

//for skills.tsx ...since the code later maps within a map, had to split into two interfaces.
export interface IWork {
  company: string;
  desc: string;
  name: string;
}

export interface IExperience {
  works: IWork[];
  year: string;
}

//for testimonial.tsx
export interface ITestimonial {
  company: string;
  feedback: string;
  imgurl: IAsset;
  name: string;
}

export interface IBrand {
  imgUrl: IAsset;
  name: string;
  _id: string;
}

//for work.tsx
export interface IAnimateCard {
  y: number;
  opacity: number;
}

export interface IWorks {
  codeLink: string;
  description: string;
  imgUrl: IAsset;
  projectLink: string;
  tags: [string[] | string];
  title: string;
  name?: string;
}
