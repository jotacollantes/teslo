import React, {FC, useEffect, useReducer } from "react";
import { ICartProduct, IOrder, ShippingAddress } from "../../interfaces";
import { CartContext, cartReducer } from "./";
import Cookie from 'js-cookie';
//import { IProduct } from '../../interfaces/products';
//import { FormData as FormDataAddress } from "../../pages/checkout/address"
import { tesloApi } from '../../api/tesloApi';
import axios from "axios";


export interface CartState {
  isLoaded:boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  taxCart: number;
  total: number;
  shippingAddress?: ShippingAddress;
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
       //const cookieCart=  JSON.parse(Cookie.get('cart')!)
       dispatch({type: "[Cart] - LoadCart from cookies",payload: cookieCart })
      
       //console.log('leyo la cookie primero',cookieCart)
    } catch (error) {
      //console.log(error)
      dispatch({type: "[Cart] - LoadCart from cookies",payload: [] })
      //console.log('No se leyo la cookie',error)
    }
   
 }, []);

  //!Para Leer la cookie del address y cargarla en el state 

  useEffect(() => {
    
    try {
       const cookieAddress= Cookie.get('address') ? JSON.parse(Cookie.get('address')!):undefined
       dispatch({type: "[Cart] - LoadAddress from cookies",payload: cookieAddress })
       //console.log('leyo la cookie',cookieAddress)
    } catch (error) {
      dispatch({type: "[Cart] - LoadAddress from cookies",payload: undefined })
      //console.log('No se leyo la cookie',error)
    }
   
 }, []);


//!Para grabar las cookies y que el carrito sea persistente
useEffect(() => {
  //console.log('entro por aqui',state.cart)
   //console.log('grabando cookies', state.cart)
   //console.log('state: ',state.cart)
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

    //! Se evalua si existe el producto que se intenta añadir al carrito. Tiene que ser del mismo _id y del mismo size 
    const productsInCart = state.cart.some(
      (productItem) =>
        productItem._id == product._id && productItem.size == product.size
    );
    //console.log(productsInCart)
     //! Si no hay productos con el mismo id y misma size se ejecuta el dispatch [...state.cart,product]
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

    const updateAddress =(adress:ShippingAddress)=>{
      dispatch({ type: "[Cart] - Update Address", payload: adress });

    }

const createOrder = async():Promise<{hasError:boolean;message:string;}>=>{

  if(!state.shippingAddress){
    throw new Error('No hay datos de direccion')

  }

  const body:IOrder={
    orderItems: state.cart,
    shippingAddress: state.shippingAddress,
    numberOfItems  : state.numberOfItems,
    subTotal       : state.subTotal,
    taxCart        : state.taxCart,
    total          : state.total,
    isPaid         : false
  }

  try {
    const {data}=await tesloApi.post<IOrder>('/orders',body)
    //console.log(data)
    
    //TODO dispatch
    //Para dejar  la cookie de cart en []
    dispatch({type:'[Cart] - Order Complete'})
    return {
      hasError:false,
      message:data._id!
    }
  } catch (error) {
    //console.log(error)
    //* Si es un error de axios
    if(axios.isAxiosError(error)){
      return{
        hasError:true,
        message:error.response?.data.message
      }
    }
    //* si no es un error de axios
    return{
      hasError:true,
      message:'Error no controlado hable con el administrador'
    }
  }
}


  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        removeItem,
        updateAddress,
        createOrder
        
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
