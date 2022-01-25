import { Observable } from 'rxjs';
import { Author } from './Author';
export declare function createOrUpdateAuthor(newElement: Author): Observable<Author>;
export declare function findAllAuthors(): Observable<Author[]>;
export declare function findAuthorById(id: number): Observable<Author>;
export declare function deleteAuthor(id: number): Observable<void>;
export declare function getAuthorFullName(id: number): string;
//# sourceMappingURL=author-mock-data.d.ts.map