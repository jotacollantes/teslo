
  import {
    AppBar,
   
    Box,
    Button,
    Link,
    Toolbar,
    Typography,
  } from "@mui/material";
  import NextLink from "next/link";
  
  import React, { useContext} from "react";
  import {UIContext } from "../../context";
  
  export const AdminNavBar = () => {
    
    
    const {toogleSideMenu } = useContext(UIContext);
    return (
      <AppBar>
        <Toolbar>
          <NextLink href="/" passHref legacyBehavior>
            <Link display={"flex"} alignItems="center">
              <Typography variant="h6">Teslo |</Typography>
              <Typography sx={{ marginLeft: 0.5 }}>Shop</Typography>
            </Link>
          </NextLink>
          {/* Todo Flex */}
          {/* Para que tome todo el espacio restante entre BOX */}
          <Box flex={1} />
          {/* Siempre se va a evaluar pantallas pequeñas Movil First
              xs:'none' Solo en pantallas pequeñas no se muestra 
              sm:'block' Luego a partir de pantallas no tan pequellas en adelante si se muestra */}
                    {/* Para que tome todo el espacio restante entre BOX */}
         
          {/* Todo Flex */}
          <Button
            //Asi onClick={()=>toogleSideMenu()} o asi:
            onClick={toogleSideMenu}
          >
            Menu
          </Button>
        </Toolbar>
      </AppBar>
    );
  };