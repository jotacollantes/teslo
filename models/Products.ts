import mongoose,{Schema,model,Model} from 'mongoose'
import { IProduct } from '../interfaces'

//! Creamos una instancia de Schema
const productSchema = new Schema({
    description: {type: String,required:true},
    //*Puede haber mas de una imagen o ninguna la definimos como array
    images: [{type: String}],
    inStock: {type:Number,required: true,default:0},
    price: {type:Number,required: true,default:0},
    //! Un producto puede tener una o varias tallas lo definimos como un array y como son tallas especificas, especificamos las tallas con ENUM
    sizes: [{
        type:String,
        enum:{
            values:['XS','S','M','L','XL','XXL','XXXL'],
            message: '{VALUE} no es un tamaño valido'
        }
    }],
    slug: {type: String,required:true,unique:true},
    //!Puede haber mas un tag o ninguno, lo definimos como array
    tags: [{type: String}],
    title: {type: String,required:true},
    type: {
        type:String,
        enum:{
            values:['shirts','pants','hoodies','hats'],
            message: '{VALUE} no es un tipo valido'
        }
    },
    gender: {
        type:String,
        enum:{
            values:['men','women','kid','unisex'],
            message: '{VALUE} no es un genero valido'
        }
    },
},
//!Para que aparezca createdAt y updatedAt
{timestamps:true})

//TODO: Crear indices con 2 columnas la de title y tag

productSchema.index({title:'text',tags:'text'})

//! Creamos el Producto que tiene como interface el tipo  Model<IProduct> que buscara el modelo Product, sino lo encuentra creara el modelo Product (mongo crearal Coleccion products en minuscula y plural) con el Schema productSchema.
const Producto: Model<IProduct>=mongoose.models.Product|| model('Product',productSchema)

//! Por cada cambio en el modelo hay que reiniciar la aplicacion
export default Producto
