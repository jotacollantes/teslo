import { Box, Typography } from "@mui/material";
//import { useRouter } from "next/router";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { ProductList } from "../../components/products";

import { GetServerSideProps } from "next";
import { dbProducts } from "../../database";
import { IProduct } from "../../interfaces";

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

export default function SearchPage({ products, foundProducts, query }: Props) {
  return (
    //Añadimos el layout ShopLayout
    <ShopLayout
      title={"Teslo-shop - Search"}
      pageDescription={"Encuentra los mejores productos"}
    >
      <Typography variant="h1" component="h1">
        Buscar Producto
      </Typography>

      {foundProducts ? (
        <Typography variant="h2" sx={{ marginBottom: 1 }}>
          Termino: {query}
        </Typography>
      ) : (
        //!Se usa fragmento porque se va a enviar mas de un JSX Element
        <>
        <Box display='flex'>
          <Typography variant="h2" sx={{ marginBottom: 1 }}>
         No encontramos ningun producto
        </Typography>
        <Typography variant="h2" sx={{ marginLeft: 1 }} color='secondary'>
        {query}
        </Typography>
        </Box>
        
        </>
        
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
}
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  //!Desestructuro params {query}.
  //!Para que no se queje typescript
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProductBySearch(query);
  const foundProducts = products.length > 0;

  //!Retornar productos varios en caso de que products[] sea 0 elementos
  if (!foundProducts) {
    //products = await dbProducts.getAllProducts();
    products = await dbProducts.getProductBySearch('cybertruck');
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};
