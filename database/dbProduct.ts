import { db } from ".";
import { Product } from "../models";
import { IProduct } from "../interfaces/";

//* Hay que definir explicitamente que se va a devolver una promesa para poder especificar el tipado o la interface

export const getProductBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  await db.connect();

  //* lean() hace que mongoose solo devuelva informacion basica del modelo Product como los campos y no todas las funciones y propiedades del modelo haciendo que product sea mas liviano
  const product = await Product.findOne({ slug }).lean();

  if (!product) {
    return null;
  }

  await db.disconnect();

  //!Mongo Object: Formato de la respuesta de mongo
  // {
  //     _id: new ObjectId("63b70452a161d2916d6b03d4"),
  //     description: "Inspired by the world’s most unlimited resource, the Let the Sun Shine Tee highlights our fully integrated home solar and storage system. Designed for fit, comfort and style, the tee features a sunset graphic along with our Tesla wordmark on the front and our signature T logo printed above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
  //     images: [ '1700280-00-A_0_2000.jpg', '1700280-00-A_1.jpg' ],
  //     inStock: 17,
  //     price: 35,
  //     sizes: [ 'XS', 'S', 'XL', 'XXL' ],
  //     slug: 'men_let_the_sun_shine_tee',
  //     tags: [ 'shirt' ],
  //     title: "Men's Let the Sun Shine Tee",
  //     type: 'shirts',
  //     gender: 'men',
  //     __v: 0,
  //     createdAt: 2023-01-05T17:09:39.001Z,
  //     updatedAt: 2023-01-05T17:09:39.001Z
  //   }

  //*De esta manera solo devuelve JSON
  //console.log( JSON.stringify(product))
  //*Hay que convertirlo a un objeto literal de javascript ya que estamos solicitando toda la informacion y los campos _id, createdAt, updatedAt vienen en formato de Mongo ejemplo: _id: new ObjectId("63b70452a161d2916d6b03d4") y el formato de campo de fechas //     createdAt: 2023-01-05T17:09:39.001Z, updatedAt: 2023-01-05T17:09:39.001Z
  //Todo procesamiento de las imagenes cuando las subimos al server
  product.images = product.images.map((image) => {
    return image.includes("http")
      ? image
      //: `${process.env.HOST_NAME}/products/${image}`;
      : `/products/${image}`;
  });

  return JSON.parse(JSON.stringify(product));
  //return product
};

export interface ProductSlug {
  slug: string;
}
//* Hay que definir explicitamente que se va a devolver una promesa para poder especificar el tipado o la interface en este caso es un array de la interface <ProductSlug[]> y no un tipico array del string
//export const getAllProductsSlugs=async ():Promise<ProductSlug[]>=>{
export const getAllProductsSlugs = async () => {
  db.connect();
  const slugs = await Product.find().select("slug -_id").lean();
  db.disconnect();
  //*Lo que voy a obtener es un arreglo de objetos por ejemplo:
  // [
  //     {slug:''},
  //     {slug:''},
  //     {slug:''},
  // ]
  //*por eso la interface no tiene que ser interface props {propiedad: string[]}, es en el valor devuelto de la funcion que se especifica Promise<ProductSlug[]>

  //!Este codigo es para una version sin especificar explicitamente que se va a devolver una Promise<ProductSlug[]>, donde obtengo el objeto de mongo que es un  array de objetos y lo convierto en un array de string iterable de JS
  let newArray = [];
  for (const obj of slugs) {
    newArray.push(obj.slug);
  }
  //console.log(typeof(newArray))
  //console.log(newArray)
  //return slugs
  return newArray;
};

