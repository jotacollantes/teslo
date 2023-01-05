import { Grid, Typography } from "@mui/material";
import React from "react";

export const OrderSumary = () => {
  return (
    <Grid container>
      <Grid item xs={6} sx={{ border: 0 }}>
        <Typography>No. Products</Typography>
      </Grid>
      <Grid
        item
        xs={6}
        display="flex"
        justifyContent={"end"}
        sx={{ border: 0 }}
      >
        <Typography>3</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent={"end"}>
        <Typography>{`$${155.36}`}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuestos 15%</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent={"end"}>
        <Typography>{`$${35.34}`}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 1 }}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent={"end"} sx={{ mt: 1 }}>
        <Typography variant="subtitle1">{`$${185.34}`}</Typography>
      </Grid>
    </Grid>
  );
};
