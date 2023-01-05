import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, Button, Box } from '@mui/material';
import React from "react";
import { ShopLayout } from "../../components/layouts";

const AddressPage = () => {
  return (
    <ShopLayout title={""} pageDescription={""}>
      <Typography>Direccion</Typography>
      <Grid container spacing={2} sx={{mt:3}}>
        <Grid item xs={12} sm={6}>
          <TextField label="Nombre" variant="filled" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Apellido" variant="filled" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Direccion" variant="filled" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Direccion 2  (opcional)" variant="filled" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Codigo Postal" variant="filled" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Ciudad" variant="filled" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            
            <Select variant="filled" label='Pais' value={1}>
                <MenuItem value={1}>Ecuador</MenuItem>
                <MenuItem value={2}>Mexico</MenuItem>
            </Select>

          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField label="Telefono" variant="filled" fullWidth></TextField>
        </Grid>
      </Grid>
      <Box sx={{mt:5}} display='flex' justifyContent={'center'}>
        <Button color='secondary' className='circular-btn' size='large'>Revisar Pedido</Button>
        </Box>
    </ShopLayout>
  );
};

export default AddressPage;
