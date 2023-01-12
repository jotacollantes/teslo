import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, useContext, useState } from "react";
import { CartContext, UIContext } from "../../context";

export const NavBar = () => {
  const { asPath, push } = useRouter();
  const ruta = asPath.split("/");
  const page = ruta[ruta.length - 1];
  const { isMenuOpen, toogleSideMenu } = useContext(UIContext);
  const {numberOfItems} = useContext(CartContext)
  //console.log({isMenuOpen,toogleSideMenu})

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    //!SI esta vacio no hace nada
    if (searchTerm.trim().length === 0) return;
    //!Caso contrario
    
    push(`/search/${searchTerm}`);
  };


  const onChangeTerm = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTerm(e.target.value);
  };
   
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
        <Box sx={{ display: isSearchVisible ? 'none' : { xs: "none", sm: "block" } }} className='fadeIn'>
          <NextLink href="/category/men" passHref legacyBehavior>
            <Link>
              <Button color={page === "men" ? "primary" : "info"}>
                Hombres
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref legacyBehavior>
            <Link>
              <Button color={page === "women" ? "primary" : "info"}>
                Mujeres
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kid" passHref legacyBehavior>
            <Link>
              <Button color={page === "kid" ? "primary" : "info"}>Niños</Button>
            </Link>
          </NextLink>
        </Box>
        {/* Para que tome todo el espacio restante entre BOX */}
        <Box flex={1} />
        {/* Todo Flex */}

        {/* Pantallas grandes */}
        {isSearchVisible ? (
          <Input
            className="fadeIn"
            autoFocus
            value={searchTerm}
            //onChange={(e) => setSearchTerm(e.target.value)}
            //!Se puede hacer asi tambien
            onChange={onChangeTerm}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                return onSearchTerm();
              }
            }}
            type="text"
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end" >
                <IconButton
                  onClick={() => setIsSearchVisible(false)}
                  aria-label="toggle password visibility"
                >
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
          
          onClick={() => setIsSearchVisible(true)}
          sx={{ display: { xs: "none", sm: "flex" } }}
          className="fadeIn">
            <SearchOutlined />
          </IconButton>
        )}

        {/* Pantallas Pequeñas */}
        <IconButton
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={toogleSideMenu}
        >
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref legacyBehavior>
          <Link>
            <IconButton>
              <Badge
              badgeContent={numberOfItems > 9 ? '+9' : numberOfItems }>
                <ShoppingCartOutlined />
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
  );
};
