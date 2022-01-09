import {Book} from '@mock-backend/book/Book';
import {findUserBookAssignmentsForUser} from '@mock-backend/user/user-book-assignment-mockservice';
import {UserBookAssignmentStatus} from '@mock-backend/user/user-book-assignment-status';

export function enrichBookWithUserAssignments(original: Book, username: string): EnrichedBook {
  const assignments = findUserBookAssignmentsForUser(username);

  const assignmentStatus = assignments.find(as => as.bookId === original.id)?.status;

  return {
    ...original, assignmentStatus: assignmentStatus ?? "default"
  }
}

export interface EnrichedBook extends Book {
  assignmentStatus: UserBookAssignmentStatus;
}
