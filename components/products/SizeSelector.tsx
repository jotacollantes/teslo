import { Box, Button } from '@mui/material';
import React from 'react'
import { ISize } from '../../interfaces/products';

interface Props{
    selectedSize?:ISize
    sizes: ISize[]
}

export const SizeSelector = ({selectedSize,sizes}:Props) => {
  return (
    <Box>
        {
            sizes.map((size,ix) => (
                <Button
                key={ix}
                size='small'
                color={(selectedSize===size) ? 'primary' : 'info'}
                >
                    {size}
                </Button>
            ))
        }
    </Box>
  )
}
