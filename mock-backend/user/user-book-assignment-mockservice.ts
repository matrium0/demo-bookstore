import {delay, Observable, of} from 'rxjs';
import {UserBookAssignment} from './user-book-assignment-status';

export function findUserBookAssignmentsForUser(username: string): Observable<UserBookAssignment[]> {
  return of(data).pipe(delay(300));
}

const initialData: UserBookAssignment[] = [{
  username: "your-username",
  bookId: 1,
  status: "read"
}, {
  username: "your-username",
  bookId: 2,
  status: "currently reading"
}, {
  username: "your-username",
  bookId: 3,
  status: "default"
}, {
  username: "your-username",
  bookId: 5,
  status: "want to read"
}, {
  username: "your-username",
  bookId: 6,
  status: "want to read"
}];
let data = [...initialData];
