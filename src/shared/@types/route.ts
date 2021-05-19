import { ComponentType, ReactNode } from 'react';

export type IRoute = {
  icon: ReactNode;
  path: string;
  name: string;
  component: ComponentType<any>;
};
