import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { CardList } from "../../components/cart";
import { ShopLayout } from "../../components/layouts/";
import { OrderSumary } from "../../components/cart/OrderSumary";
import { CartContext } from "../../context/cart/CartContext";
import { useRouter } from "next/router";
import NextLink from "next/link";


const index = () => {
  const { isLoaded, cart } = useContext(CartContext);
  const router = useRouter();
  useEffect(() => {
    //console.log(isLoaded,cart.length)
    //   if(isLoaded && cart.length===0){
    //         router.replace('/cart/empty')
    //   }
    if (cart.length === 0) {
      router.replace("/cart/empty");
    }

    //}, [isLoaded,cart.length,router])
  }, [cart.length]);

  //if (!isLoaded){
  //!Para que no se vea de manera temporal los datos del resumen de la compra, se envia el fragmento vacio al momento de renderizar el componente. inmediatamente despues de renderizar el fragmento vacio se ejecuta el efecto
  if (cart.length === 0) return <></>;

  return (
    <ShopLayout
      title={"Carrito - 3"}
      pageDescription={"Carrito de Compras de la Tienda"}
    >
      <Typography variant="h1" component={"h1"}>
        Carrito
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          {/* Card List */}
          <CardList editable={true} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Orden</Typography>
              <Divider sx={{ my: 3 }} />
              {/* Order Sumary */}
              <OrderSumary />
              <Box sx={{ mt: 3 }}>

              <NextLink href='/checkout/address' passHref legacyBehavior>
            <Link>
                <Button
                color={"secondary"}
                className="circular-btn"
                
                fullWidth>
                  Checkout
                </Button>
                </Link>
          </NextLink>

              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};



export default index;


