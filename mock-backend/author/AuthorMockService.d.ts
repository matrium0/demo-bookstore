import { Observable } from 'rxjs';
import Author from './Author';
export declare function createOrUpdate(newElement: Author): Author;
export declare function findAll(): Observable<Author[]>;
export declare function findById(id: number): Observable<Author>;
export declare function remove(id: number): Observable<never>;
//# sourceMappingURL=AuthorMockService.d.ts.map