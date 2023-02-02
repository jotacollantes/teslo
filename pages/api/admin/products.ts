import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';
import { isValidObjectId } from 'mongoose';

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
   //todo: actualizar imagenes
   
   return res.status(200).json(products)
}



const updateProduct=async(req: NextApiRequest, res: NextApiResponse<Data>)=> {

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
        await product.update(req.body)
        //TODO: eliminar fotos en cloudynary
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

