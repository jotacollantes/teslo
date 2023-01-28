import { Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'

interface Props {
    title: string|number,
    subTitle: string,
    icon: JSX.Element
}
export const SummaryTile = ({title,subTitle,icon}:Props) => {
  return (
    <Grid item xs={12} sm={4} md={3}>
           
           
    {/* EL Card como tiene flex por default su direccion es en row */}
    <Card sx={{display:'flex',paddingLeft:'15px'}}>
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
