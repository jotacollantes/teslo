
import { SearchOutlined, ShoppingCart, ShoppingCartOutlined } from '@mui/icons-material';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import NextLink from 'next/link'
import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import { UIContext } from '../../context';




export const NavBar = () => {
   const {asPath}=useRouter()
   const ruta= asPath.split('/')
   const page=ruta[ruta.length -1]
   const {isMenuOpen,toogleSideMenu} = useContext(UIContext)
   //console.log({isMenuOpen,toogleSideMenu})
  return (
    <AppBar>
        <Toolbar>
           <NextLink href='/' passHref legacyBehavior>
            <Link display={'flex'} alignItems='center'>
            <Typography variant='h6'>Teslo |</Typography>
            <Typography sx={{marginLeft:0.5}}>Shop</Typography>
            </Link>
           </NextLink>
            {/* Todo Flex */}
            {/* Para que tome todo el espacio restante entre BOX */}
            <Box flex={1}/>
            {/* Siempre se va a evaluar pantallas pequeñas Movil First
            xs:'none' Solo en pantallas pequeñas no se muestra 
            sm:'block' Luego a partir de pantallas no tan pequellas en adelante si se muestra */}
            <Box sx={{display:{xs:'none',sm:'block'}}}>
                <NextLink href='/category/men' passHref legacyBehavior>
                    <Link>
                    <Button color={page==='men' ? 'primary' : 'info'}>Hombres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/women' passHref legacyBehavior>
                    <Link>
                    <Button color={page==='women' ? 'primary' : 'info'}>Mujeres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/kid' passHref legacyBehavior>
                    <Link>
                    <Button color={page==='kid' ? 'primary' : 'info'}>Niños</Button>
                    </Link>
                </NextLink>
            </Box>
            {/* Para que tome todo el espacio restante entre BOX */}
            <Box flex={1} />
             {/* Todo Flex */}
             <IconButton>
                <SearchOutlined/>
            </IconButton>

            <NextLink href='/cart' passHref legacyBehavior>
                    <Link>
                    <IconButton>
                        <Badge badgeContent={2}>
                             <ShoppingCartOutlined/>
                             
                        </Badge>
                       
                    </IconButton>
                    </Link>
                </NextLink>
                <Button
                //Asi onClick={()=>toogleSideMenu()} o asi:
                onClick={toogleSideMenu}
                >
                    Menu
                </Button>
        </Toolbar>
    </AppBar>
  )
}
