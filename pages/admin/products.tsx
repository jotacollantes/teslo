import { CategoryOutlined } from '@mui/icons-material'
import { CardMedia, Chip, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import React from 'react'
import { AdminLayout } from '../../components/layouts'
import useSWR from "swr";
import { IProduct} from '../../interfaces'
import { FullScreenLoading } from '../../components/ui'
import NextLink from 'next/link';

//*La definicion de las columns del grid puede ir antes de la definicion del functional component porque no necesita ser renderizado despues de que la pagana se haya cargado.


const columns: GridColDef[] = [
  { field: "img", headerName: "Foto", renderCell: ({row}: GridRenderCellParams) => {
    return (
      <a href={`/product/${row.slug}`} target='_blank' rel="noreferrer">
        <CardMedia 
            component='img'
            className='fadeIn'
            image={`/products/${row.img}`}
            alt={row.title}
        />
      </a>
    );
  }},
  { field: "title", 
     headerName: "Titulo",
     width: 250,
     renderCell: ({row}:GridRenderCellParams)=>{
      return(
        
        <NextLink href={`/admin/products/${row.slug}`} passHref legacyBehavior>
          <Link underline='always'>
          {row.title}          </Link>

        </NextLink>
      );
     }
    },
  { field: "gender", headerName: "Genero"},
  { field: "type", headerName: "tipo"},
  { field: "inStock", headerName: "Inventario"},
  { field: "price", headerName: "Precio"},
  { field: "sizes", headerName: "Talla", width: 250},
  
];



const Products = () => {
  
  
  const {data,error,isLoading}= useSWR<IProduct[]>("/api/admin/products")
  if (isLoading) {
   
    return (
      <>
        <FullScreenLoading />
      </>
    );
  }

  //*La definicion de las rows del grid deben de ir en la definicion del functional component porque necesita los datos proporcionados por el hook useSWR.

  let rows = [];
  for (const producto of data!){
    rows.push({
        id:producto._id,
        img:producto.images[0],
        title:producto.title,
        gender:producto.gender,
        type:producto.type,
        inStock:producto.inStock,
        price:producto.price,
        sizes:producto.sizes.join(', '),//*Une todos los elementos del array
        slug:producto.slug
    });}
  return (

    <AdminLayout
    title={`Productos (${rows.length})`}
    subTitle={'Mantenimiento de Productos'}
    icon={<CategoryOutlined/>}     
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
export default Products;