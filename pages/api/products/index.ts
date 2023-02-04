import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Product } from "../../../models";
import { IProduct } from "../../../interfaces/";

// type Data = {
//   message?: string;
//   products?: IProduct[];
// };

type Data = {
  message?: string;
  
}| IProduct[];


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { gender='all'} = req.query;

  let filtro

  console.log(req.query)

  switch (gender) {
    case "men":
      filtro = { gender: "men" };
      break;
    case "women":
      filtro = { gender: "women" };
      break;
    case "kid":
      filtro = { gender: "kid" };
      break;
    case "unisex":
      filtro = { gender: "unisex" };
      break;
      case "all":
      filtro = {};
      break;

    default:
        //return res.status(401).json({ message: "Bad request" });
        filtro = {};
        
      
  }

  await db.connect();
  //! Es necesario crear el tipado para cualquier elemento o propiedad que se envie en la response
  //! con .select() especifico los campos y -_1 excluye el campo _id de la respuesta
  const products = await Product.find(filtro)
    .select("title images sizes price inStock slug -_id")
    .lean();

  await db.disconnect();

 
  //Todo procesamiento de las imagenes cuando las subimos al server
  //*Como products es un array de productos hay que iterar para manejar las imagenes por producto
  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http")
        ? image
        //: `${process.env.HOST_NAME}/products/${image}`;
      : `https//${process.env.VERCEL_URL}/products/${image}`;
    });
    return product
  });
  //return res.status(200).json(products);
  return res.status(200).json(updatedProducts);
};
