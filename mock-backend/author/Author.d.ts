import { Entity } from './Entity';
import { DateTime } from 'luxon';
interface Author extends Entity {
    firstname: string;
    lastname: string;
    penName: boolean;
    fullRealName?: string;
    gender: "MALE" | "FEMALE" | "NON-BINARY";
    birthdate: DateTime;
    placeOfBirth: string;
    dateOfDeath?: DateTime;
    placeOfDeath?: string;
    website?: string;
    note: string;
    genre: string;
    foto: Blob;
}
export default Author;
//# sourceMappingURL=Author.d.ts.map