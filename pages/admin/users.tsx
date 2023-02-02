import { PeopleOutline } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/layouts";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Grid, MenuItem, Select, Typography } from "@mui/material";
import useSWR from "swr";
import { FullScreenLoading } from "../../components/ui";
import { IUser } from "../../interfaces";
import { tesloApi } from "../../api/tesloApi";
import { useRouter } from "next/router";
import { notificaciones } from "../../utils";

const Users = () => {
  //* con useSWR primero se toma los datos del  cache y se revalida con la respuesta de un http request, si hay cambios se pinta la informacion de la request caso contrario se mantiene la del cache

  const { data, error, isLoading } = useSWR<IUser[]>("/api/admin/users");
  
  const [users, setUsers] = useState<IUser[]>([]);
  const router =useRouter()
  useEffect(() => {

  if (data) {
      setUsers(data);
    }
  }, [data]);

  if (isLoading) {
   
    return (
      <>
        <FullScreenLoading />
      </>
    );
  }
  // if (error) {
  //   console.log(error);
  //   return <Typography>Error al cargar la informacion</Typography>;
  // }

  const onChangeRol = async (userId: string, newRole: string) => {
    const previosUsers=users.map((user)=>{
      return {...user}
    })

    //* Si se actualizo el role de un usuario creo un nuevo arreglo con el dato del rol actualizado del usuario y actualizo el estado users para  que se redibuje el grid con los nuevos datos
    const updatedUsers = users.map((user) => {
      return {
        ...user,
      role: userId === user._id ? newRole : user.role,
      }
      
    });

    setUsers(updatedUsers);
    try {
      const {status}=await tesloApi.put("/admin/users", { userId, role: newRole });
      if (status===200){
        //* se hara renderizacion del componente grid porque es una mejor experiencia de usuario que hacer un router.reload()
        //router.reload()
        notificaciones.confirmacion("Cliente actualizado")
      }
    } catch (error) {
      //*Si hay un error actualizo el estado user con el arreglo previosUsers para dejar el grid como estaba
      setUsers(previosUsers);
      notificaciones.alerta("Error al actualizar el usuario","")
      //console.log(error);
      //alert(error)
    }
  };
  

  const columns: GridColDef[] = [
    //{ field: "id", headerName: "ID", width: 100 },
    { field: "email", headerName: "Correo", width: 250 },
    { field: "name", headerName: "Nombre Completo", width: 300 },
    {
      field: "role",
      headerName: "Role",
      width: 300,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Select
            value={row.role}
            label="Rol"
            sx={{ width: "300px" }}
            onChange={(event) => {
              return onChangeRol(row.id, event.target.value);
            }}
          >
            <MenuItem value="admin">admin</MenuItem>
            <MenuItem value="client">client</MenuItem>
          </Select>
        );
      },
    },
  ];

  let rows = [];
  for (const usuario of users){
    rows.push({
      id: usuario._id,
      email: usuario.email,
      name: usuario.name,
      role: usuario.role,
    });
}
  //  const rows=users.map((usuario)=>{
  //   return {
  //     id: usuario._id,
  //     email: usuario.email,
  //     name: usuario.name,
  //     role: usuario.role,
  //   }
  //  })
  return (
    <AdminLayout
      title={"Usuarios"}
      subTitle={"Mantenimiento de usuarios"}
      icon={<PeopleOutline />}
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
  );
};

export default Users;
