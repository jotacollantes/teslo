import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Box, Typography,Link } from "@mui/material";
import NextLink from "next/link";
import React from "react";
import { ShopLayout } from "../../components/layouts";

const EmptyPage = () => {
  return (
    <ShopLayout
      title={"Carrito Vacio"}
      pageDescription={"No hay articulos en el carrito de compras"}
    >
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems="center"
        height={"calc(100vh - 200px)"}
        //Para que se ajuste a dispositivos moviles o a pantallas mas grandes.
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display={'flex'} flexDirection='column' alignItems={'center'}>
          <Typography>Su Carrito esta vacio</Typography>
          <NextLink href={'/'} passHref legacyBehavior>
            <Link typography={'h4'} color='secondary'>Regresar</Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
