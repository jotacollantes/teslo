import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';
import { isValidObjectId } from 'mongoose';
import { v2 as cloudinary } from "cloudinary";


cloudinary.config(process.env.CLOUDINARY_URL!);

type Data =
|{message: string}
|IProduct[]
|IProduct;

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            
            return getProducts(req,res)
           
        case 'PUT':
            return updateProduct(req,res)
            
            
        case 'POST':
            return createProduct(req,res)
            
    
        default:
            return res.status(400).json({ message: 'Bad Request' })
    }


    
}

const getProducts= async(req: NextApiRequest, res: NextApiResponse<Data>)=>{
   await db.connect()
   const products = await Product.find().sort({title:'asc'}).lean()
   await db.disconnect()
   
  //Todo procesamiento de las imagenes cuando las subimos al server
  //*Como products es un array de productos hay que iterar para manejar las imagenes por producto
  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}/products/${image}`;
      //: `products/${image}`;

    });
    return product
  });
   
   //return res.status(200).json(products)
   return res.status(200).json(updatedProducts)
}



const updateProduct=async(req: NextApiRequest, res: NextApiResponse<Data>)=> {


    //*Solo desestructuro el _id y el images para el manejo si es producto nuevo o existente y par ael manejo de images. La base de datos se actualiza cono lo que venga integro en req.body
    const {_id='',images=[]}=req.body as IProduct;

    if (!isValidObjectId)
      {
        return res.status(400).json({ message: 'El Id es invalido'})
      }
    
      if (images.length < 2)
      {
        return res.status(400).json({ message: 'Al menos deben de haber 2 imagenes'})
      }

      //Todo: Posiblemente tendremos un localhost:3000/products/asdasd.jpg

      try {
        await db.connect()
        const product = await Product.findById(_id);
        if(!product){
            await db.disconnect()
            return res.status(400).json({ message: 'No existe ese producto'})
        }
        //! En este punto se actualiza la base de datos 

        //TODO: eliminar fotos en cloudynary
        	
        for (const image of product.images) {
           //*se compara el array images que envia el cliente versus las imagenes que ya tiene en la BD antes de actualizar
           if (!images.includes(image)) {
            //https://res.cloudinary.com/j2systems/image/upload/v1675452125/zb6unmb86joygdkah5tr.png
            //* me quedo con zb6unmb86joygdkah5tr.png
            const pathNameTemp=image.split('/')
           //* me quedo con zb6unmb86joygdkah5tr
            const fileNameTemp=pathNameTemp[pathNameTemp.length-1].split('.')
            const idCloudinary=fileNameTemp[0]
            console.log({image,idCloudinary})
            await cloudinary.uploader.destroy(idCloudinary)

           }
        }
        //await product.updateOne(req.body,{ new: true })
        await product.update(req.body)
        
        await db.disconnect()
        return res.status(200).json(product)
      } catch (error) {
        
        console.log(error)
        await db.disconnect()
        return res.status(400).json({ message: 'Revisar la consola'})
        
      }

}

const createProduct=async(req: NextApiRequest, res: NextApiResponse<Data>)=> {

  const {images=[],slug=''}= req.body as IProduct
  if (images.length < 2) {
    return res.status(400).json({ message: 'Al menos deben de haber 2 imagenes'})
  }
  //Todo: Posiblemente tendremos un localhost:3000/products/asdasd.jpg


  try {

    await db.connect()

    //*Validar producto existente con el mismo slug
    const productInDb = await Product.findOne({slug:slug})
    //!Si el producto existe
    if (productInDb){
      await db.disconnect()
      return res.status(400).json({ message: `El producto ya existe con el slug $ {slug}`})
    }
    
    const product = new Product(req.body)
    await product.save()
    await db.disconnect()
    return res.status(200).json(product)
    
  } catch (error) {
    console.log(error)
    await db.disconnect()
    return res.status(400).json({ message: 'Revisar los logs del servidor'})
    
  }
}

