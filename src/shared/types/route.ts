import { ComponentType, ReactNode } from 'react';

export type IRoute = {
  icon: ReactNode | JSX.Element;
  path: string;
  name: string;
  component: ComponentType<any>;
};
