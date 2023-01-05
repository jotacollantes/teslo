import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import { CardList } from "../../components/cart";
import { ShopLayout } from "../../components/layouts/";
import { OrderSumary } from "../../components/cart/OrderSumary";
import NextLink from "next/link";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";

const OrderPage = () => {
  return (
    <ShopLayout
      title={"Resumen de Orden 12345678"}
      pageDescription={"Resumen de la orden"}
    >
      <Typography variant="h1" component={"h1"}>
        Orden 12345678{" "}
      </Typography>
      {/* <Chip
        sx={{my:2}}
        label='Pendiente de Pago'
        variant='outlined'
        color='error'
        icon={<CreditCardOffOutlined/>}
        /> */}
      <Chip
        sx={{ my: 2 }}
        label="Orden yaPagada"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />

      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} sm={7}>
          {/* Card List */}
          <CardList editable={false} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen (3 Productos)</Typography>
              <Divider sx={{ my: 3 }} />

              <Box display={"flex"} justifyContent="space-between">
                <Typography variant="subtitle1">
                  Direccion de Entrega
                </Typography>
                <NextLink href={"/checkout/address"} passHref legacyBehavior>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>Juan jose</Typography>
              <Typography>Bosques</Typography>
              <Typography>Guayaquil</Typography>
              <Typography>Ecuador</Typography>
              <Typography>0997154016</Typography>

              <Divider sx={{ my: 3 }} />

              <Box display={"flex"} justifyContent="end">
                <NextLink href={"/cart"} passHref legacyBehavior>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>
              {/* Order Sumary */}
              <OrderSumary />
              <Box sx={{ mt: 3 }}>
                {/* <Button 
                            color={'secondary'}
                            className='circular-btn'
                            fullWidth>
                                Confirmar orden
                            </Button> */}
                {/* TODO */}
                <h1>Pagar</h1>
                <Chip
                  sx={{ my: 2 }}
                  label="Orden yaPagada"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
