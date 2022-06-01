import { User } from "./user";

export interface Review {
  content: string,
  created_at: Date;
  updatedAt: Date,
  userId: User
}
