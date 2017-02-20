import { Parameter } from './parameter';

export interface DscItem {
  getId() : string;
  getName() : string;
  getType() : string;
  setDscName(name : string) : void;
  getDscName(): string;
  getImports(): string[];
  getComments(): string[];
  serialize() : string;
}