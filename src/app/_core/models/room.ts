import { Location } from "./location";

export interface Room {
  _id?: string,
  name?: string,
  description?: string,
  price?: number,
  elevator?: boolean,
  hotTub?: boolean,
  pool?: boolean,
  indoorFireplace?: boolean,
  dryer?: boolean,
  gym?: boolean,
  kitchen?: boolean,
  wifi?: boolean,
  heating?: boolean,
  cableTV?: boolean,
  locationId?: Location,
  image?: string,
  bath?: number,
  bedRoom?: number,
  guests?: number,
}
