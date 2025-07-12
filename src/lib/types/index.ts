export interface Command {
  description: string;
  command: string;
  note?: string;
}

export interface Tip {
  title: string;
  content: string;
}

export interface Category {
  title: string;
  icon?: string;
  commands?: Command[];
  tip?: Tip;
}

export interface CheatSheetData {
  title: string;
  description?: string;
  icon?: string;
  categories: Category[];
}

export interface CheatSheetTemplate extends CheatSheetData {
  id: string;
  name: string;
}

export type Theme = 'blue' | 'green' | 'orange' | 'purple' | 'pink' | 'dark';

export interface ThemeConfig {
  gradient: string;
  primary: string;
  name: string;
}

export type ValidationError = {
  message: string;
  path?: string;
};