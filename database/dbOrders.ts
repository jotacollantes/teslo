import { Order } from "../models";
import { db } from ".";
import { IOrder } from "../interfaces";
import { isValidObjectId } from "mongoose";

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }

  try {
    await db.connect();

    const order = await Order.findById(id).lean();

    if (!order) {
      return null;
    }
    await db.disconnect();
    //* Para serializar la respuesta
    return JSON.parse(JSON.stringify(order));

  } catch (error) {
    console.log(error)
    await db.disconnect();
    return null;
  }
};



export const getOrderByUserId = async (userId: string): Promise<IOrder[] | []> => {
  if (!isValidObjectId(userId)) {
    return [];
  }

  try {
    await db.connect();

    const orderenes = await Order.find({user:userId}).lean();

    if (!orderenes) {
      return [];
    }
    await db.disconnect();
    //* Para serializar la respuesta
    return JSON.parse(JSON.stringify(orderenes));

  } catch (error) {
    console.log(error)
    await db.disconnect();
    return [];
  }
};
