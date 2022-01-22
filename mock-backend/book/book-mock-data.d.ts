import { Observable } from 'rxjs';
import { Book } from './Book';
export declare function createOrUpdateBook(newElement: Book): Observable<Book>;
export declare function findBooksForUser(username: string): Observable<Book[]>;
export declare function findAllBooks(): Observable<Book[]>;
export declare function findBooksOfAuthor(id: number): Observable<Book[]>;
export declare function findBookById(id: number): Observable<Book>;
export declare function deleteBook(id: number): Observable<void>;
//# sourceMappingURL=book-mock-data.d.ts.map