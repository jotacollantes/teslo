import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    numberOfOrders:number|string;
    paidOrders: number; //isPaid: true
    notPaidOrders:number; //isPaid: false
    numberOfClients:number; //role: client
    numberOfProducts:number;
    productsWithNotInventory:number; //0
    lowInventory: number// products con 10 o menos unidades


}



export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    
    res.status(200).json({ })
}