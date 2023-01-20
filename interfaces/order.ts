import { IUser } from "./user";
export interface IOrder {
  _id?: string;
  user?: IUser | string; //Pueda que venga toda la informacion del usuario como en un populate o solo el id de mongo
  orderItems: IOrderItem[];
  shippingAddress: ShippingAddress;
  paymentResult ?: string;
  numberOfItems  : number;
  subTotal       : number;
  taxCart        : number;
  total          : number;
  isPaid         : Boolean;
  paidAt         ?: string;
}

export interface IOrderItem {
  _id: string;
  title: string;
  size: string;
  quantity: number;
  slug: string;
  image: string;
  price: number;
}

export interface ShippingAddress {
  firstname : string;
  lastname  : string;
  address   : string;
  address2? : string;
  zip       : string;
  city      : string;
  country   : string;
  phone     : string;
}
