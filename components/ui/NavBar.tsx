
import { SearchOutlined, ShoppingCart, ShoppingCartOutlined } from '@mui/icons-material';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import NextLink from 'next/link'
import React from 'react'


export const NavBar = () => {
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
                    <Button>Hombres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/women' passHref legacyBehavior>
                    <Link>
                    <Button>Mujeres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/kid' passHref legacyBehavior>
                    <Link>
                    <Button>Niños</Button>
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
                <Button>Menu</Button>
        </Toolbar>
    </AppBar>
  )
}
