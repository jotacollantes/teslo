import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { CardList } from "../../components/cart";
import { ShopLayout } from "../../components/layouts/";
import { OrderSumary } from "../../components/cart/OrderSumary";
import NextLink from "next/link";
import { CartContext } from "../../context";
import { countries } from "../../utils";
import { PaidSharp } from "@mui/icons-material";
import { useRouter } from "next/router";
import Cookie from 'js-cookie';


const SummaryPage = () => {
  const router =useRouter()
  const { shippingAddress, numberOfItems,createOrder } = useContext(CartContext);


useEffect(() => {
 if (!Cookie.get("address") )
  {
    //! router.push siempre se debe de usar dentro de useEffect
    router.push('/checkout/address')
  }
}, [router])



if (!shippingAddress){
   return <></>
  }


  const [isChargingOrder, setIsChargingOrder] = useState(false)
 const [errorOrderMessage, setErrorOrderMessage] = useState('')

  const onCreateOrder =async ()=>{
    setIsChargingOrder(true)
    const{hasError,message}=await createOrder()

    if (hasError){
      setErrorOrderMessage(message)
      setIsChargingOrder(false)
      return;


    }
    //! Para que el usuario no pueda regresar a la pagina anterior o sea a la de summary
    router.replace(`/orders/${message}`)

  }
  return (
    <ShopLayout
      title={"Resumen de Orden"}
      pageDescription={"Resumen de la orden"}
    >
      <Typography variant="h1" component={"h1"}>
        Resumen de la Orden
      </Typography>
      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} sm={7}>
          {/* Card List */}
          <CardList editable={false} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen: Cantidad de Items: ({numberOfItems})
              </Typography>
              <Divider sx={{ my: 3 }} />

              <Box display={"flex"} justifyContent="space-between">
                <Typography variant="subtitle1">
                  Direccion de Entrega
                </Typography>
                <NextLink href={"/checkout/address"} passHref legacyBehavior>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>
                {shippingAddress?.firstname + " " + shippingAddress?.lastname}
              </Typography>
              <Typography>
                {shippingAddress?.address + " " + shippingAddress?.address2}
              </Typography>
              <Typography>{shippingAddress?.city}</Typography>
              <Typography>{shippingAddress?.zip}</Typography>
              {/* <Typography>
                {countries.map((pais) => {
                  if (pais.code === shippingAddress?.country) {
                    return pais.name;
                  }
                })}
              </Typography> */}
              <Typography>{shippingAddress?.country}</Typography>
              <Typography>{shippingAddress?.phone}</Typography>

              <Divider sx={{ my: 3 }} />

              <Box display={"flex"} justifyContent="end">
                <NextLink href={"/cart"} passHref legacyBehavior>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>
              {/* Order Sumary */}
              <OrderSumary />
              <Box sx={{ mt: 3 }} display="flex" flexDirection={'column'}>
                <Button
                onClick={onCreateOrder}
                color={"secondary"}
                className="circular-btn"
                fullWidth
                disabled={isChargingOrder}>
                  Confirmar orden
                </Button>
                <Chip
                color="error"
                label={errorOrderMessage}
                sx={{display: errorOrderMessage? 'flex' : 'none',mt:2}}
                />

                


              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
