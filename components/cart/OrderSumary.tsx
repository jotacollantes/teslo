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
  




    const {numberOfItems,subTotal,taxCart,total} = 
    (!resumen) ? useContext(CartContext) : resumen
  
  
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
        <Typography>{numberOfItems} {numberOfItems > 1 ? 'Productos':'Producto'}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent={"end"}>
        <Typography>{currency.formateo(subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuestos {process.env.NEXT_PUBLIC_RATE_TAX}%</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent={"end"}>
        <Typography>{currency.formateo(taxCart)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 1 }}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent={"end"} sx={{ mt: 1 }}>
        <Typography variant="subtitle1">{currency.formateo(total)}</Typography>
      </Grid>
    </Grid>
  );
};