export const getProductBySearch = async (term: string): Promise<IProduct[]> => {
  await db.connect();

  //* lean() hace que mongoose solo devuelva informacion basica del modelo Product como los campos y no todas las funciones y propiedades del modelo haciendo que product sea mas liviano
  term = term.toString().toLowerCase();
  const products = await Product.find({ $text: { $search: term } })
    .select("title images price inStock slug -_id")
    .lean();

  if (!products) {
    return [];
  }

  await db.disconnect();

  //!Mongo Object: Formato de la respuesta de mongo
  // {
  //     _id: new ObjectId("63b70452a161d2916d6b03d4"),
  //     description: "Inspired by the world’s most unlimited resource, the Let the Sun Shine Tee highlights our fully integrated home solar and storage system. Designed for fit, comfort and style, the tee features a sunset graphic along with our Tesla wordmark on the front and our signature T logo printed above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
  //     images: [ '1700280-00-A_0_2000.jpg', '1700280-00-A_1.jpg' ],
  //     inStock: 17,
  //     price: 35,
  //     sizes: [ 'XS', 'S', 'XL', 'XXL' ],
  //     slug: 'men_let_the_sun_shine_tee',
  //     tags: [ 'shirt' ],
  //     title: "Men's Let the Sun Shine Tee",
  //     type: 'shirts',
  //     gender: 'men',
  //     __v: 0,
  //     createdAt: 2023-01-05T17:09:39.001Z,
  //     updatedAt: 2023-01-05T17:09:39.001Z
  //   }

  //*De esta manera solo devuelve JSON
  //console.log( JSON.stringify(product))
  //*Hay que convertirlo a un objeto literal de java script ya que viene en formato de Mongo Object y especialemte por el _id: new ObjectId("63b70452a161d2916d6b03d4")

  //!Como en esta consulta no incluyo el _id puedo retornar directamente el products: return product sin hacer la serializacion

  //Todo procesamiento de las imagenes cuando las subimos al server
  //*Como products es un array de productos hay que iterar para manejar las imagenes por producto
  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http")
        ? image
        //: `${process.env.HOST_NAME}/products/${image}`;
      : `/products/${image}`;
    });
    return product
  });

  //return JSON.parse(JSON.stringify(products))
  return JSON.parse(JSON.stringify(updatedProducts));
  //return product
};

//*Obtener todos los productos
export const getAllProducts = async (): Promise<IProduct[]> => {
  await db.connect();

  //* lean() hace que mongoose solo devuelva informacion basica del modelo Product como los campos y no todas las funciones y propiedades del modelo haciendo que product sea mas liviano

  const products = await Product.find()
    .select("title images price inStock slug -_id")
    .lean();

  await db.disconnect();

  //!Mongo Object: Formato de la respuesta de mongo
  // {
  //     _id: new ObjectId("63b70452a161d2916d6b03d4"),
  //     description: "Inspired by the world’s most unlimited resource, the Let the Sun Shine Tee highlights our fully integrated home solar and storage system. Designed for fit, comfort and style, the tee features a sunset graphic along with our Tesla wordmark on the front and our signature T logo printed above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
  //     images: [ '1700280-00-A_0_2000.jpg', '1700280-00-A_1.jpg' ],
  //     inStock: 17,
  //     price: 35,
  //     sizes: [ 'XS', 'S', 'XL', 'XXL' ],
  //     slug: 'men_let_the_sun_shine_tee',
  //     tags: [ 'shirt' ],
  //     title: "Men's Let the Sun Shine Tee",
  //     type: 'shirts',
  //     gender: 'men',
  //     __v: 0,
  //     createdAt: 2023-01-05T17:09:39.001Z,
  //     updatedAt: 2023-01-05T17:09:39.001Z
  //   }

  //*De esta manera solo devuelve JSON
  //console.log( JSON.stringify(product))
  //*Hay que convertirlo a un objeto literal de java script ya que viene en formato de Mongo Object y especialemte por el _id: new ObjectId("63b70452a161d2916d6b03d4")

  //!Como en esta consulta no incluyo el _id puedo retornar directamente el products: return product sin hacer la serializacion

 //Todo procesamiento de las imagenes cuando las subimos al server
  //*Como products es un array de productos hay que iterar para manejar las imagenes por producto
  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http")
        ? image
        //: `${process.env.HOST_NAME}/products/${image}`;
      : `/products/${image}`;
    });
    return product
  });
  //return products;
  return updatedProducts
};
