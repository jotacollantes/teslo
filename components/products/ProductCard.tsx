import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import React, { useMemo, useState } from "react";
import { IProduct } from "../../interfaces/products";


interface Props {
  product: IProduct; // Solo es uno
}

export const ProductCard = ({ product }: Props) => {
  const [isMovered, setIsMovered] = useState(false);
  //!Version con useMemo()
  // const productImage=useMemo(() => {
  //   return isMovered ? `products/${product.images[1]}` :  `products/${product.images[0]}`
  // }, [isMovered,product.images])

  //!si el mouse esta sobre la imagen
  const productImage = isMovered
    ? `products/${product.images[1]}`
    : `products/${product.images[0]}`;

  return (
    //!Si es xs solo se mostrara 2 productos si es de sm en adelante solo se mostrara 3 productos
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsMovered(true)}
      onMouseLeave={() => setIsMovered(false)}
    >
      <Card>
        {/* Para no cargar los productos en cache ponemos prefetach={false} */}
        <NextLink href={'/product/slug'} passHref legacyBehavior prefetch={false}>
          <Link>
          <CardActionArea>
          <CardMedia
            component={"img"}
            //image={`products/${product.images[0]}`}
            image={productImage}
            alt={product.title}
            className='fadein'
          />
        </CardActionArea>
          </Link>
        </NextLink>
        
      </Card>
      {/* Los estilos los toma de /styles/global.css */}
      <Box sx={{ margintop: 1 }} className="fadeIn">
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>{`$${product.price}`}</Typography>
      </Box>
      
    </Grid>

    
  );
};
