import type { NextApiRequest, NextApiResponse } from "next";
import { IOrder } from "../../../interfaces";
import { getSession } from "next-auth/react";
import { Order, Product } from "../../../models";
import { db } from "../../../database";



type Data =
  | {
      message: string;
    }
  | {
      message: string;
      respuesta: any;
    }
   | IOrder

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createOrder(req, res);

    default:
      res.status(400).json({ message: "Bad Request" });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total,shippingAddress } = req.body as IOrder; // Para tener el tipado

  //!Verificar si hay un usario activo
  //!en los Rest full api se dede de usar getSession y en los middleware se debe de usar token
  const session:any = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Debe de estar autenticado" });
  }
  //!Crear un arreglo con los productos que desea el cliente
  const productsId = orderItems.map((item) => item._id);
  db.connect()
  
  
  //let dbProducts = await Product.find({ _id: { $in: productsId } }).select("_id price inStock").lean();
  let dbProducts = await Product.find({ _id: { $in: productsId } });
  
  
  

  //! Como no uso ni el select ni el lean puedo tomar directamen el id en lugar del _id
  
//! No es necesrario convertirlo a un objeto literal de javascript para poder tomar el _id
  //dbProducts=JSON.parse(JSON.stringify(dbProducts))
  
  let dbSubTotal=0;
  const rateTax=Number(process.env.NEXT_PUBLIC_RATE_TAX)
  
  
  try {
    
    
    for (const item of orderItems) {
    //*item.quantity es la cantidad seleccionada por el cliente 
    //! Como no uso ni el select ni el lean puedo tomar directamen el id en lugar del _id
    dbSubTotal+=item.quantity * dbProducts.find(prod=>prod.id===item._id)!.price     

    }
    
     const taxCart =(dbSubTotal * rateTax)/100
     const backEndTotal=dbSubTotal + taxCart
     console.log(dbSubTotal,taxCart,backEndTotal);
     if(total !== backEndTotal){
        
        //!Este throw sera atrapado por el catch
        throw new Error ('El total no es valido')
     }

     //Todo bien hasta este punto ya podemos grabar en mongo
     const userId=session.user._id;
     const newOrder =new Order({...req.body,user:userId,isPaid:false})
     await newOrder.save()
     await db.disconnect()
     return res.status(201).json(newOrder);
    


} catch (error:any) {
    console.log('entro al catch')
    db.disconnect()
    console.log(error)
    return res.status(400).json({ message: error.message||"revise los logs del servidor"});
}

  


};
