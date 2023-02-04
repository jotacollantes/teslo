import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Product } from "../../../models";
import { IProduct } from "../../../interfaces/";

type Data = {message?: string;}
|IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProductsBySlug(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const getProductsBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { slug } = req.query;
  let filtro = { slug };
  //console.log(req.query)
  await db.connect();
  //! Es necesario crear el tipado para cualquier elemento o propiedad que se envie en la response
  //! con .select() especifico los campos y -_1 excluye el campo _id de la respuesta
  const product = await Product.findOne(filtro)
    //.select("title description sizes images inStock slug -_id")
    .lean();

  await db.disconnect();

  //return res.status(200).json(products)
  if (!product){
    return res.status(400).json({ message: "Producto no existe" });
  }

//Todo procesamiento de las imagenes cuando las subimos al server
  //*Como solo es un producto no hay que iterar el IProduct[]
  
    product.images = product.images.map((image) => {
      return image.includes("http")
        ? image
        //: `${process.env.HOST_NAME}/products/${image}`;
      : `products/${image}`;
    });
    

  return res.status(200).json(product);
  
};
