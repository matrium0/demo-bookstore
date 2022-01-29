import {findUserBookAssignmentsForUser} from '../user/user-book-assignment-mockservice';
import {Book} from '../book/Book';
import {getAuthorFullName} from '../author/author-mock-data';
import {UserBookAssignmentStatus} from '../user/user-book-assignment-status';

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
