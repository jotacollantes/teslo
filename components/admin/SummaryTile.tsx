import { Card, CardContent, Grid, Typography } from '@mui/material'
import router from 'next/router';
import React from 'react'

interface Props {
    title: string|number,
    subTitle: string,
    icon: JSX.Element,
    url?:string
}
export const SummaryTile = ({title,subTitle,icon,url}:Props) => {
  
  const navigateTo = (url: string='') => {
    //console.log("Path: ",url)
    
    router.push(url);
  };


  return (
    <Grid item xs={12} sm={4} md={3}>
           
           
    {/* EL Card como tiene flex por default su direccion es en row */}
    <Card
    sx={{display:'flex',paddingLeft:'15px'}}
    onClick={() => {
      if (url)
      {
        navigateTo(url)
      }
      else
      {
         return;
      }
      
    }}
    >
        <CardContent
    sx={{
      width: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    {/* <CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} /> */}
    {icon}
  </CardContent>
  <CardContent
    sx={{ flex: "1 0 auto", display: "flex", flexDirection: "column" }}
  >
    <Typography variant="h3">{title}</Typography>
    <Typography variant="caption"> {subTitle}</Typography>
  </CardContent>
    </Card>
  
</Grid>
  )
}



