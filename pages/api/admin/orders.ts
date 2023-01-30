import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { connect } from '../../../database/db';
import { IOrder } from '../../../interfaces';
import { Order } from '../../../models';

type Data = {
    name: string
}|IOrder[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            
           return getOrders(req,res)
    
        default:
            res.status(400).json({ name: 'Bad Request' })
    }
    
}

const  getOrders= async(req: NextApiRequest, res: NextApiResponse<Data>) => {
   await db.connect()

   const orders=await Order.find().
                        sort({createdAt:'desc'}).
                        //*El campo user lo voy a poblar con el dato del email y del correo gracias a la referencia creada en el modelo Order
                        populate('user','name email').
                        lean()
   await db.disconnect()
   return res.status(200).json(orders)
}
