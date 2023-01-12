import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';



interface ContextProps {
      cart: ICartProduct[]; // Sera un Array de ICartProduct
      numberOfItems: number;
      subTotal: number;
      taxCart: number;
      total: number;
      //!Methods
      addProductToCart: (product: ICartProduct) => void,
      updateCartQuantity: (product: ICartProduct) => void,
      removeItem: (product: ICartProduct) => void
      
}


export const CartContext=createContext({} as ContextProps)