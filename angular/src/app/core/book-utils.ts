import {Book} from '@mock-backend/book/Book';
import {findUserBookAssignmentsForUser} from '@mock-backend/user/user-book-assignment-mockservice';
import {UserBookAssignmentStatus} from '@mock-backend/user/user-book-assignment-status';
import {getAuthorFullName} from '@mock-backend/author/author-mock-data';

export function enrichBookWithUserAssignments(original: Book, username: string): EnrichedBook {
  const assignments = findUserBookAssignmentsForUser(username);

  const assignmentStatus = assignments.find(as => as.bookId === original.id)?.status;
  const authorFullName = getAuthorFullName(original.authorId);

  return {
    ...original, assignmentStatus: assignmentStatus ?? "default", authorFullName
  }
}

export interface EnrichedBook extends Book {
  assignmentStatus: UserBookAssignmentStatus;
  authorFullName: string,
}
