import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react'

export const FullScreenLoading = () => {
  return (
    <Box
    display={'flex'}
    justifyContent='center'
    alignItems='center'
    flexDirection={'column'}
    height={'calc(100vh - 200px)'}
    //Para que se ajuste a dispositivos moviles o a pantallas mas grandes.
    // sx={{flexDirection:{xs:'column',sm:'row'}}}
    >
    <Typography sx={{mb:5}} variant='h2' fontWeight={200} fontSize={20}>Cargando...</Typography>
    <CircularProgress thickness={4}/>
    
</Box>
  )
}
