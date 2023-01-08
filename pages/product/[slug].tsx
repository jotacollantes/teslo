import { AppBlocking } from "@mui/icons-material";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { ShopLayout } from "../../components/layouts";
import {
  ItemCounter,
  ProductSlideShow,
  SizeSelector,
} from "../../components/products";
import { dbProducts } from "../../database";

//import { initialData } from '../../database/products';
import { IProduct } from "../../interfaces/products";

//const product=initialData.products[0]
interface Props {
  product: IProduct;
}

const ProductPage = ({ product }: Props) => {
  //! Esto es una forma de traer la informacion donde hay que enviar la informacion al backend para que la renderize
  // const router=useRouter()
  // const slug=router.query.slug

  // const {error,isLoading, products:product }=useProducts(`/products/${slug}`)
  // if (isLoading){
  //   return <h1>Cargndo...</h1>
  // }
  // if (!product){
  //   return <h1>Producto no Existe!</h1>
  // }

  //!De esta manera es CEO Friendly

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container sx={{ mt: 10 }} spacing={3}>
        <Grid item xs={12} sm={7} border={0}>
          {/* slide show */}
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5} border={0}>
          <Box display={"flex"} flexDirection="column" sx={{ mr: 0 }}>
            <Typography variant="h1" component={"h1"}>
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component={"h2"}>
              {`$${product.price}`}
            </Typography>
            {/* Cantidad */}
            {/* Margen arriba y abajo */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              {/* Item Counter */}
              <ItemCounter />
              {/* Size Selector */}
              {/* <SizeSelector selectedSize={product.sizes[2]} sizes={product.sizes}/> */}
              <SizeSelector sizes={product.sizes} />
            </Box>
            <Button color="secondary" className="circular-btn">
              Agregar al Carrito
            </Button>
            {/* <Chip label='No hay disponibles' color='error' variant='outlined' /> */}

            {/* Descripcion */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripcion</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};
//getServerSideProps

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

//!Aqui estamos del lado del servidor , la pagina sera renderizada en el servidor SSR

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { slug } = ctx.params as { slug: string }; 

//   const product = await dbProducts.getProductBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       product: product,
//     },
//   };
// };

// getStaticPaths
// AppBlocking


// getStaticProps
// revalidar cada 24 horas

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  //* Hacemos la llamada a la BD en tiempo de build
  
    const productSlugs = await dbProducts.getAllProductsSlugs()
  
    //console.log(productSlugs)
     return {
     
      //!Genero dinamicante los paths
      //* Como dbProducts.getAllProductsSlugs() me devuelve un arreglo de objetos al momento de hacer el map en la generacion de los paths tengo que desestruturar el objeto y obtener la propiedad {slug}

      //! este es el formato de paths
      // paths: [
      //   {
      //     params: {}
      //   }
      // ],

      paths: //[
      //productSlugs.map(({slug}) => {
        //! Esta linea es con la version sin interfaz en el valor devuelto por dbProducts.getAllProductsSlugs()
        productSlugs.map((slug) => {
        return { params: {slug:slug} };
      })
       //]
      ,
  
        //! Si el usuario ingresa un id y no existe una pagina pre renderizada, la va a generar y quedara disponible para otra consulta.
      //fallback: false,
      fallback: 'blocking'
    };
  };

  
  //!Despues de que se ejecuta getStaticPaths los params son enviados a getStaticProps para su ejecucion
  
  export const getStaticProps: GetStaticProps = async ({ params }) => {
    //*Desestructuramos CTX a {params}
    //console.log(params)
    const { slug } = params as { slug: string }; //* tipado
    const product = await dbProducts.getProductBySlug(slug);
    
      //*Si no tenemos el producto redireccionamos al usuario al /
      if (!product) {
        return {
          redirect: {
            destination: "/", //Si no existe lo redireccionamos al home
            permanent: false,
          },
        };
      }
    
      //*Si tenemos el pokemon vamos a pasar
      return {
        props: {
          product: product,
        },
        revalidate: 86400,
      };
  };
  


export default ProductPage;


