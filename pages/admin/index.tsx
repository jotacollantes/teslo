import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from "@mui/icons-material";
import { AdminLayout } from "../../components/layouts";
import { Grid, Typography} from "@mui/material";
import { SummaryTile } from '../../components/admin/SummaryTile';

import useSWR from 'swr';
import { dashboardResponse } from "../../interfaces";
import { useEffect, useState } from "react";
import { FullScreenLoading } from "../../components/ui";



const DashBoard = () => {
  //* con useSWR primero se toma los datos del  cache y se revalida con la respuesta de un http request, si hay cambios se pinta la informacion de la request caso contrario se mantiene la del cache
  //! la consulta al api del dashboard se hara cada 30 segundos directamente desde el frontend gracias al SWR
  const {data,error,isLoading} = useSWR<dashboardResponse>('/api/admin/dashboard/',{refreshInterval: 30 * 1000})
  const [refreshIn, setRefreshIn] = useState(30)


  //! Para mostrar el contador en el dashboard
  useEffect(() => {
      const interval=setInterval(()=>{

        //console.log('tick')
        setRefreshIn((refreshIn)=>{

          return refreshIn > 0 ? refreshIn - 1 : 30
        })

      },1000)//Cada Segundo
  
    return () => {
      clearInterval(interval)//Limpiamos el intervalo si nos cambiamos de pagina porque ya no va  a aser necesario ejecutar el setInterval
    }
  }, [])
  



  //*La pagina se va a generar de manera estatica y aun no se llama al endpoint /admin/dashboard y no tenemos la data ni el error
  //if(!error && !data) {
    if(isLoading) {
    //return <><h1>Cargando....</h1></>
    return <><FullScreenLoading/></>
  }
  if (error) {
    console.log(error)
    return <Typography>Error al cargar la informacion</Typography>
  }

  const {
    numberOfOrders,          
    paidOrders,          
    notPaidOrders,           
    numberOfClients,         
    numberOfProducts,        
    productsWithNotInventory,
    lowInventory,
  }=data!//* en este punto va a llegar la data
  return (
    <AdminLayout
      title={"Dashboard"}
      subTitle={"Estadisticas Generales"}
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2} marginTop='10px'>


        <SummaryTile title={numberOfOrders} subTitle={"Ordenes Totales"} icon={<CreditCardOffOutlined color="secondary" sx={{ fontSize: 60 }} /> } />
        <SummaryTile title={paidOrders} subTitle={"Ordenes Pagadas"} icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 60 }} /> } />
        <SummaryTile title={notPaidOrders} subTitle={"Ordenes Pendientes"} icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 60 }} /> } />
        <SummaryTile title={numberOfClients} subTitle={"Clientes"} icon={<GroupOutlined color="primary" sx={{ fontSize: 60 }} /> } />
        <SummaryTile title={numberOfProducts} subTitle={"Productos"} icon={<CategoryOutlined color="warning" sx={{ fontSize: 60 }} /> } />
        <SummaryTile title={productsWithNotInventory} subTitle={"Productos sin existencias"} icon={<CancelPresentationOutlined color="error" sx={{ fontSize: 60 }} /> } />
        <SummaryTile title={lowInventory} subTitle={"Bajo Inventario"} icon={<ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 60 }} /> } />
        <SummaryTile title={refreshIn} subTitle={"Actualizacion en"} icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 60 }} /> } />

        
      </Grid>
    </AdminLayout>
  );
};

export default DashBoard;
