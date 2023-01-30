import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Order, Product, User } from "../../../models";

type Data = {
  numberOfOrders: number | string;
  paidOrders: number; //isPaid: true
  notPaidOrders: number; //isPaid: false
  numberOfClients: number; //role: client
  numberOfProducts: number;
  productsWithNotInventory: number; //0
  lowInventory: number; // products con 10 o menos unidades
};

type Mensaje = {
  messages: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connect();

  //* Hay 2 maneras de hacer las consultas con mongoose: con .countDocuments() o .find().count y si son todos los documentos sin ninguna condicion usamos .count()
  //*const numberOfOrders = await Order.countDocuments({})
  //*const paidOrders = await Order.countDocuments({isPaid:true})
  //*const notPaidOrders = await Order.countDocuments({isPaid:false})
  //*const numberOfClients = await User.countDocuments({role:'client'})
  //*const numberOfProducts = await Product.countDocuments({})
  //*const productsWithNotInventory = await Product.countDocuments({ 'inStock': { $eq: 0 } } )
  //*const lowInventory = await Product.countDocuments({ inStock: { $lte: 10 } } )

  //!Manera mas lenta porque se tiene que ejecutar todos los await uno a continuacion del otro
//   const numberOfOrders    = await Order.count();
//   const paidOrders        = await Order.find({ isPaid: true }).count();
//   const notPaidOrders     = await Order.find({ isPaid: false }).count();
//   const numberOfClients   = await User.find({ role: "client" }).count();
//   const numberOfProducts  = await Product.count();
//   const productsWithNotInventory = await Product.find({ inStock: 0 }).count();
//   const lowInventory = await Product.find({ inStock: { $lte: 10 } }).count();

  //!Manera mas Rapida porque se ejecuta un solo await en la promesa
  const [
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNotInventory,
    lowInventory
]=await Promise.all([
    Order.count(),
    Order.find({ isPaid: true }).count(),
    Order.find({ isPaid: false }).count(),
    User.find({ role: "client" }).count(),
    Product.count(),
    Product.find({ inStock: 0 }).count(),
    Product.find({ inStock: { $lte: 10 } }).count(),
  ])



  await db.disconnect();

  res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNotInventory,
    lowInventory,
  });
}
