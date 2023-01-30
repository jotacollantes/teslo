import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import React from 'react'
import { AdminLayout } from '../../components/layouts'
import useSWR from "swr";
import { IOrder, IUser } from '../../interfaces'
import { FullScreenLoading } from '../../components/ui'

//*La definicion de las columns del grid puede ir antes de la definicion del functional component porque no necesita ser renderizado despues de que la pagana se haya cargado.


const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 250 },
  { field: "email", headerName: "Correo", width: 250 },
  { field: "name", headerName: "Nombre Completo", width: 300 },
  { field: "total", headerName: "Monto Total", width: 100,align: 'center' },
  {
    field: "isPaid",
    headerName: "Pagada",
    width: 100,
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid 
             ? (<Chip variant='outlined' label='Pagada' color='success'/>)
             :
             (<Chip variant='outlined' label='Pendiente' color='error'/>)

      ;
    },
    align: 'center'
  },
  { field: "noProducts", headerName: "No. Products", align: 'center',width: 100 },
  {
    field: "check",
    headerName: "Ver orden",
    width: 100,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (<a href={`/admin/orders/${row.id}`} target="_blank" rel="noreferrer">Ver Orden</a>)
            

      ;
    },
  },
  { field: "createdAt", headerName: "Fecha de creacion",width: 300}
];



const Orders = () => {
  
  
  const {data,error,isLoading}= useSWR<IOrder[]>("/api/admin/orders")
  if (isLoading) {
   
    return (
      <>
        <FullScreenLoading />
      </>
    );
  }

  //*La definicion de las rows del grid deben de ir en la definicion del functional component porque necesita los datos proporcionados por el hook useSWR.

  let rows = [];
  for (const orden of data!){
    rows.push({
      id: orden._id,
     //*Para poder ver las propiedad en orden.user. tengo que definirlo del tipo IUser
      email: (orden.user as IUser).email, 
      name: (orden.user as IUser).name,
      total: orden.total,
      isPaid: orden.isPaid,
      noProducts:orden.numberOfItems,
      createdAt:orden.createdAt
    });
}
  return (

    <AdminLayout
    title={'Ordenes'}
    subTitle={'Mantenimiento de ordenes'}
    icon={<ConfirmationNumberOutlined/>}     
    >
 <Grid container sx={{ mt: 3 }} className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%", border: 1 }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
        </Grid>
 
    
    </AdminLayout>
   
  )
}
export default Orders;