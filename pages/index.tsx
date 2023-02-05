import { Typography } from "@mui/material";
import { ShopLayout } from "../components/layouts/ShopLayout";
import { ProductList } from "../components/products";
import { FullScreenLoading } from "../components/ui/FullScreenLoading";
//import { initialData } from "../database/products";
import { useProducts } from '../hooks';


export default function Home() {
  const {products,error,isLoading}=useProducts('/products')
  if (error) return <div>failed to load</div>
  if (isLoading) return <FullScreenLoading />
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
      {/* <ProductList products={initialData.products as any} /> */}

      {
        isLoading ? <h1>Cargando...</h1>
                   :<ProductList products={products} />
      }
      

    </ShopLayout>
  );
}
