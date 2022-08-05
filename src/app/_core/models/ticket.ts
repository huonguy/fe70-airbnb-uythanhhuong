import { Room } from "./room";
import { User } from "./user";

interface ITicket {
  _id?: string;
  checkIn?: Date;
  checkOut?: Date;
  userId?: User;
  roomId?: Room;
  totalPrice?: number;
}

export class Ticket implements ITicket {
  public _id: string;
  public checkIn: Date = new Date();
  public checkOut: Date = new Date();
  public userId: User;
  public roomId?: Room;
  public totalPrice?: number = 0;

  constructor() {
  }
}
