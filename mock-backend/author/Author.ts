import {Entity} from './Entity';
import {DateTime} from 'luxon';

export class Author implements Entity {
  id?: number;
  firstname?: string;
  lastname?: string;
  penName?: boolean;
  fullRealName?: string;
  gender?: "MALE" | "FEMALE" | "NON_BINARY";
  birthdate?: DateTime;
  placeOfBirth?: string;
  dateOfDeath?: DateTime;
  placeOfDeath?: string;
  website?: string;
  note?: string;
  genre?: string;
  foto?: Blob;
}
