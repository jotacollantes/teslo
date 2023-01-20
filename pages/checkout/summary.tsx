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
import React, { useContext } from "react";
import { CardList } from "../../components/cart";
import { ShopLayout } from "../../components/layouts/";
import { OrderSumary } from "../../components/cart/OrderSumary";
import NextLink from "next/link";
import { CartContext } from "../../context";
import { countries } from "../../utils";
import { PaidSharp } from "@mui/icons-material";

const SummaryPage = () => {
  const { shippingAddress, numberOfItems } = useContext(CartContext);
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
              <Box sx={{ mt: 3 }}>
                <Button color={"secondary"} className="circular-btn" fullWidth>
                  Confirmar orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
