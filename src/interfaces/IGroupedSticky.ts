import { ISticky } from './ISticky';

export interface IGroupedSticky {
  id: string;
  stickies: ISticky[]
  top: string;
  left: string;
};