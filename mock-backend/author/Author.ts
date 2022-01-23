import {Entity} from './Entity';
import {DateTime} from 'luxon';

interface Author extends Entity {
  firstname: string;
  lastname: string;
  penName: boolean;
  fullRealName?: string;
  gender: "MALE" | "FEMALE" | "NON_BINARY";
  birthdate: DateTime;
  placeOfBirth: string;
  dateOfDeath?: DateTime;
  placeOfDeath?: string;
  website?: string;
  note: string;
  genre: string;
  foto: Blob;

  //TODO other field ideas
  // genres
}

export default Author;
