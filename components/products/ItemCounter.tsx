import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react'
import { ICartProduct, IProduct } from '../../interfaces/';
interface Props{
  currentValue:number
  //quantitySelected:number
  maxValue:number//Stock
  //incrementar:(value:number)=>void
  //decrementar:(value:number)=>void
  updatedQuantity:(value:number)=>void
}
export const ItemCounter = ({currentValue,maxValue,updatedQuantity}:Props) => {

  //console.log('Item Counter',currentValue,maxValue)
   const seleccionaCantidad =(arg:string)=>{
    

     if (arg==='incrementar')
     {
      //console.log('incrementa');
      //(quantitySelected <= maxValue)
        //? cantidadSeleccionada(quantitySelected + 1)
        //: null
        (currentValue <= maxValue) && updatedQuantity(currentValue +1)
        
     }
     else if (arg==='reducir')
     {
      // (quantitySelected===1)
      // ? null
      // : cantidadSeleccionada(quantitySelected - 1)
      // console.log('reducir')
      (currentValue > 1)  && updatedQuantity(currentValue -1)
     }
    
   }

  return (
    <Box display={'flex'} alignItems='center'>
      {/* Nunca puede ser menor a 1 */}
        <IconButton
        onClick={()=>seleccionaCantidad('reducir')}
        >
            <RemoveCircleOutline/>
        </IconButton>
        <Typography sx={{width:40, textAlign:'center'}}> {currentValue} </Typography>
        {/* Nunca puede ser mayor al maximo */}
        <IconButton
        onClick={()=>seleccionaCantidad('incrementar')}
        >
            <AddCircleOutline/>
        </IconButton>
    </Box>
  )
}
