import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import React from 'react'
import { CardList } from '../../components/cart';
import { ShopLayout } from '../../components/layouts/';
import { OrderSumary } from '../../components/cart/OrderSumary';


const index = () => {
  return (
    <ShopLayout title={'Carrito - 3'} pageDescription={'Carrito de Compras de la Tienda'} >
        <Typography variant='h1' component={'h1'}>Carrito</Typography>
        <Grid container>
            <Grid item xs={12} sm={7}>
                {/* Card List */}
                <CardList editable={true}/>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Orden</Typography>
                        <Divider sx={{my:3}}/>
                        {/* Order Sumary */}
                        <OrderSumary/>
                        <Box sx={{mt:3}}>
                            <Button 
                            color={'secondary'}
                            className='circular-btn'
                            fullWidth>
                                Checkout
                            </Button>
                            
                        </Box>
                    </CardContent>
                    
                </Card>
            </Grid>
            
        </Grid>
        
    </ShopLayout>
  )
}

export default index