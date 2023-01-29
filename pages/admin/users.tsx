import { PeopleOutline } from '@mui/icons-material'
import React from 'react'
import { AdminLayout } from '../../components/layouts'
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Grid, Typography } from '@mui/material';
import useSWR from 'swr';
import { FullScreenLoading } from "../../components/ui";
import { IUser } from '../../interfaces';


const Users =()=>{

    //* con useSWR primero se toma los datos del  cache y se revalida con la respuesta de un http request, si hay cambios se pinta la informacion de la request caso contrario se mantiene la del cache
  
  const {data,error} = useSWR<IUser[]>('/api/admin/users')

  if(!error && !data) {
    //return <><h1>Cargando....</h1></>
    return <><FullScreenLoading/></>
  }
  if (error) {
    console.log(error)
    return <Typography>Error al cargar la informacion</Typography>
  }




    const columns: GridColDef[] = [
        //{ field: "id", headerName: "ID", width: 100 },
        { field: "email", headerName: "Correo", width: 250 },
        { field: "name", headerName: "Nombre Completo", width: 300 },
        { field: "role", headerName: "Role", width: 300 },
       
        
      ];

      let rows=[]
  //let id=1
  for (const usuario of data!) {
    rows.push({
      id:usuario._id,
      email: usuario.email,
      name: usuario.name,
      role: usuario.role
    
    })
    //id++
  }




  return (
   <AdminLayout title={'Usuarios'} subTitle={'Mantenimiento de usuarios'} icon={<PeopleOutline/> }>
    <Typography variant="h1" component={"h1"}>
        Historial de Ordenes
      </Typography>
      <Grid container sx={{ mt: 3 }} className='fadeIn'>
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

export default Users


