import { User } from "./user";

export interface Review {
  _id: string,
  content: string,
  createdDate: Date,
  userId: string,
  userAvatar: string,
  userName: string,
}
