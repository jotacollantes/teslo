import { Box, Grid, Typography, TextField, Button, Link } from '@mui/material';
import NextLink from 'next/link';
import React from 'react'
import { AuthLayout } from '../../components/layouts'


const RegisterPage = () => {
  return (
    <AuthLayout title={'Crear Usuario'}>
        <Box sx={{width:350,padding:'10px 20px'}}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant='h1' component='h1'>Creacion de Usuario</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField label='Nombres' variant='outlined' fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <TextField label='Correo' variant='outlined' fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <TextField label='Contraseña' variant='outlined' fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <TextField label='Confirmar Contraseña' variant='outlined' fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <Button color='secondary' className='circular-btn' size='large' fullWidth>Crear Usuario</Button>
            </Grid>

            <Grid item xs={12} display={'flex'} justifyContent='end'>
                <NextLink href={'/auth/login'} passHref legacyBehavior>
                    <Link underline='always'> Ya tienes Cuenta?
                    </Link>

                </NextLink>
            </Grid>


            </Grid>
            
        </Box>

    </AuthLayout>
  )
}

export default RegisterPage