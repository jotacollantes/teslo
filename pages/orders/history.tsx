import React from "react";
import { ShopLayout } from "../../components/layouts";
import { Chip, Grid, Typography, Link } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import NextLink from "next/link";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Nombre Completo", width: 100 },
  {
    field: "paid",
    headerName: "Pagada",
    description: "Muestra informacion si esta pagada o no",
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="Pendiente" variant="outlined" />
      );
    },
  },
  {
    field: "vieworder",
    headerName: "ver orden",
    description: "Ver orden",
    width: 100,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink
          href={`/orders/${params.row.vieworder}`}
          passHref
          legacyBehavior
        >
          <Link underline="always">Ver Orden</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, vieworder: 1, paid: true, fullname: "Juan Collantes" },
  { id: 2, vieworder: 2, paid: false, fullname: "Ana Moyano" },
  { id: 3, vieworder: 3, paid: true, fullname: "Ana Moyano" },
  { id: 4, vieworder: 4, paid: false, fullname: "Ana Moyano" },
  { id: 5, vieworder: 5, paid: false, fullname: "Ana Moyano" },
  { id: 6, vieworder: 6, paid: true, fullname: "Ana Moyano" },
];

const HistoryPage = () => {
  return (
    <ShopLayout
      title={"Historial de Ordenes"}
      pageDescription={"Historial de Ordenes del cliente"}
    >
      <Typography variant="h1" component={"h1"}>
        Historial de Ordenes
      </Typography>
      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} sx={{ height: 650, width: "100%", border: 1 }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
