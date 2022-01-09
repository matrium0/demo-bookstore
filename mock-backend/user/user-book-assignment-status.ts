export type UserBookAssignmentStatus = "default" | "want to read" | "read" | "currently reading";

export interface UserBookAssignment {
  username: string,
  bookId: number,
  status: UserBookAssignmentStatus
}
