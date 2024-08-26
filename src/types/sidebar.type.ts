import { ReactNode } from "react";

export type TSidebarItem = {
  key: string;
  label: ReactNode;
};
export type TSidebar = {
  key: string;
  label: ReactNode;
};

export type TUserPath = {
  path: string;
  element: ReactNode;
  name?: string;
};
export type TRoute = {
  path: string;
  element: ReactNode;
};
