import React, { useEffect, useReducer } from "react";
import { ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";
import Cookie from "js-cookie";
//import { IProduct } from '../../interfaces/products';
import { FormData as FormDataAddress } from "../../pages/checkout/address"


export interface CartState {
  isLoaded:boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  taxCart: number;
  total: number;
  shippingAddress?: FormDataAddress;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

//Inicializamos
const INITIAL_STATE: CartState = {
  isLoaded:false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  taxCart: 0,
  total: 0,
  // Al inicio puede que no tenga la cookie con la informacion del address
  shippingAddress: undefined 
};

export const CartProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);


  //!Para leer las cookies y que el carrito sea persistente
  useEffect(() => {
    
    try {
       const cookieCart= Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!):[]
       dispatch({type: "[Cart] - LoadCart from cookies",payload: cookieCart })
       console.log('leyo la cookie',cookieCart)
    } catch (error) {
      dispatch({type: "[Cart] - LoadCart from cookies",payload: [] })
      console.log('No se leyo la cookie',error)
    }
   
 }, []);

  //!Para Leer la cookie del address y cargarla en el state 

  useEffect(() => {
    
    try {
       const cookieAddress= Cookie.get('address') ? JSON.parse(Cookie.get('address')!):undefined
       dispatch({type: "[Cart] - LoadAddress from cookies",payload: cookieAddress })
       console.log('leyo la cookie',cookieAddress)
    } catch (error) {
      dispatch({type: "[Cart] - LoadAddress from cookies",payload: undefined })
      console.log('No se leyo la cookie',error)
    }
   
 }, []);






  //!Para grabar las cookies y que el carrito sea persistente
  useEffect(() => {
     console.log('grabando cookies', state.cart)
    Cookie.set('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    let numberOfItems=0
    let subTotal=0
    //!Tomado de los parametros en .ENV
    const rateTax=Number(process.env.NEXT_PUBLIC_RATE_TAX)
    let taxCart=0
     for (const item of state.cart) {
          numberOfItems+=item.quantity
          subTotal+=item.price * item.quantity
     }

     taxCart =(subTotal * rateTax)/100
    
     const orderSumary={
         numberOfItems,
         subTotal,
         taxCart,
         total:subTotal+taxCart

     }
     //console.log({orderSumary})
     dispatch({type:"[Cart] - Update Summary",payload:orderSumary})
  }, [state.cart])
  

  

  const addProductToCart = (product: ICartProduct) => {
    //todo dispatch
    //console.log(state.cart)

    //! Si no hay productos con el mismo id y misma size se ejecuta el dispatch [...state.cart,product]
    const productsInCart = state.cart.some(
      (productItem) =>
        productItem._id == product._id && productItem.size == product.size
    );
    //console.log(productsInCart)
    if (!productsInCart) {
      return dispatch({
        type: "[Cart] - Add Product",
        payload: [...state.cart, product],
      });
    }

    //! Si se llega en este punto es porque si hay productos con el mismo id y con la misma talla. Aqui se muta el estado en un nuevo arreglo con la cantidad de items actualizado

    const updateProductsInCart = state.cart.map((productItem) => {
      if (
        productItem._id === product._id &&
        productItem.size === product.size
      ) {
        productItem.quantity = productItem.quantity + product.quantity;
        return productItem;
      } else {
        return productItem;
      }
    });

    dispatch({ type: "[Cart] - Add Product", payload: updateProductsInCart });
  };

    const updateCartQuantity =(product:ICartProduct)=>{
      dispatch({ type: "[Cart] - Update Cart Quantity", payload: product });
    }

    const removeItem =(product:ICartProduct)=>{
      dispatch({ type: "[Cart] - Remove product in cart", payload: product });
    }

    const updateAddress =(adress:FormDataAddress)=>{
      dispatch({ type: "[Cart] - Update Address", payload: adress });

    }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        removeItem,
        updateAddress
        
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
