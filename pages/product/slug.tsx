import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { ItemCounter, ProductSlideShow, SizeSelector } from '../../components/products';
import { initialData } from '../../database/products';
const product=initialData.products[0]
const ProductPage = () => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description} >
      <Grid container sx={{mt:10}} spacing={3}>
        <Grid item xs={12} sm={7} border={0}>
              {/* slide show */}
              <ProductSlideShow images={product.images}/>
        </Grid>
        <Grid item xs={12} sm={5} border={0}>
              <Box display={'flex'} flexDirection='column' sx={{mr:0}}>
                <Typography variant='h1' component={'h1'}>{product.title}</Typography>
                <Typography variant='subtitle1' component={'h2'}>
                  {`$${product.price}`}
                </Typography>
                {/* Cantidad */}
                {/* Margen arriba y abajo */}
                <Box sx={{my:2}}>
                  <Typography variant='subtitle2'>Cantidad</Typography>
                  {/* Item Counter */}
                  <ItemCounter />
                  {/* Size Selector */}
                  {/* <SizeSelector selectedSize={product.sizes[2]} sizes={product.sizes}/> */}
                  <SizeSelector  sizes={product.sizes}/>
                </Box>
                <Button color="secondary" className='circular-btn'>
                      Agregar al Carrito
                </Button>
                {/* <Chip label='No hay disponibles' color='error' variant='outlined' /> */}

                {/* Descripcion */}
                <Box sx={{mt:3}}>
                <Typography variant='subtitle2' >Descripcion</Typography>
                <Typography variant='body2'>
                  {product.description}
                </Typography>
                </Box>

              </Box>
        </Grid>

      </Grid>
      
    </ShopLayout>
  )
}

export default ProductPage