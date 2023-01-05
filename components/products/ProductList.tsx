import { Grid } from '@mui/material';
import React from 'react'
import { ProductCard } from '.';
import { IProduct } from '../../interfaces';
interface Props{
    products:IProduct[]
}

export const ProductList = ({products}:Props) => {
  return (
    <Grid container spacing={4}>
    {
      products.map((producto,ix) => {
        return  <ProductCard key={ix} product={producto}  />
      })
    }
     
    </Grid>
  )
}
