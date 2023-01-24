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
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react';
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";
import { PayPalButtons } from "@paypal/react-paypal-js";


interface Props{
  order: IOrder,
  propiedad?:string
}
const OrderPage = ({order,propiedad}:Props) => {
  const {shippingAddress,numberOfItems,subTotal,taxCart,total,isPaid}=order
  const valores={
    numberOfItems,
    subTotal,
    taxCart,
    total
  }
  //console.log('Datos de la Orden: ',order)
  //console.log(propiedad)
  return (
    <ShopLayout
      title={"Resumen de Orden 12345678"}
      pageDescription={"Resumen de la orden"}
    >
      <Typography variant="h1" component={"h1"}>
        Orden {order._id}
      </Typography>


      {
        order.isPaid ? <Chip
        sx={{ my: 2 }}
        label="Orden yaPagada"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />:<Chip
        sx={{my:2}}
        label='Pendiente de Pago'
        variant='outlined'
        color='error'
        icon={<CreditCardOffOutlined/>}
        />
      }
      
      

      <Grid container sx={{ mt: 3 }} className='fadeIn'>
        <Grid item xs={12} sm={7}>
          {/* Card List */}
          <CardList editable={false} products={order.orderItems}/>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({order.numberOfItems}) {
                  (order.numberOfItems >1) ? 'Productos' : 'Producto'}
                
                </Typography>
              <Divider sx={{ my: 3 }} />

              <Box display={"flex"} justifyContent="space-between">
                <Typography variant="subtitle1">
                  Direccion de Entrega
                </Typography>
                
              </Box>

              <Typography>{shippingAddress.firstname} {shippingAddress.lastname}</Typography>
              <Typography>{shippingAddress.address} {shippingAddress.address2} </Typography>
              <Typography>{shippingAddress.city}, {shippingAddress.zip}</Typography>
              <Typography>{shippingAddress.country}</Typography>
              <Typography>{shippingAddress.phone}</Typography>

              <Divider sx={{ my: 3 }} />

              
              {/* Order Sumary */}
              <OrderSumary resumen={valores}/>
              <Box sx={{ mt: 3,display:'flex',flexDirection:'column' }}>
                {
                  isPaid ?<Chip
                  sx={{ my: 2 }}
                  label="Orden yaPagada"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />:
                <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                      purchase_units: [
                          {
                              amount: {
                                  value: order.total.toString(),
                              },
                          },
                      ],
                  });
              }}
              onApprove={(data, actions) => {
                  return actions.order!.capture().then((details) => {
                    console.log(details)
                      const name = details.payer.name!.given_name;
                      //alert(`Transaction completed by ${name}`);
                  });
              }}
          />
                
                

                }
                
                
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({req,query}) => {
  const {id}=query;
  const session:any = await getSession({req})
  

    //* Valido si tiene session activa
    if(!session){
      //console.log('validacion session activa')
      return {
        redirect: {
              destination:`/auth/login?p=/orders/${id}`,
              permanent:false
        }
      }
    }

    //* Obtengo los datos de la orden
    const order= await dbOrders.getOrderById(id!.toString())
    //console.log('Datos Orden: ',order)
    if (!order)
    {
      //console.log('validacion datos de la orden')
      return {
        redirect: {
              destination:'/orders/history',
              permanent:false
        }
      }
    }
    //* Valido si la orden recuperada pertenece a la session del usuario
    if(order.user!==session.user._id)
    {
      //console.log('validacion si pertenece al usuario')
      return {
        redirect: {
              destination:`/auth/login?p=/orders/${id}`,
              permanent:false
        }
      }
    }


  //* Devolvemos las propiedades a las props del componente.
  return {
    props: {
      order,
      propiedad :'opcional'
    }
  }
}

export default OrderPage;
