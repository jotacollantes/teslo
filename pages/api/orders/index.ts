import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouteLoader } from 'next/dist/client/route-loader';

type Data = {
    message: string
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

     switch (req.method) {
        case 'POST':
            return createOrder(req,res)
            
     
        default:
            res.status(400).json({ message: 'Bad Request' })
     }


   
}

const createOrder=(req: NextApiRequest, res: NextApiResponse<Data>) =>
{
    return  res.status(200).json({ message: 'Orden Creada' })
}
