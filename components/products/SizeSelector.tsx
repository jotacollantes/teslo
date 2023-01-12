import { Box, Button } from '@mui/material';
import React from 'react'
import { ISize } from '../../interfaces/products';

interface Props{
    selectedSize?:ISize,
    sizes: ISize[],
    onSelectedSize: (size:ISize) => void
}




export const SizeSelector = ({selectedSize,sizes,onSelectedSize}:Props) => {
  return (
    <Box>
        {
            sizes.map((size,ix) => (
                <Button
                key={ix}
                size='small'
                color={(selectedSize===size) ? 'primary' : 'info'}
                //!Llamo al metodo que esta en las props
                onClick={()=>onSelectedSize(size)}
                
                >
                    {size}
                </Button>
            ))
        }
    </Box>
  )
}
