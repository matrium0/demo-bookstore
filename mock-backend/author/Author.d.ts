import { Entity } from './Entity';
interface Author extends Entity {
    firstname: string;
    lastname: string;
    penName: boolean;
    gender: "MALE" | "FEMALE" | "NON-BINARY";
    birthdate: Date;
    placeOfBirth: string;
    dateOfDeath: Date | null;
    placeOfDeath: string | null;
    website: string;
    note: string;
}
export default Author;
//# sourceMappingURL=Author.d.ts.map
