import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { AdminNavBar } from "../admin";
import { SideMenu } from "../ui/SideMenu";

interface Props {
  title: string;
  subTitle: string;
  icon?: JSX.Element ;
  children: JSX.Element | JSX.Element[];
}
export const AdminLayout = ({ title, subTitle, icon, children }: Props) => {
  return (
    <>
      <nav>
        {/* Navbar */}
        <AdminNavBar />
      </nav>
      {/* TODO: Sidebar */}
      <SideMenu />
      {/* <main
        style={{ margin: "80px auto", maxWidth: "1440px", padding: "0px 30px",backgroundColor:'azure'}} 
      > */}
        <main
        style={{ margin: "80px auto", maxWidth: "1440px", padding: "0px 30px"}} 
      >
        
        
        <Box display={"flex"} flexDirection="column" border={0}>
          <Typography variant="h1" component="h1">
            {icon}{title}
          </Typography>
          <Typography variant="h2" component="h1">
            {subTitle}
          </Typography>
        </Box>
        <Box className="fadeIn">
            {children}
        </Box>
        
      </main>

      <footer>{/* TODO: Footer */}</footer>
    </>
  );
};
