import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from "@mui/icons-material";
import React from "react";
import { AdminLayout } from "../../components/layouts";
import { Grid} from "@mui/material";
import { SummaryTile } from '../../components/admin/SummaryTile';

const DashBoard = () => {
  return (
    <AdminLayout
      title={"Dashboard"}
      subTitle={"Estadisticas Generales"}
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2} marginTop='10px'>


        <SummaryTile title={"1"} subTitle={"Ordenes Totales"} icon={<CreditCardOffOutlined color="secondary" sx={{ fontSize: 60 }} /> } />
        <SummaryTile title={"2"} subTitle={"Ordenes Pagadas"} icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 60 }} /> } />
        <SummaryTile title={"3"} subTitle={"Ordenes Pendientes"} icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 60 }} /> } />
        <SummaryTile title={"4"} subTitle={"Clientes"} icon={<GroupOutlined color="primary" sx={{ fontSize: 60 }} /> } />
        <SummaryTile title={"5"} subTitle={"Productos"} icon={<CategoryOutlined color="warning" sx={{ fontSize: 60 }} /> } />
        <SummaryTile title={"6"} subTitle={"Productos sin existencias"} icon={<CancelPresentationOutlined color="error" sx={{ fontSize: 60 }} /> } />
        <SummaryTile title={"7"} subTitle={"Bajo Inventario"} icon={<ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 60 }} /> } />
        <SummaryTile title={"8"} subTitle={"Actualizacion en"} icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 60 }} /> } />

        
      </Grid>
    </AdminLayout>
  );
};

export default DashBoard;
