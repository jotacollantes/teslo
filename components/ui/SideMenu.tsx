import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  DashboardOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";
import { ChangeEvent, useContext, useState } from "react";
import { AuthContext, UIContext } from "../../context";
import { useRouter } from "next/router";

export const SideMenu = () => {
  const { isMenuOpen, toogleSideMenu } = useContext(UIContext);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const onSearchTerm = () => {
    //!SI esta vacio no hace nada
    if (searchTerm.trim().length === 0) return;
    //!Caso contrario
    navigateTo(`/search/${searchTerm}`);
  };
  const navigateTo = (url: string) => {
    //console.log("Path: ",url)
    toogleSideMenu();
    router.push(url);
  };

  const onChangeTerm = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTerm(e.target.value);
  };

  //console.log(user?.role)

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      //La Sombra se la aplica al drawer menos al Box que contiene el List -> ListItem
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={() => toogleSideMenu()}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
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
                <InputAdornment position="end">
                  <IconButton
                    onClick={onSearchTerm}
                    aria-label="toggle password visibility"
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {isLoggedIn && (
            <>
              <ListItem >
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={"Perfil"} />
              </ListItem>

              <ListItem
              onClick={()=>navigateTo('/orders/history')}
              >
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={"Mis Ordenes"} />
              </ListItem>
            </>
          )}

          <ListItem
            
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigateTo("/category/men")}
          >
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Hombres"} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigateTo("/category/women")}
          >
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Mujeres"} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigateTo("/category/kid")}
          >
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={"Niños"} />
          </ListItem>

          {!isLoggedIn ? (
            <ListItem
              //onClick={() => navigateTo("/auth/login")}
              onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
            >
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={"Ingresar"} />
            </ListItem>
          ) : (
            <ListItem onClick={logout}>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={"Salir"} />
            </ListItem>
          )}
          {/* Admin */}
          {user?.role === "admin" && (
            <>
             
              <Divider />

              <ListSubheader>Admin Panel</ListSubheader>
              <ListItem
              onClick={()=>{
                navigateTo('/admin')
              }}
              >
                <ListItemIcon>
                  <DashboardOutlined />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItem>

              <ListItem onClick={() => navigateTo("/admin/products")}>
                <ListItemIcon>
                  <CategoryOutlined />
                </ListItemIcon>
                <ListItemText primary={"Productos"} />
              </ListItem>

              <ListItem
              onClick={() => navigateTo("/admin/orders")}
              >
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={"Ordenes"} />
              </ListItem>

              <ListItem
              onClick={() => navigateTo("/admin/users")}
              >
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary={"Usuarios"} />
              </ListItem>
              {/* Fin de Admin Panel */}
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
