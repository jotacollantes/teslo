import { Typography } from "@mui/material";
import { ShopLayout } from "../components/layouts/ShopLayout";
import { ProductList } from "../components/products";
import { initialData } from "../database/products";


export default function Home() {
  return (
    //Añadimos el layout ShopLayout
    <ShopLayout
      title={"Teslo-shop - Home"}
      pageDescription={"Encuentra los mejores productos"}
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ marginBottom: 1 }}>
        Todos los Productos
      </Typography>

      {/* <Grid container spacing={4}>
      {
        initialData.products.map((producto) => {
          return  <ProductItems key={producto.slug} slug={producto.slug} image={`products/${producto.images[0]}`} title={producto.title}  />
        })
      }
      </Grid> */}


      
      {/* initialData es un objeto que tiene una propiedad que se llama products y este a su vez es un array [] */}
      {/* El any es temporal */}
      <ProductList products={initialData.products as any} />

    </ShopLayout>
  );
}
