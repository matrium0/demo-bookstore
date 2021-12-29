import {Entity} from './Entity';

interface Author extends Entity {
  firstname: string;
  lastname: string;
  isPenName: boolean;
  gender: "MALE" | "FEMALE" | "NON-BINARY";
  birthdate: Date;
  placeOfBirth: string;
  dateOfDeath?: Date;
  placeOfDeath?: string;
  website?: string;

  note: string

  //TODO other field ideas
  // genres
}

export default Author;
