import {Entity} from './Entity';
import {DateTime} from 'luxon';

interface Author extends Entity {
  firstname: string;
  lastname: string;
  penName: boolean;
  gender: "MALE" | "FEMALE" | "NON-BINARY";
  birthdate: DateTime;
  placeOfBirth: string;
  dateOfDeath?: DateTime;
  placeOfDeath?: string;
  website?: string;
  note: string
  foto: Blob;

  //TODO other field ideas
  // genres
}

export default Author;
