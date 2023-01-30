import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { CardList } from "../../../components/cart";
import { AdminLayout } from "../../../components/layouts/";
import { OrderSumary } from "../../../components/cart/OrderSumary";
import { GetServerSideProps } from "next";

import {
  ConfirmationNumberOutlined,
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import { dbOrders } from "../../../database";
import { IOrder, IUser } from "../../../interfaces";
import { getSession } from "next-auth/react";

interface Props {
  order: IOrder;
  propiedad?: string;
}
const AdminOrderPageDetails = ({ order, propiedad }: Props) => {
  const { shippingAddress, numberOfItems, subTotal, taxCart, total, isPaid,_id } =
    order;
  const valores = {
    numberOfItems,
    subTotal,
    taxCart,
    total,
  };

  return (
    <AdminLayout
      title={`Resumen de Orden ${order._id}`}
      subTitle={""}
      icon={<ConfirmationNumberOutlined />}
    >
      

      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Orden yaPagada"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Pendiente de Pago"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container sx={{ mt: 3 }} className="fadeIn">
        <Grid item xs={12} sm={7}>
          {/* Card List */}
          <CardList editable={false} products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({order.numberOfItems}){" "}
                {order.numberOfItems > 1 ? "Productos" : "Producto"}
              </Typography>
              <Divider sx={{ my: 3 }} />

              <Box display={"flex"} justifyContent="space-between">
                <Typography variant="subtitle1">
                  Direccion de Entrega
                </Typography>
              </Box>

              <Typography>
                {shippingAddress.firstname} {shippingAddress.lastname}
              </Typography>
              <Typography>
                {shippingAddress.address} {shippingAddress.address2}{" "}
              </Typography>
              <Typography>
                {shippingAddress.city}, {shippingAddress.zip}
              </Typography>
              <Typography>{shippingAddress.country}</Typography>
              <Typography>{shippingAddress.phone}</Typography>

              <Divider sx={{ my: 3 }} />

              {/* Order Sumary */}
              <OrderSumary resumen={valores} />
              <Box sx={{ mt: 3, display: "flex", flexDirection: "column" }}>
                {isPaid ? (
                  <Chip
                    sx={{ my: 2 }}
                    label="Orden yaPagada"
                    variant="outlined"
                    color="success"
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <Chip
                    sx={{ my: 2 }}
                    label="Orden Pendiente"
                    variant="outlined"
                    color="warning"
                    icon={<CreditScoreOutlined />}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id } = query;
  const session: any = await getSession({ req });





  if (!session ) {
    
    return {
      redirect: {
        destination: `/auth/login?p=/admin/orders/${id}`,
        permanent: false,
      },
    };
  }

//* Obtengo los datos de la orden
  const order = await dbOrders.getOrderById(id!.toString());
  //console.log('Datos Orden: ',order)
  if (!order) {
    //console.log('validacion datos de la orden')
    return {
      redirect: {
        destination: "/admin/orders",
        permanent: false,
      },
    };
  }

//* Devolvemos las propiedades a las props del componente.
  return {
    props: {
      order,
      propiedad: "opcional",
    },
  };
};

export default AdminOrderPageDetails;
