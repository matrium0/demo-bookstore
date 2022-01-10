import {UserBookAssignment, UserBookAssignmentStatus} from './user-book-assignment-status';

export function findUserBookAssignmentsForUser(username: string): UserBookAssignment[] {
  return data.filter(d => d.username === username);
}

export function updateStatus(username: string, bookId: number, status: UserBookAssignmentStatus): void {
  let assignment = data.find(d => d.username === username && d.bookId === bookId);
  console.log("updating updateStatus", username, bookId, status);
  if (assignment) {
    console.log("updating updateStatus SUCCESS", assignment, status);
    assignment.status = status;
  } else {
    data.push({
      username,
      bookId,
      status
    });
  }

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
