import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Product } from "../../../models";
import { IProduct } from "../../../interfaces/";

type Data = {
  message?: string;
  products?: IProduct[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return searchProducts(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const searchProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  let { q='' } = req.query;

  //!para convertir todo a string y capitalizar todo a minuscula
  q=q.toString().toLowerCase()
  
//console.log(req.query)



  //console.log(req.query)

    if(q.length ===0){
        return res.status(400).json({ message: "Debe de especificar un dato para la busqueda" });
    }

  await db.connect();
  //! Es necesario crear el tipado para cualquier elemento o propiedad que se envie en la response
  //! con .select() especifico los campos y -_1 excluye el campo _id de la respuesta

  //!$text performs a text search on the content of the fields indexed with a text index. More details: https://www.mongodb.com/docs/manual/reference/operator/query/text/

  

  const products: Data = await Product.find({$text:{$search:q}})
    .select("title description images inStock price slug -_id")
    .lean();

  await db.disconnect();

  //return res.status(200).json(products)
  if (!products){
    return res.status(400).json({ message: "Producto no existe" });
  }
  return res.status(200).json(products);
  
};