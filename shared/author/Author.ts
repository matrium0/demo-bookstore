import {Entity} from './Entity';

interface Author extends Entity{
  firstname: string;
  lastname: string;
  isPenName: boolean;
  birthDate: Date;
  birthLocation: string;
  website: string;

  note: string

  //TODO other field ideas
  // genres
}

export default Author;
