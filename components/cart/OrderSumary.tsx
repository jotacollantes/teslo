import { Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { CartContext } from "../../context";
import { currency } from "../../utils";


interface Props{
  resumen?: {
    numberOfItems: number,
    subTotal: number,
    taxCart: number,
    total: number,

  },
  adicional?:string
}

export const OrderSumary = ({resumen,adicional}:Props) => {
    
     //! No puedo usar un hook de manera condicional
    //  const {numberOfItems,subTotal,taxCart,total} = 
    // (!resumen) ? useContext(CartContext) : resumen
    const {numberOfItems,subTotal,taxCart,total} =useContext(CartContext)
    const summaryValues= (resumen) ? resumen : {numberOfItems,subTotal,taxCart,total}
  
  
  return (
    <Grid container>
      <Grid item xs={6} sx={{ border: 0 }}>
        <Typography>No. Products: </Typography>
      </Grid>
      <Grid
        item
        xs={6}
        display="flex"
        justifyContent={"end"}
        sx={{ border: 0 }}
      >
        <Typography>{summaryValues.numberOfItems} {summaryValues.numberOfItems > 1 ? 'Productos':'Producto'}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent={"end"}>
        <Typography>{currency.formateo(summaryValues.subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuestos {process.env.NEXT_PUBLIC_RATE_TAX}%</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent={"end"}>
        <Typography>{currency.formateo(summaryValues.taxCart)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 1 }}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent={"end"} sx={{ mt: 1 }}>
        <Typography variant="subtitle1">{currency.formateo(summaryValues.total)}</Typography>
      </Grid>
    </Grid>
  );
};
