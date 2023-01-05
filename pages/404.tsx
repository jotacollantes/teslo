import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts/ShopLayout';


const Page404 = () => {
  return (
    //Integramos el ShopLayout
    <ShopLayout title={'Page Not Found'} pageDescription={'No hay nada que mostar'}  >
        
            <Box
            display={'flex'}
            justifyContent='center'
            alignItems='center'
            height={'calc(100vh - 200px)'}
            //Para que se ajuste a dispositivos moviles o a pantallas mas grandes.
            sx={{flexDirection:{xs:'column',sm:'row'}}}
            >
            <Typography variant='h1' component={'h1'} fontSize={80} fontWeight={200}>404 | </Typography>
            <Typography marginLeft={2}>No encontramos ninguna pagina aqui</Typography>
            
        </Box>
        
        
        
        </ShopLayout>
  )
}
export default Page404